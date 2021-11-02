import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import { PASSWORD_LENGTH_MAX } from '../constants/inputLengthLimits';
import { validatePassword } from '../validators/validatePassword';
import { 
  PASSWORD_MATCH_ERROR_MESSAGE,
  PASSWORD_VALIDITY_ERROR_MESSAGE 
} from '../constants/errorMessages';
import ReactGA from 'react-ga';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangePasswordRetype: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'passwordRetype', value }),
  onErrorsUpdate: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'errors', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);

    this.changePassword = ev => {
      this.props.onChangePassword(ev.target.value);
      const copiedPassword = ev.target.value;
      const copiedPasswordRetype = this.props.passwordRetype;
      const errors = this.valuateErrors(copiedPassword, copiedPasswordRetype);
      this.props.onErrorsUpdate(errors);
    };

    this.changePasswordRetype = ev => {
      this.props.onChangePasswordRetype(ev.target.value);
      const copiedPassword = this.props.password;
      const copiedPasswordRetype = ev.target.value;
      const errors = this.valuateErrors(copiedPassword, copiedPasswordRetype);
      this.props.onErrorsUpdate(errors);
    };

    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);

    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();

      const copiedPassword = this.props.password || '';
      const copiedPasswordRetype = this.props.passwordRetype || '';
      const validationResults = validatePassword(copiedPassword, copiedPasswordRetype);
      if (validationResults.passwordMatch && validationResults.passwordValidity) {
        this.props.onSubmit(username, email, password);
      } else {
        const errors = this.valuateErrors(copiedPassword, copiedPasswordRetype);
        this.props.onErrorsUpdate(errors);
      }
    }

    this.valuateErrors = (password, passwordRetype) => {
      const validationResults = validatePassword(password, passwordRetype);

      let errors;
      if (!validationResults.passwordMatch) {
        errors = {passwordMatch: PASSWORD_MATCH_ERROR_MESSAGE};
      }
      if (!validationResults.passwordValidity) {
        errors = {passwordValidity: PASSWORD_VALIDITY_ERROR_MESSAGE, ...errors};
      }

      return errors;
    }
  }

  componentWillMount() {
    ReactGA.pageview('Register');
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">
                  Have an account?
                </Link>
              </p>

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.changeUsername} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      maxLength={PASSWORD_LENGTH_MAX}
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password Retype"
                      maxLength={PASSWORD_LENGTH_MAX}
                      value={this.props.passwordRetype}
                      onChange={this.changePasswordRetype} />
                  </fieldset>

                  <ListErrors errors={this.props.errors} />
                  
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
