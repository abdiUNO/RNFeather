import React, { Component } from "react"
import NavigationActions from "@services/navigation"
import AppNavigation from "./AppNavigation.js"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/configureStore"
import { PersistGate } from "redux-persist/integration/react"

//persistor.purge()
export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
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
