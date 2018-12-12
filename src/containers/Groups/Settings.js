import React, { Component } from "react"
import { View, Text } from "react-native"
import { Button, List, ListItem } from "react-native-elements"
import { leaveGroup } from "@redux/modules/group"
import { connect } from "react-redux"

class GroupSettings extends Component {
  render() {
    const { params } = this.props.navigation.state

    return (
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 25,
            marginLeft: 12,
            color: "#596263"
          }}
        >
          Users
        </Text>
        <List>
          {params.group.users.map((user, index) => (
            <ListItem key={index} title={user.username} />
          ))}
        </List>
        <Button
          title="Leave Group"
          activeOpacity={1}
          underlayColor="transparent"
          style={{ marginTop: 25 }}
          backgroundColor="#e74c3c"
          textStyle={{ fontWeight: "bold", color: "white" }}
          onPress={() => this.props.leaveGroup(params.group.id)}
        />
      </View>
    )
  }
}

export default connect(
  null,
  { leaveGroup }
)(GroupSettings)
