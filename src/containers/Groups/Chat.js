import React, { Component } from "react"
import { Text, TouchableOpacity } from "react-native"
import { GiftedChat } from "react-native-gifted-chat"
import { fetchGroups } from "@redux/modules/group"
import { Icon } from "react-native-elements"
import Fire from "@services/Fire"

class Chat extends Component<{}> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GroupSettings", { group: params.group })
          }
          style={{
            marginRight: 15
          }}
        >
          <Icon name="info" type="feather" color="#fff" />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    this._isMounted = true

    this.state = {
      messages: []
    }
  }

  get user() {
    const { params } = this.props.navigation.state

    return {
      _id: 2,
      name: "Nickolas Connelly",
      avatar: "https://placeimg.com/140/140/any",
      groupId: params.group.id
    }
  }

  addMessage = message => {
    if (this._isMounted)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
  }

  listenForMessages = groupId => {
    Fire.shared.on(groupId, this.addMessage)
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    )
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    this.listenForMessages(params.group.id)
  }

  componentWillUnmount() {
    this._isMounted = false
  }
}

export default Chat
