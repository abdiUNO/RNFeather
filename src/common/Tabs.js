// @flow

import React from "react"
import { View, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import TabNavigator from "react-native-tab-navigator"
import PropTypes from "prop-types"

const Tabs = props => {
  let selectedTab = 0

  const homePress = () => {
    const { params } = props.navigation.state.routes[1]
    const routes = props.navigation.state.routes

    if (props.navigation.state.index == 1) {
      params.scrollToTop()
    } else {
      props.navigation.navigate("Home")
    }
  }

  return (
    <View>
      <TabNavigator style={{ flex: 1 }}>
        <TabNavigator.Item
          titleStyle={styles.title}
          selectedTitleStyle={styles.selectedTitle}
          selected={selectedTab === "feed"}
          title={selectedTab === "feed" ? "FEED" : null}
          renderIcon={() => (
            <Icon
              containerStyle={styles.icon}
              color={"#FF8900"}
              name="users"
              type="feather"
              size={30}
            />
          )}
          renderSelectedIcon={() => (
            <Icon color={"#FF8900"} name="users" type="feather" size={30} />
          )}
          onPress={() => props.navigation.navigate("Cliques")}
        />
        <TabNavigator.Item
          titleStyle={styles.title}
          selectedTitleStyle={styles.selectedTitle}
          selected={selectedTab === "feed"}
          title={selectedTab === "feed" ? "FEED" : null}
          renderIcon={() => (
            <Icon
              containerStyle={styles.icon}
              color={"#FF8900"}
              name="home"
              type="feather"
              size={30}
            />
          )}
          renderSelectedIcon={() => (
            <Icon color={"#FF8900"} name="home" type="feather" size={30} />
          )}
          onPress={() => homePress()}
        />

        <TabNavigator.Item
          titleStyle={styles.title}
          selectedTitleStyle={styles.selectedTitle}
          selected={selectedTab === "feed"}
          title={selectedTab === "feed" ? "FEED" : null}
          renderIcon={() => (
            <Icon
              containerStyle={styles.icon}
              color={"#FF8900"}
              name="settings"
              type="feather"
              size={30}
            />
          )}
          renderSelectedIcon={() => (
            <Icon color={"#FF8900"} name="settings" type="feather" size={30} />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        />
      </TabNavigator>
    </View>
  )
}

Tabs.propTypes = {
  navigationState: PropTypes.object
}

export default Tabs

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
    marginBottom: -3
  },
  title: {
    fontWeight: "bold",
    fontSize: 10
  },
  selectedTitle: {
    marginTop: -1,
    marginBottom: 6
  }
})
