const firebase = require("firebase")
require("firebase/firestore")

const FIREBASE_KEYS = {
  apiKey: "AIzaSyA_FVWXwD1mqv70oUdgI7GWpLoO9id5MNE",
  authDomain: "feather-test.firebaseapp.com",
  databaseURL: "https://feather-test.firebaseio.com",
  projectId: "feather-test",
  storageBucket: "feather-test.appspot.com",
  messagingSenderId: "398499268676"
}

firebase.initializeApp(FIREBASE_KEYS)
firebase.firestore().settings({
  timestampsInSnapshots: true
})

// firebase.auth().onAuthStateChanged(user => {
//   if (!user) {
//     try {
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(
//           "abdullahimahamed0987@gmail.com",
//           "Hassan22"
//         )
//         .catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code
//           var errorMessage = error.message
//
//           console.log(`CODE:${errorCode} , MESSAGE:${errorMessage}`)
//           // ...
//         })
//     } catch ({ message }) {
//       alert(message)
//     }
//   } else {
//     var user = firebase.auth().currentUser
//     console.log(user)
//   }
// })

export const db = firebase.firestore()

export const groupsRef = db.collection("/groups")
export const groupRef = id => db.doc(id)
export const userRef = db.doc("/users/cUD8jQMkVFUomcej0031s4KZqLu2")
