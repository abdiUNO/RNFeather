import Post from "../../components/Post"
import React, { Component } from "react"
import {
  FlatList,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native"
import { connect } from "react-redux"
import { addComment, postVote } from "@redux/modules/post"
import DismissKeyboard from "dismissKeyboard"
import Comment from "../../components/Comment"
import InputForm from "../../components/InputForm"

class Detail extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: "Post"
    }
  }

  constructor(props) {
    super(props)
  }

  _renderHeader = () => {
    return (
      <View>
        <Post
          key={"fewf12"}
          data={this.props.post}
          header={true}
          index={0}
          onVote={this.props.postVote}
          bottom={true}
        />
      </View>
    )
  }

  _renderComments = data => {
    const comment = this.props.post.comments.byId[data.item]

    if (this.props.post.category === "Anonymous") {
      comment.user.username = "---------"
    }

    return (
      <View>
        {data.index === 0 ? (
          <View style={{ marginTop: 10, flex: 1 }}>
            <Text
              style={{
                padding: 20,
                paddingLeft: 0,
                fontWeight: "bold",
                color: "#7f8c8d"
              }}
            >
              Comments :
            </Text>
          </View>
        ) : null}
        <Comment
          header={true}
          comment={true}
          key={data.index}
          data={comment}
          color={this.props.post.color}
          category={this.props.post.category}
          index={data.index}
          onVote={this.onVote}
        />
      </View>
    )
  }

  _keyExtractor = (item, index) => {
    return `list-item-${index}`
  }

  addComment = comment => {
    DismissKeyboard()
    this.props.addComment(this.props.post.id, comment)
  }

  renderFlatList() {
    const { params } = this.props.navigation.state

    if (this.props.post && this.props.post.comments) {
      return (
        <FlatList
          ListHeaderComponent={this._renderHeader}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{ paddingBottom: 100 }}
          ref={ref => {
            this.flatListRef = ref
          }}
          data={this.props.post.comments.allIds}
          renderItem={this._renderComments.bind(this)}
          keyExtractor={this._keyExtractor}
        />
      )
    } else {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>{this.renderFlatList()}</ScrollView>
        <InputForm addComment={this.addComment} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})

const mapStateToProps = state => {
  return {
    post: state.post.byId[state.post.item],
    loading: state.post.loading
  }
}

export default connect(
  mapStateToProps,
  { addComment }
)(Detail)
