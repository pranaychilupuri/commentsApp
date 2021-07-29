import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddingComment = event => {
    event.preventDefault()
    const {username, comment} = this.state

    const initialBackgroundColor = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  render() {
    const {username, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Comments</h1>
          <div className="comments-text-container">
            <form className="form-container" onSubmit={this.onAddingComment}>
              <p className="form-text">Say Something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                className="input-name"
                value={username}
                onChange={this.onChangeName}
              />
              <textarea
                className="input-text"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onChangeComment}
                rows="6"
              />
              <button className="add-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comment-image"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="comment-heading">
            <span className="count-text">{commentsList.length}</span>
            Comments
          </p>
          <ul className="list-comments">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
