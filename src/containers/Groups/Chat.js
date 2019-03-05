import React, { Component } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { GiftedChat, Bubble } from "react-native-gifted-chat"
import { fetchGroups } from "@redux/modules/group"
import { Icon } from "react-native-elements"
import Fire from "@services/Fire"
import firebase from "react-native-firebase"

const QUIZ_STARTED = 0
const START_QUIZ = 1
const NO_QUIZ = 2
import Reactotron from "reactotron-react-native"

function parseHtmlEntities(text) {
  var entities = [
    ["amp", "&"],
    ["apos", "'"],
    ["#x27", "'"],
    ["#x2F", "/"],
    ["#39", "'"],
    ["#47", "/"],
    ["lt", "<"],
    ["gt", ">"],
    ["nbsp", " "],
    ["quot", '"']
  ]

  for (var i = 0, max = entities.length; i < max; ++i)
    text = text.replace(
      new RegExp("&" + entities[i][0] + ";", "g"),
      entities[i][1]
    )

  return text
}

class Chat extends Component<{}> {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      headerRight: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GroupSettings", { group: params.group })
          }
          style={{
            marginRight: 15
          }}
          hitSlop={{ top: 10, bottom: 10, left: 20, right: 15 }}
        >
          <Icon name="info" type="feather" color="#fff" />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    this._isMounted = true

    this.state = {
      messages: [],
      quizStatus: NO_QUIZ,
      questions: null,
      index: 0,
      correct: 0
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    firebase.messaging().unsubscribeFromTopic(params.group.id)
    this.listenForMessages(params.group.id)
  }

  componentWillUnmount() {
    this._isMounted = false
    const { params } = this.props.navigation.state
    firebase.messaging().subscribeToTopic(params.group.id)
  }

  get user() {
    const { params } = this.props.navigation.state

    return {
      _id: params.user.id,
      name: params.user.username,
      avatar: `https://feather.sfo2.cdn.digitaloceanspaces.com/${
        params.user.image
      }`,
      groupId: params.group.id
    }
  }

  addMessage = message => {
    if (this._isMounted)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
  }

  listenForMessages = groupId => {
    Fire.shared.on(groupId, this.addMessage)
  }

  onPressHashtag = message => {
    const reg = /^(#(yes +))|(#(yes))$/
    if (reg.test(message) === true && this.state.quiz === START_QUIZ) {
      this.setState({ quiz: QUIZ_STARTED })
      fetch("https://opentdb.com/api.php?amount=4&category=11&difficulty=easy")
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          this.setState({
            questions: responseJson.results,
            index: 0,
            correct: 0
          })
          this.addMessage({
            _id: Math.round(Math.random() * 1000000),
            text: "Starting quiz 👍",
            user: {
              _id: "@feather",
              name: "@bot"
            },
            system: true,
            createdAt: new Date(Date.now())
          })
          this.showQuestion(responseJson.results[0])
        })
        .catch(error => {
          console.error(error)
        })
    } else if (this.state.quiz === QUIZ_STARTED) {
      this.addMessage({
        _id: Math.round(Math.random() * 1000000),
        text: `Question`,
        user: {
          _id: "@feather",
          name: "@bot"
        },
        system: true,
        createdAt: new Date(Date.now())
      })
      var correct = `#${this.state.questions[this.state.index].correct_answer}`
      if (correct == message) {
        this.setState({ correct: this.state.correct + 1 })
        this.addMessage({
          _id: Math.round(Math.random() * 1000000),
          text: "Correct",
          user: {
            _id: "@feather",
            name: "@bot"
          },
          createdAt: new Date(Date.now())
        })
      }
      var newIndex = this.state.index + 1
      this.setState({ index: newIndex })
      if (newIndex < this.state.questions.length - 1) {
        this.showQuestion(this.state.questions[newIndex])
      } else {
        this.addMessage({
          _id: Math.round(Math.random() * 1000000),
          text: `DONE`,
          user: {
            _id: "@feather",
            name: "@bot"
          },
          createdAt: new Date(Date.now())
        })
        this.setState({
          quiz: NO_QUIZ
        })
      }
    }
  }

  showQuestion = data => {
    var bot = {
      _id: "@feather",
      name: "@bot"
    }

    this.addMessage({
      _id: Math.round(Math.random() * 1000000),
      text: parseHtmlEntities(data.question),
      user: bot,
      createdAt: Date.now()
    })
    this.addMessage({
      _id: Math.round(Math.random() * 1000000),
      text: `#${parseHtmlEntities(data.correct_answer)}`,
      user: bot,
      createdAt: Date.now()
    })

    for (var i = 0; i < data.incorrect_answers.length; i++) {
      var qs = `#${parseHtmlEntities(data.incorrect_answers[i])}`
      this.addMessage({
        _id: Math.round(Math.random() * 1000000),
        text: qs,
        user: bot,
        createdAt: Date.now()
      })
    }
  }

  isSameUser = (currentMessage, previousMessage) => {
    if (previousMessage.user !== undefined) {
      return currentMessage.user._id === previousMessage.user._id
    } else {
      return false
    }
  }

  renderBubble = props => {
    const { params } = this.props.navigation.state

    if (
      this.isSameUser(props.currentMessage, props.previousMessage) ||
      params.user.id === props.currentMessage.user._id
    ) {
      props.currentMessage.user.avatar =
        "https://feather.sfo2.cdn.digitaloceanspaces.com/"
      return <Bubble {...props} />
    }

    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#5a6263",
            padding: 5,
            paddingBottom: 10
          }}
        >
          {props.currentMessage.user.name}
        </Text>
        <Bubble {...props} />
      </View>
    )
  }

  render() {
    Reactotron.display({
      name: "ORANGE",
      preview: "Who?",
      value: "Orange you glad you don't know me in real life?",
      important: true
    })

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => {
          const msg = messages[0]
          const quizCheck = /^(@(quiz +))|(@(quiz))$/
          Fire.shared.send(messages)

          if (quizCheck.test(msg.text) === true && this._isMounted) {
            this.setState({ quiz: START_QUIZ })
            var bot = {
              _id: "@feather",
              name: "@bot"
            }
            this.setState(prev => ({
              messages: GiftedChat.append(prev.messages, [
                {
                  _id: Math.round(Math.random() * 1000000),
                  text: "#no",
                  user: bot,
                  createdAt: Date.now()
                },
                {
                  _id: Math.round(Math.random() * 1000000),
                  text: "#yes",
                  user: bot,
                  createdAt: Date.now()
                },
                {
                  _id: Math.round(Math.random() * 1000000),
                  text: "Wanna play a game?",
                  user: bot,
                  createdAt: Date.now()
                }
              ])
            }))
          }
        }}
        user={this.user}
        renderBubble={this.renderBubble}
        parsePatterns={linkStyle => [
          {
            pattern: /^(@(quiz +))|(@(quiz))$/,
            style: {
              ...linkStyle,
              fontSize: 14,
              color: "#aaa"
            }
          },
          {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: "#3498db" },
            onPress: this.onPressHashtag
          }
        ]}
      />
    )
  }
}

export default Chat
