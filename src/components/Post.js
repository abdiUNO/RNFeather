import React, { Component } from "react"
import { Card, Icon, ListItem, Text, Tile } from "react-native-elements"
import {
  TouchableOpacity,
  View,
  Dimensions,
  Linking,
  Image
} from "react-native"
import Vote from "@common/Vote"
import BaseCard from "@common/BaseCard"
const width = Dimensions.get("window")
import Lightbox from "react-native-lightbox"

const WINDOW_WIDTH = Dimensions.get("window").width
const BASE_PADDING = 10

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

const COLORS = {
  transparent: "transparent",
  white: "#fff",
  black: "#000",
  subGrey: "#dee1e3",
  grey: "#949294"
}

export default class Post extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.data.votesCount !== nextProps.data.votesCount ||
      this.props.data.text !== nextProps.data.text
    )
  }

  vote = dir => {
    const data = this.props.data
    if (this.props.onVote) this.props.onVote(data.id, dir)
  }

  constructor(props) {
    super(props)

    this.state = {
      didOpen: false
    }
  }

  render() {
    const data = this.props.data
    let LightboxView = <View />

    if (data.image) {
      LightboxView = (
        <Lightbox
          backgroundColor="rgba(33,33,33,0.85)"
          activeProps={{
            height: WINDOW_WIDTH,
            width: WINDOW_WIDTH,
            resizeMode: "contain"
          }}
        >
          <Image
            style={{
              height: 100
            }}
            resizeMode="cover"
            source={{
              uri: `https://feather.sfo2.cdn.digitaloceanspaces.com/${
                data.image
              }`
            }}
          />
        </Lightbox>
      )
    }

    const avatar = {
      uri: data.user.image
        ? `https://feather.sfo2.cdn.digitaloceanspaces.com/${data.user.image}`
        : "https://picsum.photos/200/?random"
    }

    return (
      <BaseCard color={data.color}>
        <ListItem
          style={{ padding: 0 }}
          containerStyle={{
            paddingTop: 0,
            paddingBottom: 0,
            borderTopWidth: 0,
            borderBottomColor: "rgba(222, 225, 227,0.5)",
            borderBottomWidth: 2
          }}
          avatarStyle={{
            width: this.props.comment ? 35 : 45,
            height: this.props.comment ? 35 : 45,
            borderRadius: this.props.comment ? 15 : 22.5
          }}
          titleStyle={{ marginLeft: 25, color: "#fff" }}
          subtitleStyle={{ marginLeft: 25, color: "#fff" }}
          roundAvatar
          title={
            data.category === "Anonymous" ? "----------" : data.user.username
          }
          avatar={
            data.category === "Anonymous"
              ? require("../containers/Feed/anon_grey.jpg")
              : avatar
          }
          subtitle={data.category}
          rightIcon={
            <Vote
              onDownVote={this.vote}
              onUpVote={this.vote}
              voteDir={data.voted ? data.voted.dir : 0}
              votesCount={data.votesCount}
            />
          }
        />
        <View style={{ paddingHorizontal: 5, paddingVertical: 15 }}>
          <Text style={{ fontSize: 15, color: "#fff" }}>{data.text}</Text>
        </View>

        {(data.links != null) & (data.links.length > 0) ? (
          <Tile
            onPress={() => Linking.openURL(data.links[0].url)}
            imageSrc={{
              uri: data.links[0].image
            }}
            logoSrc={{
              uri: data.links[0].logo
            }}
            title={data.links[0].title}
            icon={{
              name: "logo-youtube",
              type: "ionicon",
              color: "#e93323",
              size: 50
            }}
            titleStyle={{
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 25,
              paddingRight: 25,
              paddingTop: 10,
              textAlign: "center",
              marginBottom: 0
            }}
            imageContainerStyle={{ backgroundColor: data.color }}
            featured
          />
        ) : (
          <View />
        )}
        {LightboxView}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 25,
            paddingTop: this.props.comment ? 12.5 : 25,
            paddingBottom: this.props.comment ? 25 : 0
          }}
        >
          <Icon {...CATEGORIES[data.category]} color="#fff" size={18} />
          {this.props.comment ? (
            <View />
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center"
              }}
            >
              <Icon
                type="font-awesome"
                name="comments"
                color="#fff"
                size={15}
              />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  paddingLeft: 12.5,
                  fontSize: 13
                }}
              >
                {data.commentsCount} replies
              </Text>
            </View>
          )}
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 13,
              alignSelf: "center"
            }}
          >
            {data.time}
          </Text>
        </View>
      </BaseCard>
    )
  }
}
