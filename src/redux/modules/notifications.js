// Actions
const ADD_NOTIFICATION = "notifications/ADD_NOTIFICATION"
const CLEAR_NOTIFICATION = "notifications/CLEAR_NOTIFICATION"
const POST_REPLY = "notifications/POST_REPLY"
const CLEAR_REPLIES = "notifications/CLEAR_REPLIES"

// Reducer
export default function reducer(
  state = { groups: {}, replies: [] },
  action = {}
) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      if (!state.groups) state.groups = {}
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.topic]: {
            unread_messages: state.groups[action.payload.topic]
              ? state.groups[action.payload.topic].unread_messages + 1
              : 1,
            last_message: action.payload.message
          },
          unread_sum: state.groups.unread_sum ? state.groups.unread_sum + 1 : 1
        }
      }
    case POST_REPLY:
      if (!state.replies) state.replies = []
      return {
        ...state,
        replies: [
          ...state.replies,
          {
            text: action.payload.reply,
            user: action.payload.user,
            post: action.payload.post
          }
        ],
        unread_replies: state.unread_replies ? state.unread_replies + 1 : 1
      }
    case CLEAR_REPLIES:
      return {
        ...state,
        unread_replies: 0
      }
    case CLEAR_NOTIFICATION:
      if (!state.groups) state.groups = {}
      return {
        groups: {
          ...state.groups,
          [action.payload.topic]: {
            ...state.groups[action.payload.topic],
            unread_messages: 0
          },

          unread_sum:
            state.groups.unread_sum -
            state.groups[action.payload.topic].unread_messages
        }
      }
    default:
      return state
  }
}

// Action Creators
export function addNotification(topic, message) {
  return { type: ADD_NOTIFICATION, payload: { topic, message } }
}

export function clearNotifications(topic) {
  return { type: CLEAR_NOTIFICATION, payload: { topic } }
}

export function postReply(postId, comment) {
  return {
    type: POST_REPLY,
    payload: { post: postId, user: comment.username, reply: comment.text }
  }
}

export function clearReplies() {
  return { type: CLEAR_REPLIES }
}
