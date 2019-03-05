/* eslint-disable prettier/prettier */
import React, { Component } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import {
  List,
  ListItem,
  Button,
  Icon,
  ButtonGroup
} from "react-native-elements"
import { connect } from "react-redux"
import { subscribeToGroup, unsubscribeToGroup } from "@redux/modules/auth"
import { fetchPosts, fetchPostsBy } from "@redux/modules/post"
import colors from "@common/colors"
class GroupList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      headerTitle: "Groups"
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
          title: "UNO Crushes",
          joined: false,
          description:
            "Tell the world about your crush on campus, anonymously 😉 OP is anonymous in the comment section too."
        },
        {
          title: "Gaming",
          joined: false,
          description:
            "A group for gamers and anything game related. Discuss video games, board games and card games. This is your chance to meet others around you to play videogames with or have a pick up game of Magic the Gathering or even Yu-Gi-Oh."
        },
        {
          title: "Stories",
          joined: false,
          description:
            "Post about your experiences here in college. The more messed up, the better."
        },
        {
          title: "Anonymous",
          joined: false,
          description:
            "Remember those anonymous apps, Yik-Yak andWhisper? Well, here ya go. Post anonymously to your hearts content. Try to keep it civil."
        },
        {
          title: "Sports",
          joined: false,
          description:
            "A group for all things sports. Argue over whose team is best, and terrible calls made by referees. This is also your chance to find a pick up game with others near you."
        },
        {
          title: "Music",
          joined: false,
          description:
            "A group for technical musicians and simple music lovers alike. Post and suggest songs you like that you’d like others to listen to, discuss your favorite artists, and rant about your musical preferences.Kanye West is the Kanye Best."
        },
        {
          title: "Movies",
          joined: false,
          description:
            "A group for filmmakers, movie buffs, or casuals who love movies. Suggest movies that you’d like others to see, discuss your favorite films and rant about what you saw on Netflix."
        },
        {
          title: "News",
          joined: false,
          description: "Share and discuss the latest news. Keep it civil."
        },
        {
          title: "Business",
          joined: false,
          description:
            "A group for business majors and all things business related. Share your business ideas, or discuss the stock market and other things that are businessy. Let’s get down to business."
        },
        {
          title: "Art",
          joined: false,
          description:
            "A group for all things artsy fartsy. Post your own artwork and discuss the artwork of others. Show us what you’re working on.Don’t be shy."
        },
        {
          title: "Science and Engineering",
          joined: false,
          description:
            "This group is for the smarty-pants’ who major in science and engineering or are simply interested. Ask your science questions, or discuss new findings and theories."
        },
        {
          title: "Fitness",
          joined: false,
          description:
            "This groupis for all things fitness.Post your fitness memes, questions, advice,goalsor try to find a work out buddy. Meat heads welcome."
        },
        {
          title: "Conservative",
          joined: false,
          description:
            "For the conservatives on campus. Discuss politics, share your memes, news, opinions and don’t forget to keep it civil."
        },
        {
          title: "Liberal",
          joined: false,
          description:
            "For the liberals on campus. Discuss politics, share your memes, news, opinions and don’t forget to keep it civil."
        }
      ],
      selectedIndex: 0
    }

    this.updateIndex = this.updateIndex.bind(this)
  }

  _onPress = (item, joinedGroup) => {
    this.props.subscribeToGroup(item.title, joinedGroup, () => {
      this.props.fetchPosts()
    })
  }

  goToGroup = item => {
    this.props.fetchPostsBy(item)
  }

  renderGroup = (item, index) => {
    const joinedGroup = this.props.user.subscription.indexOf(item.title) > -1
    item.joined = joinedGroup

    return (
      <View style={{ padding: 12.5 }} key={index}>
        <ListItem
          containerStyle={styles.listItem}
          key={index}
          title={item.title}
          onPress={() => this.goToGroup(item)}
          rightIcon={
            <Button
              borderRadius={5}
              onPress={() => this._onPress(item, joinedGroup)}
              title={joinedGroup ? "Joined" : "Join Group"}
              buttonStyle={{ paddingVertical: 15, paddingHorizontal: 20 }}
              outline={joinedGroup}
              backgroundColor="#f39c12"
              color={joinedGroup ? "#f39c12" : "#fff"}
            />
          }
        />
      </View>
    )
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  render() {
    const buttons = ["Your Groups", "Explore"]
    const { selectedIndex } = this.state

    return (
      <ScrollView>
        <List
          containerStyle={{
            padding: 0,
            margin: 0,
            marginTop: 0,
            backgroundColor: "transparent",
            borderWidth: 0,
            borderColor: "#eae9ee"
          }}
        >
          {this.state.groups.map(this.renderGroup)}
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: colors.grey5,
    borderWidth: 1,
    borderRadius: 3.5,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    shadowColor: colors.grey0,
    shadowOffset: {
      width: 2.5,
      height: 2.5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingTop: 15,
    paddingBottom: 15
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  { subscribeToGroup, unsubscribeToGroup, fetchPosts, fetchPostsBy }
)(GroupList)
