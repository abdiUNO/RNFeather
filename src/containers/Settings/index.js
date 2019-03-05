/* @flow */

import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Card, Button, ListItem } from "react-native-elements"
import { connect } from "react-redux"
//import { logout } from "@redux/modules/post"
import { getPost } from "@redux/modules/post"
import { clearReplies } from "@redux/modules/notifications"
import { persistor } from "../../redux/configureStore"

class Settings extends Component<{}> {
  render() {
    var userAvatar = `https://feather.sfo2.cdn.digitaloceanspaces.com/${
      this.props.user.image
    }`
    return (
      <View style={styles.container}>
        <Card
          wrapperStyle={{ padding: 0 }}
          image={{
            uri: `https://feather.sfo2.cdn.digitaloceanspaces.com/${
              this.props.user.image
            }`
          }}
        />
        <View style={{ backgroundColor: "#fff", marginTop: 25 }}>
          <ListItem
            key={1}
            title="Notifications"
            onPress={() => {
              this.props.navigation.navigate("Notifications", {
                notifications: this.props.notifications || [],
                getPost: this.props.getPost
              })

              this.props.clearReplies()
            }}
          />
        </View>

        <View style={{ paddingTop: 25 }}>
          <Button
            title="LOG OUT"
            activeOpacity={1}
            borderRadius={3}
            underlayColor="transparent"
            style={{ marginHorizontal: 25 }}
            backgroundColor="#f39c12"
            textStyle={{ fontWeight: "bold", color: "white" }}
            onPress={() => {
              persistor.purge()
              this.props.navigation.navigate("Login")
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    notifications: state.notifications.replies,
    byId: state.post.byId
  }
}

export default connect(
  mapStateToProps,
  { getPost, clearReplies }
)(Settings)
