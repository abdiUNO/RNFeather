import React, { Component } from "react"
import { Card, Icon, ListItem, Text } from "react-native-elements"
import { TouchableOpacity, View } from "react-native"
import Vote from "@common/Vote"
import BaseCard from "@common/BaseCard"

const CATEGORIES = {
  Music: {
    name: "headphones",
    type: "feather"
  },
  Gaming: {
    name: "gamepad",
    type: "fontawesome"
  },
  Movies: {
    name: "film",
    type: "feather"
  },
  Fitness: {
    name: "heart",
    type: "font-awesome"
  },
  Sports: {
    name: "futbol-o",
    type: "font-awesome"
  },
  News: {
    name: "newspaper-o",
    type: "font-awesome"
  },
  Conservative: {
    name: "hand-o-right",
    type: "font-awesome"
  },
  Liberal: {
    name: "hand-o-left",
    type: "font-awesome"
  },
  Business: {
    name: "suitcase",
    type: "font-awesome"
  },
  Art: {
    name: "paint-brush",
    type: "font-awesome"
  },
  "Science and Engineering": {
    name: "flask",
    type: "font-awesome"
  },
  Stories: {
    name: "book",
    type: "font-awesome"
  },
  Anonymous: {
    name: "user-secret",
    type: "font-awesome"
  }
}

export default class Comment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      voteDir: 0
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data.votesCount !== nextProps.data.votesCount
  }

  vote = dir => {
    const data = this.props.data
    this.props.onVote(data.id, dir)
  }

  render() {
    const data = this.props.data
    const avatar = {
      uri: `https://feather.sfo2.cdn.digitaloceanspaces.com/${data.user.image}`
    }
    return (
      <BaseCard noPadding={true} noRadius={true} color={this.props.color}>
        <View
          style={{
            paddingVertical: 12.5,
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 4 }}>
            <ListItem
              style={{ padding: 0 }}
              containerStyle={{
                paddingTop: 0,
                paddingBottom: 12.5,
                borderTopWidth: 0,
                borderBottomColor: "rgba(222, 225, 227,0.5)",
                borderBottomWidth: 2,
                marginRight: 15
              }}
              titleStyle={{ marginLeft: 25, color: "#fff" }}
              subtitleStyle={{ marginLeft: 25, color: "#fff" }}
              roundAvatar
              avatar={avatar}
              avatarStyle={{
                width: this.props.comment ? 35 : 45,
                height: this.props.comment ? 35 : 45,
                borderRadius: this.props.comment ? 15 : 22.5
              }}
              title={data.user.username}
              subtitle={data.time}
              hideChevron={true}
            />
            <Text
              style={{
                marginLeft: 10,
                paddingTop: 25,
                paddingBottom: 12.5,
                fontSize: 15,
                color: "#fff"
              }}
            >
              {data.text}
            </Text>
          </View>
        </View>
      </BaseCard>
    )
  }
}
