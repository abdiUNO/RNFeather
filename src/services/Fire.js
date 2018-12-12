import firebase from "firebase" // 4.8.1

const CHANGE_TYPE = {
  added: "added",
  modified: "modified",
  removed: "removed"
}

class Fire {
  constructor() {
    this.init()
    //this.observeAuth();
  }

  init() {
    firebase.initializeApp({
      apiKey: "AIzaSyA_FVWXwD1mqv70oUdgI7GWpLoO9id5MNE",
      authDomain: "feather-test.firebaseapp.com",
      databaseURL: "https://feather-test.firebaseio.com",
      projectId: "feather-test",
      storageBucket: "feather-test.appspot.com",
      messagingSenderId: "398499268676"
    })
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  get ref() {
    return firebase.database().ref("messages")
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user, groupId } = snapshot.val()
    const { key: _id } = snapshot
    const timestamp = new Date(numberStamp)
    const message = {
      _id,
      groupId,
      timestamp,
      text,
      user
    }
    return message
  }

  on = (group, callback) =>
    this.ref
      .orderByChild("user/groupId")
      .equalTo(group)
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)))

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i]

      const message = {
        text,
        user,
        timestamp: this.timestamp
      }
      this.append(message)
    }
  }

  append = message => this.ref.push(message)

  // close the connection to the Backend
  off() {
    this.ref.off()
  }
}

Fire.shared = new Fire()
export default Fire
