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
      visible: false
    }

    this._scrollToTop = this._scrollToTop.bind(this)
  }

  componentDidMount() {
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

  render() {
    return (
      <View style={{ flex: 1 }}>
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
    allIds: state.post.group.allIds,
    byId: state.post.group.byId
  }
}

export default connect(
  mapStateToProps,
  { fetchPostsBy, createPost, getPost, postVote }
)(GroupFeed)
