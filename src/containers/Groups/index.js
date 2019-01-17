/* @flow */

import React, { Component } from "react"
import { Alert, View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { connect } from "react-redux"
import GroupsList from "./List"
import { fetchGroups, joinGroup } from "@redux/modules/group"
import Spinner from "react-native-loading-spinner-overlay"

class Groups extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false
    }

    this.props.fetchGroups()
  }

  componentDidMount() {
    this.props.navigation.setParams({
      joinGroup: () => {
        if (this.props.groups.length < 3) this.props.joinGroup()
        else Alert.alert("Can't join more than three groups")
      }
    })
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.props.joining}
          textContent={"Joining group..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        {this.props.user ? (
          <GroupsList
            style={styles.container}
            groups={this.props.groups}
            onPress={group =>
              this.props.navigation.navigate("Chat", {
                group,
                user: this.props.user
              })
            }
          />
        ) : (
          <View />
        )}
      </View>
    )
  }
}
const grey = "#f7f7f7"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: grey
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    groups: state.group.all,
    loading: state.group.loading,
    joining: state.group.joining
  }
}

export default connect(
  mapStateToProps,
  { fetchGroups, joinGroup }
)(Groups)
