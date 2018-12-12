import React from "react"
import { View } from "react-native"

import { connect } from "react-redux"

class WaitScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  // Render any loading content that you like here
  render() {
    return this.props.user ? this.props.navigation.navigate("App") : <View />
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user }
}

export default connect(
  mapStateToProps,
  {}
)(WaitScreen)
