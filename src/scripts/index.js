import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, browserHistory } from 'react-router';
import { forceUpdate, onUpdate, sendEvent } from './state';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.state;
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment 
          author={comment.author} body={comment.body} key={comment.id} />
      )
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  _handleClick() {
    sendEvent('toggleComments', !this.state.showComments);
  }

  _addComment(author, body) {
    const comment = {
      id: this.state.comments.length + 1,
      author,
      body
    };

    sendEvent('addComment', comment);
  }

  render() {
    const comments = this._getComments();

    let commentNodes;
    let buttonText;

    if (this.state.showComments) {
      buttonText = "Hide Comments";
    } else {
      buttonText = "Show Comments";
    }

    if (this.state.showComments) {
      commentNodes = <div className="comment-list">{comments}</div>
    }

    return(
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comments</h3>
        <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        {commentNodes}
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return(
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete">
            Delete Comment
          </a>
        </div>
      </div>
    );
  }
}

class CommentForm extends React.Component {
  _handleSubmit(e) {
    e.preventDefault();

    let author = this._author; 
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }

  render() {
    return(
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>Join the discussion</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={(input) => this._author = input}/>
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
        </div>
        <div className="comment-form-actions">
          <button type="submit">
      Post comment
          </button>
        </div>
      </form>
    )
  }
}

const main = document.querySelector('main');

onUpdate((state) => {
  ReactDOM.render(
    <CommentBox state={state}/>,
    main
  );
});

forceUpdate();
