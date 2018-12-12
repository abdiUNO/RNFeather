/* @flow weak */

import React from "react"
import { View, StyleSheet } from "react-native"
import { Header } from "react-native-elements"
import PropTypes from "prop-types"

const Page = props => (
  <View>
    <Header
      backgroundColor="#3742fa"
      // leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: props.header, style: { color: "#fff" } }}
      // rightComponent={{ icon: "home", color: "#fff" }}
    />
    <View style={props.padding ? styles.container : {}}>{props.children}</View>
  </View>
)

Page.propTypes = {
  header: PropTypes.string.isRequired,
  padding: PropTypes.bool,
  children: PropTypes.element
}

export default Page

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})
