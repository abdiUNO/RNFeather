import Post from "../../components/Post"
import React, { Component } from "react"
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StyleSheet
} from "react-native"
import { Icon } from "react-native-elements"
import KeyboardSpacer from "react-native-keyboard-spacer"
import { connect } from "react-redux"
import { addComment, postVote } from "@redux/modules/post"
import DismissKeyboard from "dismissKeyboard"
import Comment from "../../components/Comment"

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
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#fff",
          left: 0,
          position: "absolute",
          bottom: 1
        }}
      >
        <View style={{ flex: 4 }}>
          <TextInput
            style={{
              width: "100%",
              backgroundColor: "white",
              borderRadius: 5,
              marginLeft: 15,
              marginTop: 7,
              marginRight: 25,
              height: 40
            }}
            maxLength={160}
            autoFocus={true}
            placeholder="Add a comment"
            onSubmitEditing={this.onAdd}
            onChangeText={this.onChanged}
          >
            {this.state.comment}
          </TextInput>
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
                marginTop: 10
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

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
