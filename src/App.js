import React, { Component } from "react"
import NavigationActions from "@services/navigation"
import AppNavigation from "./AppNavigation.js"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/configureStore"
import { PersistGate } from "redux-persist/integration/react"
import NotificationsController from "./containers/NotificationsController"
//persistor.purge()
export default class App extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <PersistGate persistor={persistor}>
          <NotificationsController />
          <AppNavigation
            ref={navigatorRef => {
              NavigationActions.setTopLevelNavigator(navigatorRef)
            }}
          />
        </PersistGate>
      </Provider>
    )
  }
}
