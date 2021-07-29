import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {
    id,
    username,
    comment,
    isLiked,
    initialClassName,
    date,
  } = commentDetails

  const initialUpperCase = username ? username[0].toUpperCase() : ''
  const isLikedText = isLiked ? 'button active' : 'button'
  const imageLikeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickLikeButton = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteText = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  const postedTime = formatDistanceToNow(date)

  return (
    <li className="comment-list">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initialUpperCase">{initialUpperCase}</p>
        </div>
        <div>
          <div className="username-container">
            <p className="usernameText">{username}</p>
            <p className="time-display">{postedTime} ago</p>
          </div>
          <p className="comment-text">{comment}</p>
        </div>
      </div>
      <div className="button-container">
        <div className="like-button-container">
          <img src={imageLikeUrl} className="image-like" alt="like" />
          <button
            className={isLikedText}
            type="button"
            onClick={onClickLikeButton}
          >
            like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onDeleteText}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-button"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
