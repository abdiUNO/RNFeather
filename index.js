/** @format */
import "babel-polyfill"
import { AppRegistry } from "react-native"
import App from "./src/App"
import { name as appName } from "./app.json"
if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"))
}
//import bgMessaging from "./src/bgMessaging" // <-- Import the file you created in (2)

AppRegistry.registerComponent(appName, () => App)
// AppRegistry.registerHeadlessTask(
//   "RNFirebaseBackgroundMessage",
//   () => bgMessaging
// )
