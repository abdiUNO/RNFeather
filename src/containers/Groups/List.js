/* @flow weak */

import React, { PureComponent } from "react"
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity
} from "react-native"
import { List, ListItem, Avatar, normalize, Badge } from "react-native-elements"
import colors from "@common/colors"

class GroupsList extends PureComponent {
  renderAvatars = users => {
    return (
      <>
        {users.map((user, index) => (
          <Avatar
            key={index}
            containerStyle={{
              left: -7 * index,
              marginRight: users.length === 1 && index === 0 ? 15 : 0
            }}
            avatarStyle={{
              width: 40,
              height: 40,
              borderColor: "#FFF",
              borderWidth: 2,
              borderRadius: 20
            }}
            rounded={true}
            source={{
              uri: `https://feather.sfo2.cdn.digitaloceanspaces.com/${
                user.image
              }`
            }}
          />
        ))}
      </>
    )
  }

  renderTitle = l => {
    const props = this.props

    return (
      <View style={styles.titleSubtitleContainer}>
        <View>
          <Text
            style={{
              ...styles.title,
              fontWeight:
                props.notifications[l.id] &&
                props.notifications[l.id].unread_messages > 0
                  ? "bold"
                  : "normal",
              color:
                props.notifications[l.id] &&
                props.notifications[l.id].unread_messages > 0
                  ? "#000"
                  : colors.grey1
            }}
          >
            {l.users.map((user, index) => {
              if (index === l.users.length - 1) return user.username + "..."
              else return user.username + ", "
            })}
          </Text>
        </View>
        <View style={{ paddingTop: 2.5 }}>
          <Text
            style={{
              ...styles.subtitle,
              fontWeight:
                props.notifications[l.id] &&
                props.notifications[l.id].unread_messages > 0
                  ? "700"
                  : "600",
              color:
                props.notifications[l.id] &&
                props.notifications[l.id].unread_messages > 0
                  ? "#000"
                  : colors.grey3
            }}
          >
            {props.notifications[l.id] && props.notifications[l.id].last_message
              ? props.notifications[l.id].last_message.substr(0, 25)
              : ""}
            ...
          </Text>
        </View>
      </View>
    )
  }

  _onItemPress = item => e => {
    return this.props.onPress(item)
  }

  render() {
    const props = this.props

    const subtitle = "Hey fellas, how is the semester going for you guys"

    return (
      <List containerStyle={styles.list}>
        {props.groups.map((l, index) => {
          return (
            <View style={styles.listItem} key={index}>
              <TouchableOpacity onPress={this._onItemPress(l)}>
                <View style={styles.container}>
                  <View style={styles.wrapper}>
                    {this.renderAvatars(l.users)}
                    {this.renderTitle(l)}
                    {props.notifications[l.id] &&
                      props.notifications[l.id].unread_messages > 0 && (
                        <Badge
                          wrapperStyle={{ paddingLeft: 6, paddingRight: 6 }}
                          containerStyle={{
                            backgroundColor: "#f39c12",
                            paddingLeft: 9,
                            paddingRight: 9,
                            paddingTop: 2,
                            paddingBottom: 2
                          }}
                        />
                      )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </List>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    padding: 12.5,
    borderBottomWidth: 0,
    backgroundColor: colors.transparent
  },
  listItem: {
    marginTop: 12.5,
    marginBottom: 12.5,
    borderColor: colors.grey5,
    borderWidth: 1,
    borderRadius: 2.5,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    shadowColor: colors.grey0,
    shadowOffset: {
      width: 2.5,
      height: 2.5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "transparent"
  },
  wrapper: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center"
  },
  title: {
    fontSize: normalize(14),
    color: colors.grey1
  },
  subtitle: {
    color: colors.grey3,
    fontSize: normalize(12),
    marginTop: 1
  },
  titleSubtitleContainer: {
    justifyContent: "center",
    flex: 1
  }
})

export default GroupsList
