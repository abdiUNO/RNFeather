import { Component } from "react"
import { Platform, TextInput, TouchableOpacity, View } from "react-native"
import KeyboardSpacer from "react-native-keyboard-spacer"
import { Icon } from "react-native-elements"
import React from "react"
import DismissKeyboard from "dismissKeyboard"

class InputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.onChanged = this.onChanged.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  onChanged(comment) {
    this.setState({ comment })
  }

  onAdd() {
    DismissKeyboard()

    this.props.addComment(this.state.comment)
    this.setState({ comment: "" })
  }

  render() {
    const KeyboardSpacerPlatform = Platform.select({
      ios: () => KeyboardSpacer,
      android: () => View
    })()

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#fff",
          left: 0,
          position: "absolute",
          bottom: 0
        }}
      >
        <View style={{ flex: 4, backgroundColor: "white", paddingBottom: 5 }}>
          <TextInput
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 5,
              marginLeft: 15,
              marginTop: 7,
              marginRight: 25,
              marginBottom: 0,
              paddingBottom: 0,
              height: 40
            }}
            maxLength={160}
            autoFocus={false}
            placeholder="Add a comment"
            onSubmitEditing={this.onAdd}
            onChangeText={this.onChanged}
          >
            {this.state.comment}
          </TextInput>
          <KeyboardSpacerPlatform />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            transparent
            hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
            vertical
            onPress={this.onAdd}
          >
            <Icon
              type="font-awesome"
              name="paper-plane"
              iconStyle={{
                color: "#4589F3",
                marginTop: 15
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default InputForm
