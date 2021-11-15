import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import { COMMENT_LENGTH_MAX } from '../../constants/inputLengthLimits';
import { validateCommentAdd } from '../../validators/validateInputs';
import { COMMENT_INPUT_ERROR_MESSAGE } from '../../constants/errorMessages';
import ListErrors from '../ListErrors';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

class CommentInput extends React.Component {
  constructor() {
    super();
    this.state = {
      body: '',
      errors: null
    };

    this.setBody = ev => {
      this.setState({ body: ev.target.value });
    };

    this.createComment = ev => {
      ev.preventDefault();
      if (validateCommentAdd(this.state.body)) {
        const payload = agent.Comments.create(this.props.slug,
          { body: this.state.body });
        this.setState({ body: '', errors: {} });
        this.props.onSubmit(payload);
      } else {
        this.setState({ body: ev.target.value, errors: { 'commentInputError': COMMENT_INPUT_ERROR_MESSAGE } });
      }
    };
  }

  render() {
    return (
      <div>
        <form className="card comment-form" onSubmit={this.createComment}>
          <div className="card-block">
            <textarea className="form-control"
              placeholder="Write a comment..."
              maxLength={COMMENT_LENGTH_MAX}
              value={this.state.body}
              onChange={this.setBody}
              rows="3">
            </textarea>
          </div>
          <div className="card-footer">
            <img
              src={this.props.currentUser.image}
              className="comment-author-img"
              alt={this.props.currentUser.username} />
            <button
              className="btn btn-sm btn-primary"
              type="submit">
              Post Comment
            </button>
          </div>
        </form>
        <ListErrors errors={this.state.errors}></ListErrors>
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
