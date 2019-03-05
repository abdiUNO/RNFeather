import React, { Component } from "react"
import { AsyncStorage, Alert } from "react-native"
import { connect } from "react-redux"
import { addNotification, postReply } from "@redux/modules/notifications"
import firebase from "react-native-firebase"

class NotificationsController extends Component {
  async componentDidMount() {
    // firebase.initializeApp({
    //   appId: "1:398499268676:ios:373aed8e78bf7200",
    //   apiKey: "AIzaSyA_FVWXwD1mqv70oUdgI7GWpLoO9id5MNE",
    //   authDomain: "feather-test.firebaseapp.com",
    //   databaseURL: "https://feather-test.firebaseio.com",
    //   projectId: "feather-test",
    //   storageBucket: "feather-test.appspot.com",
    //   messagingSenderId: "398499268676"
    // })
    this.checkPermission()
    this.createNotificationListeners() //add this line
  }

  componentWillUnmount() {
    this.notificationListener()
    this.notificationOpenedListener()
  }

  async createNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("My apps test channel")

    // Create the channel
    firebase.notifications().android.createChannel(channel)

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { data } = notification

        if (data.postId) {
          this.props.postReply(data.postId, {
            text: data.message,
            username: data.username
          })
        } else {
          this.props.addNotification(data.group, data.message)
        }
      })

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { data } = notificationOpen.notification
        if (data.postId) {
          this.props.postReply(data.postId, {
            text: data.message,
            username: data.username
          })
        } else {
          this.props.addNotification(data.group, data.message)
        }
      })

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
    if (notificationOpen) {
      const { data } = notificationOpen.notification
      if (data.postId) {
        this.props.postReply(data.postId, {
          text: data.message,
          username: data.username
        })
      } else {
        this.props.addNotification(data.group, data.message)
      }
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message))
    })
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    )
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()
    if (enabled) {
      this.getToken()
    } else {
      this.requestPermission()
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken")
    //alert(fcmToken)
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem("fcmToken", fcmToken)
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission()
      await firebase.messaging().registerForNotifications()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected")
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.groups
  }
}

export default connect(
  mapStateToProps,
  { addNotification, postReply }
)(NotificationsController)
