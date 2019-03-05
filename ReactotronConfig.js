import Reactotron, { asyncStorage, networking } from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"

console.tron = Reactotron
const reactotron = Reactotron.configure({ name: "Featherr" })
  .use(reactotronRedux(), networking())
  .use(networking())
  .connect()

reactotron.use(tron => ({
  onCommand({ type, payload }) {
    if (type === "test") {
      tron.display({ name: "ECHO", preview: payload })
    }
  }
}))

module.exports = reactotron
