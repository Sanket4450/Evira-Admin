import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, UncontrolledTooltip } from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '/src/assets/images'

//redux
import { useDispatch } from 'react-redux'
import moment from 'moment/moment'
import StarRatings from 'react-star-ratings'
import {
  deleteReviews,
  getProductReviews,
  setDeleteReviewsRes,
} from '../../../store/actions'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const CommentBox = ({
  value,
  onChange,
  comment,
  onCancelReply,
  isCommentAdd,
  onCancelComment,
  onAdd,
}) => {
  return (
    <div className="w-100">
      <div className="w-100 py-3">
        <Input
          type="textarea"
          name="text"
          id="exampleText"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="w-100">
        {isCommentAdd ? (
          <div className="text-end">
            <Button color="primary" onClick={onAdd}>
              Add Comment
            </Button>
            <Button
              color="secondary"
              className="float-end ms-2"
              onClick={() => {
                onCancelComment()
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="text-end">
            <Button color="primary" onClick={onAdd}>
              Add
            </Button>
            <Button
              color="secondary"
              className="float-end ms-2"
              onClick={() => {
                onCancelReply(comment.commentId)
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

CommentBox.propTypes = {
  onCancelReply: PropTypes.func,
  value: PropTypes.any,
  onChange: PropTypes.func,
  comment: PropTypes.any,

  isCommentAdd: PropTypes.any,
  onCancelComment: PropTypes.func,
  onAdd: PropTypes.func,
}

const ReplyItem = ({ reply, replyIdx, comment, onLikeUnlikeReply }) => {
  const user = reply['user']

  return (
    <div className="d-flex mt-4" key={'_media_' + replyIdx}>
      {user.profile ? (
        <img
          src={images[user.profile]}
          className="avatar-xs me-3 rounded-circle"
          alt="img"
        />
      ) : (
        <div className="avatar-xs me-3">
          <span className="avatar-title bg-primary-subtle text-primary rounded-circle font-size-16">
            N
          </span>
        </div>
      )}

      <div className="flex-grow-1">
        <h5 className="mt-0 mb-1 font-size-15">{user.name}</h5>
        <p className="text-muted">{reply.comment}</p>
        <ul className="list-inline float-sm-end mb-sm-0">
          <li className="list-inline-item">
            <Link
              to="#"
              onClick={() =>
                onLikeUnlikeReply(comment.commentId, reply.replyId)
              }
            >
              {reply.hasLiked ? (
                <>
                  <i className="fa fa-thumbs-up me-1" /> Like
                </>
              ) : (
                <>
                  <i className="far fa-thumbs-up me-1" /> Like
                </>
              )}
            </Link>
          </li>
        </ul>
        <div className="text-muted font-size-12">
          <i className="far fa-calendar-alt text-primary me-1" /> {reply.time}
        </div>
      </div>
    </div>
  )
}

ReplyItem.propTypes = {
  reply: PropTypes.any,
  replyIdx: PropTypes.any,
  comment: PropTypes.any,
  onLikeUnlikeReply: PropTypes.func,
}
const CommentItem = ({
  comment,
  onLikeUnlikeComment,
  onClickReply,
  onCancelReply,
  index,
  onLikeUnlikeReply,
  onAddReply,
  productId,
}) => {
  const user = comment
  const dispatch = useDispatch()
  const [replyText, setReplyText] = useState('')

  const onChangeReplyText = (value) => {
    setReplyText(value)
  }

  const onAddReplyToComment = () => {
    setReplyText('')
  }

  const delReviews = (id) => {
    dispatch(deleteReviews(id))
  }

  const selectProductState = (state) => state.product
  const ProductProperties = createSelector(selectProductState, (product) => ({
    delete_res: product.delete_review_res,
  }))

  const { delete_res } = useSelector(ProductProperties)
  useEffect(() => {
    if (delete_res && delete_res?.refresh) {
      dispatch(getProductReviews(productId))
      dispatch(
        setDeleteReviewsRes({
          loading: false,
          success: null,
          error: null,
          refresh: false,
        })
      )
    }
  }, [dispatch, delete_res?.refresh])

  return (
    <div
      className={
        comment.index + 1 === 1
          ? 'd-flex py-3 border-bottom'
          : 'd-flex py-3 border-bottom'
      }
      key={'__media__' + index}
    >
      {user?.profileImage !== 'Null' ? (
        <img
          src={user?.profileImage}
          className="avatar-xs me-3 rounded-circle"
          alt="img"
        />
      ) : (
        <div className="avatar-xs me-3">
          <span className="avatar-title bg-primary-subtle text-primary rounded-circle font-size-16">
            N
          </span>
        </div>
      )}
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="mt-0 mb-1 font-size-15">{user?.fullName}</h5>
            <p className="text-muted">{comment.message}</p>
          </div>
          <div className="text-muted float-start">
            <StarRatings
              rating={5}
              starRatedColor="#F1B44C"
              starEmptyColor="#74788d"
              numberOfStars={user?.star || user?.stars}
              name="rating"
              starDimension="14px"
              starSpacing="3px"
            />
            <div className="text-danger text-end">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => {
                  delReviews(comment.id)
                }}
              />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </div>
          </div>
        </div>
        <ul className="list-inline float-sm-end mb-sm-0">
          <li className="list-inline-item">
            <Link to="#" onClick={() => onLikeUnlikeComment(comment.id)}>
              {comment.hasLiked ? (
                <>
                  <i className="fa fa-thumbs-up me-1" /> Like
                </>
              ) : (
                <>
                  <i className="far fa-thumbs-up me-1" /> Like {comment?.likes}
                </>
              )}
            </Link>
          </li>
        </ul>
        <div className="text-muted font-size-12">
          <i className="far fa-calendar-alt text-primary me-1" />
          {moment(comment.createdAt).format('MMM Do YY')}
        </div>

        {/* add comment box */}
        {comment.showAddComment && (
          <CommentBox
            comment={comment}
            onCancelReply={onCancelReply}
            isCommentAdd={false}
            value={replyText}
            onChange={onChangeReplyText}
            onAdd={onAddReplyToComment}
          />
        )}

        {comment.replies
          ? (comment.replies || []).map((child, key) => {
              return (
                <ReplyItem
                  reply={child}
                  comment={comment}
                  replyIdx={key}
                  key={key}
                  onLikeUnlikeReply={onLikeUnlikeReply}
                />
              )
            })
          : null}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.any,
  onLikeUnlikeComment: PropTypes.func,
  onClickReply: PropTypes.func,
  onCancelReply: PropTypes.func,
  index: PropTypes.any,
  onLikeUnlikeReply: PropTypes.func,
  onAddReply: PropTypes.func,
}

const Reviews = ({
  comments,
  productId,
  onClickReply,
  onCancelReply,
  onAddReply,
  productReviewRes,
}) => {
  const dispatch = useDispatch()

  const onLikeUnlikeComment = (commentId) => {}

  const onLikeUnlikeReply = (commentId, replyId) => {}
  return (
    <div className="mt-5">
      <h5 className="mb-4">Reviews :</h5>
      {productReviewRes?.loading ? (
        <div className="text-center my-3">
          <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
        </div>
      ) : (
        (comments || [])?.map((comment, k) => {
          return (
            <CommentItem
              comment={comment}
              onLikeUnlikeComment={onLikeUnlikeComment}
              onClickReply={onClickReply}
              onCancelReply={onCancelReply}
              onLikeUnlikeReply={onLikeUnlikeReply}
              index={k}
              key={k}
              onAddReply={onAddReply}
              productId={productId}
            />
          )
        })
      )}
    </div>
  )
}

Reviews.propTypes = {
  comments: PropTypes.array,
  reply: PropTypes.any,
  productId: PropTypes.any,
  onClickReply: PropTypes.func,
  onCancelReply: PropTypes.func,
  onAddReply: PropTypes.func,
  onAddComment: PropTypes.func,
  productReviewRes: PropTypes.any,
}

export default Reviews
