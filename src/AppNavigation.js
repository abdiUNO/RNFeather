import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation"

import Groups from "@containers/Groups/"
import Feed from "@containers/Feed/"
import Settings from "@containers/Settings/"
import Tabs from "@common/Tabs.js"
import Chat from "@containers/Groups/Chat"
import Login from "@containers/Auth/Login"
import GroupSettings from "@containers/Groups/Settings"
import Welcome from "@containers/Auth/Welcome"
import WaitScreen from "@containers/Auth/Wait"
import Detail from "@containers/Feed/Detail"
import AuthLoadingScreen from "@containers/Auth/Loading"
import { Text, TouchableOpacity } from "react-native"
import React from "react"
import { Icon } from "react-native-elements"
import GroupList from "@containers/Feed/GroupList"
import SignUp from "@containers/Auth/SignUp"
import ImageUpload from "@containers/Auth/ImageUpload"
import GroupFeed from "@containers/Feed/GroupFeed"

const TabNavigator = createBottomTabNavigator(
  {
    Cliques: {
      screen: Groups,
      navigationOptions: {
        headerTitle: "Cliques",
        headerRight: (
          <TouchableOpacity>
            <Text style={{ color: "#fff" }}>+ Join Group</Text>
          </TouchableOpacity>
        )
      }
    },
    Home: { screen: Feed },
    Settings
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarComponent: Tabs
  }
)

TabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index]

  // You can do whatever you like here to pick the title based on the route name
  let headerTitle = routeName
  if (routeName === "Cliques")
    return {
      headerTitle,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            const { params } = navigation.state.routes[0]
            if (params) params.joinGroup()
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 5 }}
        >
          <Text style={{ fontWeight: "bold", marginRight: 12, color: "#fff" }}>
            + Join Clique
          </Text>
        </TouchableOpacity>
      )
    }
  else if (routeName === "Home") {
    return {
      headerTitle,
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GroupList")
          }}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 5 }}
        >
          <Text style={{ fontWeight: "bold", marginRight: 12, color: "#fff" }}>
            Join Group
          </Text>
        </TouchableOpacity>
      )
    }
  } else
    return {
      headerTitle
    }
}

const options = {
  navigationOptions: ({ navigation }) => {
    let { routeName } = navigation.state

    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = routeName

    return {
      headerTitle,
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#FF8900",
        borderBottomColor: "#FF8900",
        color: "#fff"
      }
    }
  },
  animationEnabled: true
}

const Auth = createStackNavigator(
  {
    Login,
    SignUp,
    ImageUpload,
    WaitScreen
  },
  options
)

const App = createStackNavigator(
  {
    TabNavigator,
    Chat,
    Detail,
    GroupList,
    GroupSettings,
    GroupFeed
  },
  options
)

const Main = createSwitchNavigator(
  {
    AuthLoadingScreen,
    App,
    Auth
  },
  options
)

export default Main
