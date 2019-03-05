import React, { Component } from "react"
import { View } from "react-native"
import { List, ListItem } from "react-native-elements"

class Notifications extends Component {
  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <List>
          {params.notifications.map((reply, index) => (
            <ListItem
              leftIcon={{
                name: "message",
                type: "material",
                color: "#2F4858",
                size: 20,
                style: {
                  padding: 15
                }
              }}
              key={index}
              title={reply.user + " replied"}
              subtitle={reply.text}
              onPress={() => params.getPost(reply.post)}
            />
          ))}
        </List>
      </View>
    )
  }
}

export default Notifications
