import { RSAA } from "redux-api-middleware"
import { log, url } from "@src/utils"
import { normalize, schema } from "normalizr"

const postSchema = new schema.Entity("posts", {})
const commentSchema = new schema.Entity("comments", {})

const postListSchema = new schema.Array(postSchema)
const commentsListSchema = new schema.Array(commentSchema)

// Actions
const API_REQUEST = "POSTS/API_REQUEST"
const REQUEST_FAILURE = "POSTS/REQUEST_FAILURE"

const FETCH_POSTS = "POSTS/FETCH_POSTS"
const ADD_POST = "POSTS/ADD_POST"

const GET_POST_REQUEST = "POST/GET_POST_REQUEST"
const GET_POST = "POSTS/GET_POST_SUCCESS"
const GET_POST_FAILURE = "POSTS/GET_POST_FAILURE"

const ADD_COMMENT = "POSTS/ADD_COMMENT_SUCCESS"
const ADD_COMMENT_FAILURE = "POSTS/ADD_COMMENT_FAILURE"

const POST_VOTE = "auth/POST_VOTE_SUCCESS"
const POST_VOTE_FAILURE = "auth/POST_VOTE_FAILURE"

const FETCH_GROUP_POSTS = "POSTS/FETCH_GROUP_POSTS"
const FETCH_REQUEST = "POSTS/FETCH_REQUEST"

function getRandomColor() {
  const color = [
    "#3498db",
    "#e74c3c",
    "#9b59b6",
    "#27ae60",
    "#2c3e50",
    "#90b5ab",
    "#686de0",
    "#ff3838",
    "#ff6348",
    "#4b4b4b"
  ]

  return color[Math.floor(Math.random() * color.length)]
}

const postReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        comments: {
          byId: action.payload.entities.comments,
          allIds: action.payload.result
        }
      }
    case POST_VOTE:
      return {
        ...state,
        votesCount: state.votesCount + action.payload.dir,
        voted: action.payload
      }
    case ADD_COMMENT:
      var id = action.payload.comment.result
      var comment = action.payload.comment.entities.comments

      return {
        ...state,
        comments: {
          byId: {
            ...state.comments.byId,
            [id]: comment[id]
          },
          allIds: [...state.comments.allIds, id]
        },
        commentsCount: state.commentsCount + 1
      }
  }
}

// Reducer
export default function reducer(
  state = {
    fetching: false,
    loading: false,
    group: {
      byId: null,
      allIds: null
    },
    allIds: [],
    byId: {}
  },
  action = {}
) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        group: {}
      }
    case API_REQUEST:
      return {
        ...state,
        loading: true,
        group: {}
      }
    case GET_POST_REQUEST:
      return {
        ...state,
        item: null,
        loading: true
      }
    case FETCH_GROUP_POSTS:
      return {
        ...state,
        loading: false,
        group: {
          byId: action.payload.entities.posts,
          allIds: action.payload.result
        }
      }
    case FETCH_POSTS:
      return {
        ...state,
        loading: false,
        fetching: false,
        byId: action.payload.entities.posts,
        allIds: action.payload.result
      }
    case ADD_POST:
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          ...action.payload.entities.posts
        },
        allIds: [action.payload.result, ...state.allIds]
      }
    case "UNSET":
      return {
        ...state,
        loading: false,
        byId: null,
        allIds: []
      }
    case GET_POST:
    case ADD_COMMENT:
    case POST_VOTE:
      return {
        ...state,
        loading: false,
        item: action.payload.id,
        byId: {
          ...state.byId,
          [action.payload.id]: postReducer(
            state.byId[action.payload.id],
            action
          )
        }
      }
    default:
      return state
  }
}

export const fetchPosts = () => (dispatch, getState) => {
  const user = getState().auth.user
  dispatch({
    [RSAA]: {
      endpoint: `${url}/post`,
      method: "GET",
      types: [
        FETCH_REQUEST,
        {
          type: FETCH_POSTS,
          payload: async (action, state, res) =>
            res.json().then(posts => normalize(posts, postListSchema))
        },
        {
          type: REQUEST_FAILURE,
          payload: async (action, state, res) => {
            res.json().then(response => log("FAIL", response))
          }
        }
      ],
      headers: {
        Authorization: `Bearer ${user.token.accessToken}`
      }
    }
  })
}

export const fetchPostsBy = item => (dispatch, getState) => {
  const user = getState().auth.user
  dispatch({
    [RSAA]: {
      endpoint: `${url}/post/category/${item.title}`,
      method: "GET",
      types: [
        API_REQUEST,
        {
          type: FETCH_GROUP_POSTS,
          payload: async (action, state, res) => {
            const posts = await res.json()
            console.log("POSTS", posts)
            return normalize(posts, postListSchema)
          },
          meta: {
            routeName: "GroupFeed",
            params: { group: item }
          }
        },
        {
          type: REQUEST_FAILURE,
          payload: async (action, state, res) => {
            res.json().then(response => log("FAIL", response))
          }
        }
      ],
      headers: {
        Authorization: `Bearer ${user.token.accessToken}`
      }
    }
  })
}

export const createPost = (text, color, category, image) => (
  dispatch,
  getState
) => {
  const user = getState().auth.user
  console.log(image)

  dispatch({
    [RSAA]: {
      endpoint: `${url}/post`,
      method: "POST",
      types: [
        API_REQUEST,
        {
          type: ADD_POST,
          payload: async (action, state, res) => {
            const response = await res.json()
            return normalize(response, postSchema)
          }
        },
        {
          type: REQUEST_FAILURE,
          payload: async (action, state, res) => {
            res.json().then(response => console.log("FAIL", response))
          }
        }
      ],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token.accessToken}`
      },
      body: JSON.stringify({
        text,
        category,
        color,
        image
      })
    }
  })
}

export const getPost = postId => (dispatch, getState) => {
  const user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/post/${postId}/comments`,
      method: "GET",
      types: [
        GET_POST_REQUEST,
        {
          type: GET_POST,
          payload: async (action, state, res) => {
            const comments = await res.json()
            return {
              ...normalize(comments, commentsListSchema),
              id: postId
            }
          },
          meta: {
            routeName: "Detail"
          }
        },
        {
          type: GET_POST_FAILURE,
          payload: async (action, state, res) => res.json()
        }
      ],
      headers: {
        Authorization: `Bearer ${user.token.accessToken}`
      }
    }
  })
}

export const addComment = (postId, text) => (dispatch, getState) => {
  const user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/post/${postId}/comment`,
      method: "POST",
      types: [
        API_REQUEST,
        {
          type: ADD_COMMENT,
          payload: async (action, state, res) => {
            const comment = await res.json()
            return {
              comment: normalize(comment, commentSchema),
              id: postId
            }
          }
        },
        {
          type: ADD_COMMENT_FAILURE,
          payload: async (action, state, res) => {
            const error = await res.json()
            console.log("FAIL", error)
          }
        }
      ],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token.accessToken}`
      },
      body: JSON.stringify({
        text
      })
    }
  })
}

export const postVote = (postId, dir) => (dispatch, getState) => {
  var user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/post/${postId}/vote?dir=${dir}`,
      types: [
        API_REQUEST,
        {
          type: POST_VOTE,
          payload: async (action, state, res) => {
            const vote = await res.json()
            return {
              ...vote,
              id: vote.postId
            }
          }
        },
        POST_VOTE_FAILURE
      ],
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token.accessToken}`
      }
    }
  })
}
