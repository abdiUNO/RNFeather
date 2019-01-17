import { RSAA } from "redux-api-middleware"
import { log, url } from "@src/utils"
import { fetchPosts } from "./post"

import { Alert } from "react-native"

console.log(url)
// Actions
const API_REQUEST = "auth/API_REQUEST"
const REQUEST_FAILURE = "auth/REQUEST_FAILURE"

const LOGIN_IN = "auth/LOGIN_IN"
const SIGN_UP = "auth/SIGN_UP"
const SUBSCRIBE_TO_GROUP = "auth/SUBSCRIBE_TO_GROUP"
const UPLOAD_IMAGE = "auth/UPLOAD_IMAGE"

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null
      }
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        errors: {
          ...action.payload.errors,
          message: action.payload.message
        }
      }
    case SIGN_UP:
      return {
        ...state,
        loading: false,
        user: action.payload,
        subscriptionsPicker: action.payload.subscription.map(item => {
          return {
            label: item,
            value: item
          }
        })
      }
    case LOGIN_IN:
      return {
        ...state,
        user: action.payload,
        loading: false,
        subscriptionsPicker: action.payload.subscription.map(item => {
          return {
            label: item,
            value: item
          }
        })
      }
    case SUBSCRIBE_TO_GROUP:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          subscription: action.payload.subscription
        },
        subscriptionsPicker: action.payload.subscription.map(item => {
          return {
            label: item,
            value: item
          }
        })
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          image: action.payload.image
        }
      }
    default:
      return state
  }
}

export const login = (email, password) => {
  return {
    [RSAA]: {
      endpoint: `${url}/user/login`,
      method: "POST",
      types: [
        API_REQUEST,
        {
          type: LOGIN_IN,
          meta: {
            routeName: "WaitScreen",
            params: {}
          }
        },
        {
          type: REQUEST_FAILURE,
          payload: async (action, state, res) => {
            const errors = await res.json()
            Alert.alert(errors.message)
            return errors
          }
        }
      ],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  }
}

export const signup = (username, email, password) => {
  return {
    [RSAA]: {
      endpoint: `${url}/user`,
      method: "POST",
      types: [
        API_REQUEST,
        {
          type: SIGN_UP,
          payload: async (action, state, res) => {
            const pay = await res.json()

            log("GROUPS", pay)

            return pay
          },
          meta: {
            routeName: "ImageUpload",
            params: {}
          }
        },
        {
          type: REQUEST_FAILURE,
          payload: async (action, state, res) => {
            const error = await res.json()
            log("ERROR", error)
          }
        }
      ],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }
  }
}

export const subscribeToGroup = (category, joinedGroup, cb) => (
  dispatch,
  getState
) => {
  var user = getState().auth.user

  const _url = joinedGroup ? `${url}/user/unsubscribe` : `${url}/user/subscribe`

  dispatch({
    [RSAA]: {
      endpoint: `${_url}?category=${category}`,
      types: [
        API_REQUEST,
        {
          type: SUBSCRIBE_TO_GROUP,
          payload: async (action, state, res) => {
            const user = await res.json()
            cb()
            return user
          }
        },
        REQUEST_FAILURE
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

export const unsubscribeToGroup = (category, cb) => (dispatch, getState) => {
  var user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/user/unsubscribe?category=${category}`,
      types: [
        API_REQUEST,
        {
          type: SUBSCRIBE_TO_GROUP,
          payload: async (action, state, res) => {
            const user = await res.json()
            cb()
            return user
          }
        },
        REQUEST_FAILURE
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

export const uploadImage = formData => (dispatch, getState) => {
  const user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/user/image`,
      method: "PUT",
      types: [
        API_REQUEST,
        {
          type: UPLOAD_IMAGE,
          payload: (action, state, res) => res.json(),
          meta: {
            routeName: "GroupList"
          }
        },
        REQUEST_FAILURE
      ],
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token.accessToken}`
      },
      body: formData
    }
  })
}
