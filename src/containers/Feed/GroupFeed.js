/* @flow */

import React, { Component } from "react"
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text
} from "react-native"
import { Icon, Button, Card } from "react-native-elements"
import { connect } from "react-redux"

import Post from "../../components/Post"
import PostModal from "@components/Modal"
import { BaseCard } from "@common/BaseCard"
import {
  fetchPostsBy,
  createPost,
  getPost,
  postVote
} from "@redux/modules/post"

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
  }
}

const COLORS = {
  transparent: "transparent",
  white: "#fff",
  black: "#000",
  subGrey: "#dee1e3",
  grey: "#949294"
}

class GroupFeed extends Component<{}> {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      descriptionVisible: true
    }

    this._scrollToTop = this._scrollToTop.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.navigation.state

    this.setState({ descriptionVisible: !params.group.joined })
    this.props.navigation.setParams({
      scrollToTop: this._scrollToTop
    })
  }

  _scrollToTop() {
    if (this.flatListRef) {
      this.flatListRef.scrollToOffset({ x: 0, y: 0, animated: true })
    }
  }

  _keyExtractor(item) {
    return item
  }

  _renderPost = data => {
    const post = this.props.byId[data.item]

    return (
      <View>
        <Post key={data.index} data={post} index={data.index} />
      </View>
    )
  }

  closeModal = () => this.setState({ visible: false })

  openModal = () => this.setState({ visible: true })

  submitPost = (content, color, group, image) => {
    const { params } = this.props.navigation.state
    this.props.createPost(content, color, group, image)
    this.props.fetchPostsBy(params.group.title)
    this.setState({ visible: false })
  }

  renderDescription = () => {
    if (this.state.descriptionVisible === false) return
    const { params } = this.props.navigation.state

    return (
      <Card
        containerStyle={{
          paddingTop: 6,
          paddingRight: 15,
          paddingLeft: 15,
          paddingBottom: 12.5,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "rgba(149, 165, 166,0.2)",
          shadowOpacity: 1,
          margin: 5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <View />
          <TouchableOpacity
            onPress={() => {
              this.setState({ descriptionVisible: false })
            }}
            style={{ alignSelf: "flex-end" }}
          >
            <Icon
              size={20}
              name="times"
              type="font-awesome"
              color="#7f8c8d"
              containerStyle={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ margin: 12.5 }}>
          <Text>{params.group.description}</Text>
        </View>
      </Card>
    )
  }

  render() {
    const { params } = this.props.navigation.state

    return (
      <View style={{ flex: 1 }}>
        <PostModal
          transparent={false}
          closePost={this.closeModal}
          visible={this.state.visible}
          onSubmit={this.submitPost}
          subscriptions={this.props.subscriptionsPicker}
          navigate={this.props.navigation.navigate}
          user={this.props.user}
          groupId={params.group.title}
        />
        {this.renderDescription()}
        {this.props.allIds && !this.props.loading ? (
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            ref={ref => {
              this.flatListRef = ref
            }}
            data={this.props.allIds}
            extraProps={this.props.byId}
            renderItem={this._renderPost.bind(this)}
            keyExtractor={this._keyExtractor}
            refreshing={this.props.loading}
            onRefresh={this.props.fetchPostsBy}
          />
        ) : (
          <View />
        )}
        <TouchableOpacity
          style={styles.postButton}
          onPress={this.openModal}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          <View style={{ opacity: 1 }}>
            <Icon
              iconStyle={styles.postButtonIcon}
              size={40}
              color="#fff"
              name="add"
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 100
  },
  postButton: {
    alignSelf: "center",
    marginBottom: 25,
    position: "absolute",
    bottom: 30,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 5,
    borderRadius: 35,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5
  },
  postButtonIcon: {
    color: "white",
    fontSize: 40,
    opacity: 1,
    fontWeight: "900"
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    allIds: state.post.group.allIds,
    byId: state.post.group.byId,
    loading: state.post.loading
  }
}

export default connect(
  mapStateToProps,
  { fetchPostsBy, createPost, getPost, postVote }
)(GroupFeed)
