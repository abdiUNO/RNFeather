import React from "react"
import { View } from "react-native"

import { connect } from "react-redux"

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  async _bootstrapAsync() {
    if (!this.props.user) {
      this.props.navigation.navigate("Auth")
    } else {
      this.props.navigation.navigate("App")
    }
  }

  // Render any loading content that you like here
  render() {
    return <View />
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user }
}

export default connect(
  mapStateToProps,
  {}
)(AuthLoadingScreen)
