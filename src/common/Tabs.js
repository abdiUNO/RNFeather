// @flow

import React from "react"
import { View, StyleSheet, Text, PixelRatio } from "react-native"
import { Icon } from "react-native-elements"
import TabNavigator from "react-native-tab-navigator"
import PropTypes from "prop-types"
import Badge from "@common/Badge"
import { connect } from "react-redux"

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

  let badge = null
  if (props.notifications && props.notifications.unread_sum > 0) {
    badge = <Badge>{props.notifications.unread_sum}</Badge>
  }

  let repliesBadge = null
  if (props.postsNotifications && props.unread_replies > 0) {
    repliesBadge = <Badge>{props.unread_replies}</Badge>
  }

  return (
    <View>
      <TabNavigator style={{ flex: 1, flexDirection: "row" }}>
        <TabNavigator.Item
          tabStyle={{
            paddingBottom: 5
          }}
          selected={props.navigation.state.index === 0}
          renderBadge={() => badge}
          renderIcon={() => (
            <Icon
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }}
              color={"#FF8900"}
              name="message-text-outline"
              type="material-community"
              size={30}
            />
          )}
          renderSelectedIcon={() => (
            <Icon
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5
              }}
              color={"#FF8900"}
              name="message-text"
              type="material-community"
              size={33}
            />
          )}
          onPress={() => props.navigation.navigate("Cliques")}
        >
          <View />
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={{
            paddingBottom: 5
          }}
          selected={props.navigation.state.index === 1}
          renderIcon={() => (
            <Icon
              containerStyle={{ paddingBottom: 5 }}
              color={"#FF8900"}
              name="home"
              type="feather"
              size={28}
            />
          )}
          renderSelectedIcon={() => (
            <Icon
              containerStyle={{ paddingBottom: 2.5 }}
              color={"#FF8900"}
              name="home"
              type="foundation"
              size={35}
            />
          )}
          onPress={() => homePress()}
        >
          <View />
        </TabNavigator.Item>

        <TabNavigator.Item
          tabStyle={{
            paddingBottom: 5
          }}
          selected={props.navigation.state.index === 2}
          renderBadge={() => repliesBadge}
          renderIcon={() => (
            <Icon
              color={"#FF8900"}
              name="settings-outline"
              type="material-community"
              size={30}
            />
          )}
          renderSelectedIcon={() => (
            <Icon
              containerStyle={{ paddingBottom: 2.5 }}
              color={"#FF8900"}
              name="settings"
              type="material-community"
              size={33}
            />
          )}
          onPress={() => props.navigation.navigate("Settings")}
        >
          <View />
        </TabNavigator.Item>
      </TabNavigator>
    </View>
  )
}

Tabs.propTypes = {
  navigationState: PropTypes.object
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.groups,
    postsNotifications: state.notifications.replies,
    unread_replies: state.notifications.unread_replies
  }
}

export default connect(
  mapStateToProps,
  {}
)(Tabs)

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
