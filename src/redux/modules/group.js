import { RSAA, getJSON } from "redux-api-middleware"
import { log, url } from "@src/utils"
import firebase from "react-native-firebase"

const CHANGE_TYPE = {
  added: "added",
  modified: "modified",
  removed: "removed"
}

// Actions
const API_REQUEST = "group/API_REQUEST"
const REQUEST_FAILURE = "group/REQUEST_FAILURE"

const JOIN_GROUP_REQUEST = "group/JOIN_GROUP_REQUEST"
const JOIN_GROUP = "auth/JOIN_GROUP"
const FETCH_GROUPS = "group/GET_GROUPS_SUCCESS"
const LEAVE_GROUP = "group/LEAVE_GROUP"

const init = {
  all: [],
  error: null,
  loading: false
}

// Reducer
export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case JOIN_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
        joining: true
      }
    case API_REQUEST:
      return {
        ...state,
        loading: true
      }
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case JOIN_GROUP:
      return {
        ...state,
        loading: false,
        joining: false,
        all: [...state.all, action.payload]
      }
    case FETCH_GROUPS:
      log("RES", action.payload)
      return {
        ...state,
        all: action.payload
      }
    case LEAVE_GROUP:
      return {
        ...state,
        all: state.all.filter(group => group.id !== action.meta.groupId)
      }
    default:
      return state
  }
}

export const fetchGroups = () => (dispatch, getState) => {
  const user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/group`,
      method: "GET",
      types: [
        API_REQUEST,
        {
          type: FETCH_GROUPS,
          payload: async (action, state, res) => {
            const groups = await res.json()

            //alert(groups.length)
            groups.map(group => {
              firebase.messaging().subscribeToTopic(group.id)
              //alert(group.id)
            })

            return groups
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

export const joinGroup = () => (dispatch, getState) => {
  const user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/user/${user.id}/group`,
      method: "PUT",
      types: [
        JOIN_GROUP_REQUEST,
        {
          type: JOIN_GROUP,
          payload: async (action, state, res) => res.json()
        },
        {
          type: REQUEST_FAILURE,
          payload: async (action, state, res) => {
            res.json().then(response => log("FAIL", response))
          }
        }
      ],
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token.accessToken}`
      }
    }
  })
}

export const leaveGroup = groupId => (dispatch, getState) => {
  const user = getState().auth.user

  dispatch({
    [RSAA]: {
      endpoint: `${url}/user/${user.id}/group/${groupId}`,
      method: "DELETE",
      types: [
        API_REQUEST,
        {
          type: LEAVE_GROUP,
          payload: async (action, state, res) => res.json(),
          meta: {
            routeName: "Cliques",
            params: {},
            groupId
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token.accessToken}`
      }
    }
  })
}
