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
import { Icon, Button } from "react-native-elements"
import { connect } from "react-redux"

import Post from "../../components/Post"
import PostModal from "@components/Modal"
import { fetchPosts, createPost, getPost, postVote } from "@redux/modules/post"

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

class Feed extends Component<{}> {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }

    this._scrollToTop = this._scrollToTop.bind(this)
  }

  componentDidMount() {
    this.props.fetchPosts()
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
      <TouchableWithoutFeedback onPress={() => this.props.getPost(post)}>
        <View>
          <Post
            key={data.index}
            data={post}
            index={data.index}
            onVote={this.props.postVote}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  closeModal = () => this.setState({ visible: false })

  openModal = () => this.setState({ visible: true })

  submitPost = (content, color, group) => {
    this.props.createPost(content, color, group)
    this.setState({ visible: false })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PostModal
          transparent={false}
          closePost={this.closeModal}
          visible={this.state.visible}
          onSubmit={this.submitPost}
          subscriptions={this.props.subscriptionsPicker}
          navigate={this.props.navigation.navigate}
        />
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
          />
        ) : (
          <View />
        )}
        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginBottom: 25,
            position: "absolute",
            bottom: 30,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderColor: "#fff",
            borderStyle: "solid",
            borderWidth: 5,
            borderRadius: 35,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 5
          }}
          onPress={this.openModal}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        >
          <View style={{ opacity: 1 }}>
            <Icon
              iconStyle={{
                color: "white",
                fontSize: 40,
                opacity: 1,
                fontWeight: "900"
              }}
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
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    allIds: state.post.allIds,
    byId: state.post.byId,
    subscriptionsPicker: state.auth.subscriptionsPicker
  }
}

export default connect(
  mapStateToProps,
  { fetchPosts, createPost, getPost, postVote }
)(Feed)
