import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { Icon, Text } from "react-native-elements"
import { connect } from "react-redux"
import { vote } from "@redux/modules/post"
import Detail from "../containers/Feed/Detail"

class Vote extends Component {
  constructor(props) {
    super(props)
  }

  upVote = () => {
    if (this.props.voteDir === 0) {
      this.props.onUpVote(1)
    }
  }

  downVote = () => {
    if (this.props.voteDir === 0) {
      this.props.onUpVote(-1)
    }
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={this.upVote}
          hitSlop={{ top: 6, bottom: 0, left: 15, right: 15 }}
        >
          <Icon
            type="font-awesome"
            name="chevron-up"
            size={25}
            color="#fff"
            containerStyle={{
              position: "relative",
              bottom: 5,
              opacity: this.props.voteDir == 1 ? 1 : 0.25
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 15
          }}
        >
          {this.props.votesCount}
        </Text>
        <TouchableOpacity
          onPress={this.downVote}
          hitSlop={{ top: 0, bottom: 5, left: 15, right: 15 }}
        >
          <Icon
            type="font-awesome"
            name="chevron-down"
            color="#fff"
            size={25}
            containerStyle={{
              position: "relative",
              opacity: this.props.voteDir == -1 ? 1 : 0.25
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default Vote
