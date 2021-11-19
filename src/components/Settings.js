import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  DELETE_USER,
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED
} from '../constants/actionTypes';
import { PASSWORD_LENGTH_MAX } from '../constants/inputLengthLimits';
import { validatePassword } from '../validators/validatePassword';
import { 
  PASSWORD_MATCH_ERROR_MESSAGE,
  PASSWORD_VALIDITY_ERROR_MESSAGE 
} from '../constants/errorMessages';

import ReactGA from 'react-ga';

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      passwordRetype: '',
      errors: null
    };
    
    this.updateErrors = state => {
      const copiedState = Object.assign({}, state);

      const password = copiedState.password;
      const passwordRetype = copiedState.passwordRetype;
      const validationResults = validatePassword(password, passwordRetype);
      
      let errors;
      if (!validationResults.passwordMatch) {
        errors = {passwordMatch: PASSWORD_MATCH_ERROR_MESSAGE};
      }

      if (!validationResults.passwordValidity) {
        errors = {passwordValidity: PASSWORD_VALIDITY_ERROR_MESSAGE, ...errors};
      }
  
      const newState = Object.assign({}, copiedState, { errors: errors });
      this.setState(newState);
    }

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.updateErrors(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const state = this.state;
      const copiedState = Object.assign({}, state);
      const password = copiedState.password;
      const passwordRetype = copiedState.passwordRetype;

      const validationResults = validatePassword(password, passwordRetype);
      if (validationResults.passwordMatch && validationResults.passwordValidity) {
        const state = copiedState;
        const user = Object.assign({}, state);
        this.props.onSubmitForm(user);
      } else {
        this.updateErrors(copiedState);
      }
    };
  }

  componentWillMount() {
    ReactGA.pageview('Settings');
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || '',
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        image: nextProps.currentUser.image || '',
        username: nextProps.currentUser.username,
        bio: nextProps.currentUser.bio,
        email: nextProps.currentUser.email
      }));
    }

    if (nextProps.errors) {
      this.setState(Object.assign({}, this.state, {
        errors: nextProps.errors
    }));
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>

          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={this.state.image}
              onChange={this.updateState('image')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={this.state.bio}
              onChange={this.updateState('bio')}>
            </textarea>
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateState('email')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              maxLength={PASSWORD_LENGTH_MAX}
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Retype Password"
              maxLength={PASSWORD_LENGTH_MAX}
              value={this.state.passwordRetype}
              onChange={this.updateState('passwordRetype')} />
          </fieldset>

          <ListErrors errors={this.state.errors}></ListErrors>
          
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.state.inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickDelete: user => 
    dispatch({ type: DELETE_USER, payload: agent.Auth.delete(user) }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <SettingsForm
                errors={this.props.errors}
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />
        
              <button
                className="btn btn-outline-danger pull-xs-right"
                onClick={this.props.onClickDelete}>
                Delete Account
            </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
