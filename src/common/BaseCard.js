import React, { Component } from "react"
import { Card } from "react-native-elements"
import { View } from "react-native"

class BaseCard extends Component {
  render() {
    return (
      <Card
        containerStyle={{
          paddingTop: this.props.noPadding ? 3 : 6,
          paddingRight: this.props.noPadding ? 6 : 15,
          paddingLeft: this.props.noPadding ? 6 : 15,
          paddingBottom: this.props.noPadding ? 6 : 12.5,
          backgroundColor: this.props.color,
          borderRadius: this.props.noRadius ? 0 : 5,
          borderWidth: 0.5,
          borderColor: "rgba(149, 165, 166,0.2)",
          shadowOpacity: this.props.noRadius ? 0 : 1,
          margin: this.props.noPadding ? 0 : 5
        }}
      >
        {this.props.children}
      </Card>
    )
  }
}

export default BaseCard
