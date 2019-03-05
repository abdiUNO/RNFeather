import firebase from "react-native-firebase"
// Optional flow type
import type { RemoteMessage } from "react-native-firebase"
import { store } from "./redux/configureStore"
import { addNotification, postReply } from "./redux/modules/notifications"

export default async (message: RemoteMessage) => {
  // handle your message

  const data = message.data

  if (data.postId) {
    const newNotification = new firebase.notifications.Notification().android
      .setChannelId("test-channel")
      .setNotificationId(message.messageId)
      .setTitle("Featherr")
      .setBody(`@${data.username} replied to your post!`)
      .setSound("default")
      .setData(message.data)
      .android.setChannelId("test-channel")
      .android.setSmallIcon("ic_notification")

    firebase.notifications().displayNotification(newNotification)

    store.dispatch(
      postReply(data.postId, {
        text: data.message,
        username: data.username
      })
    )
  }

  return Promise.resolve()
}
