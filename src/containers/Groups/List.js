/* @flow weak */

import React from "react"
import { View, StyleSheet } from "react-native"
import { List, ListItem } from "react-native-elements"
const grey = "#f7f7f7"

const IMAGES = {
  image1: require("../../resources/group_1.png"),
  image2: require("../../resources/group_2.png"),
  image3: require("../../resources/group_3.png")
}

const getImage = num => {
  return IMAGES["image" + num]
}

const COLORS = {
  transparent: "transparent",
  white: "#fff",
  black: "#000",
  subGrey: "#dee1e3",
  grey: "#949294"
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    padding: 12.5,
    borderBottomWidth: 0,
    backgroundColor: COLORS.transparent
  },
  listItem: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 12.5,
    marginBottom: 12.5,
    borderColor: COLORS.subGrey,
    borderWidth: 1,
    borderRadius: 2.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.subGrey,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.grey,
    shadowOffset: {
      width: 2.5,
      height: 2.5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  }
})

const list = [
  {
    name: "Amy Farha",
    avatar_url: getImage(1),
    subtitle: "Sed animi dicta non esse hic necessitatibus qui possimus. ",
    id: "3Qa9W5kUBBLK6i7Nwe0h"
  },
  {
    name: "Chris Jackson",
    avatar_url: getImage(2),
    subtitle: "In nam molestias corporis",
    id: "3Qa9W5kUBBLK6i7Nwe0h"
  }
]

const GroupsList = props => (
  <List containerStyle={styles.list}>
    {props.groups.map((l, index) => (
      <ListItem
        onPress={() => props.onPress(l)}
        containerStyle={styles.listItem}
        roundAvatar
        avatar={getImage(1)}
        key={index}
        title={`Group #${index + 1}`}
      />
    ))}
  </List>
)

export default GroupsList
