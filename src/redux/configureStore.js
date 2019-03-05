import { createStore, applyMiddleware, combineReducers } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import { apiMiddleware } from "redux-api-middleware"
import storage from "redux-persist/lib/storage"
import { logger } from "redux-logger"
import thunk from "redux-thunk"

import group from "./modules/group"
import auth from "./modules/auth"
import post from "./modules/post"
import notifications from "./modules/notifications"

import navMiddleware from "./navMiddleware"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "notifications", "post"]
}

const rootReducer = combineReducers({
  group,
  auth,
  post,
  notifications
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(thunk, apiMiddleware, navMiddleware, logger)
)

const persistor = persistStore(store)

export { store, persistor }
