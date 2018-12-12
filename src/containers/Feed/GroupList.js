import React, { Component } from "react"
import { ScrollView, Text } from "react-native"
import { List, ListItem, Button } from "react-native-elements"
import connect from "react-redux/es/connect/connect"
import { subscribeToGroup, unsubscribeToGroup } from "@redux/modules/auth"
import { fetchPosts } from "@redux/modules/post"

class GroupList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      headerTitle: "Feed Groups"
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      subscription: [
        "Gaming",
        "Fitness",
        "Sports",
        "Music",
        "Movies",
        "News",
        "Conservative",
        "Liberal",
        "Business",
        "Art",
        "Science and Engineering",
        "Stories",
        "Anonymous"
      ],
      groups: [
        {
          title: "Gaming",
          joined: true
        },
        {
          title: "Fitness",
          joined: false
        },
        {
          title: "Sports",
          joined: false
        },
        {
          title: "Music",
          joined: true
        },
        {
          title: "Movies",
          joined: true
        },
        {
          title: "News",
          joined: false
        },
        {
          title: "Conservative",
          joined: false
        },
        {
          title: "Liberal",
          joined: false
        },
        {
          title: "Business",
          joined: false
        },
        {
          title: "Art",
          joined: false
        },
        {
          title: "Science and Engineering",
          joined: false
        },
        {
          title: "Stories",
          joined: false
        },
        {
          title: "Anonymous",
          joined: false
        }
      ]
    }
  }

  _onPress = (item, joinedGroup) => {
    this.props.subscribeToGroup(item.title, joinedGroup, () => {
      this.props.fetchPosts()
    })
  }

  renderGroup = (item, index) => {
    const joinedGroup = this.props.user.subscription.indexOf(item.title) > -1
    return (
      <ListItem
        key={index}
        title={item.title}
        rightIcon={
          <Button
            onPress={() => this._onPress(item, joinedGroup)}
            title={joinedGroup ? "Joined Group" : "Join Group"}
            outline={joinedGroup}
            backgroundColor="#f39c12"
            color={joinedGroup ? "#f39c12" : "#fff"}
          />
        }
      />
    )
  }

  render() {
    return (
      <ScrollView>
        <List>{this.state.groups.map(this.renderGroup)}</List>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  { subscribeToGroup, unsubscribeToGroup, fetchPosts }
)(GroupList)
