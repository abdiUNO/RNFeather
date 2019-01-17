/* @flow */

import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Card, Button, ListItem } from "react-native-elements"
import connect from "react-redux/es/connect/connect"
//import { logout } from "@redux/modules/post"

class Settings extends Component<{}> {
  render() {
    var userAvatar = `https://feather.sfo2.cdn.digitaloceanspaces.com/${
      this.props.user.image
    }`
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#fff" }}>
          <ListItem
            key={0}
            avatar={{
              uri: userAvatar
            }}
            title={this.props.user.username}
            containerStyle={{
              backgroundImage:
                "linear-gradient(120deg, #f6d365 0%, #fda085 100%);"
            }}
          />
        </View>
        <Card
          containerStyle={{ padding: 0 }}
          image={{
            uri: `https://feather.sfo2.cdn.digitaloceanspaces.com/${
              this.props.user.image
            }`
          }}
        />
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
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  {}
)(Settings)
