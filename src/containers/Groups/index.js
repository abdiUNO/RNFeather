/* @flow */

import React, { Component } from "react"
import { Alert, View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import GroupsList from "./List"
import { fetchGroups, joinGroup } from "@redux/modules/group"
import Spinner from "react-native-loading-spinner-overlay"
import {
  clearNotifications,
  addNotification,
  postReply
} from "@redux/modules/notifications"

class Groups extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false
    }
    this.props.fetchGroups()
    // this.props.postReply("fb1d23e9-e28d-452b-81e7-9f830fab1b9b", {
    //   text: "similique qui amet molestias voluptatibus id mollitia",
    //   username: "John"
    // })
  }

  componentDidMount() {
    this.props.navigation.setParams({
      joinGroup: () => {
        if (this.props.groups.length < 3) this.props.joinGroup()
        else Alert.alert("Can't join more than three groups")
      }
    })
  }

  onPress = group => {
    if (
      this.props.notifications[group.id] &&
      this.props.notifications[group.id].unread_messages > 0
    ) {
      this.props.clearNotifications(group.id)
    }

    this.props.navigation.navigate("Chat", {
      group,
      user: this.props.user
    })
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.props.joining}
          textContent={"Joining group..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        {this.props.user && (
          <GroupsList
            style={styles.container}
            groups={this.props.groups}
            notifications={this.props.notifications || {}}
            onPress={this.onPress}
          />
        )}
      </View>
    )
  }
}
const grey = "#f7f7f7"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    groups: state.group.all,
    loading: state.group.loading,
    joining: state.group.joining,
    notifications: state.notifications.groups
  }
}

export default connect(
  mapStateToProps,
  { fetchGroups, joinGroup, clearNotifications, addNotification, postReply }
)(Groups)
