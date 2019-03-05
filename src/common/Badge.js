import { PixelRatio, StyleSheet, Text } from "react-native"
import React from "react"

const Layout = {
  pixel: 1 / PixelRatio.get(),
  tabBarHeight: 49
}
export default class Badge extends React.Component {
  static propTypes = Text.propTypes

  constructor(props, context) {
    super(props, context)

    this._handleLayout = this._handleLayout.bind(this)
  }

  state = {
    computedSize: null
  }

  render() {
    let { computedSize } = this.state
    let style = {}
    if (!computedSize) {
      style.opacity = 0
    } else {
      style.width = Math.max(computedSize.height, computedSize.width)
    }

    return (
      <Text
        {...this.props}
        numberOfLines={1}
        onLayout={this._handleLayout}
        style={[styles.container, this.props.style, style]}
      >
        {this.props.children}
      </Text>
    )
  }

  _handleLayout(event) {
    let { width, height } = event.nativeEvent.layout
    let { computedSize } = this.state
    if (
      computedSize &&
      computedSize.height === height &&
      computedSize.width === width
    ) {
      return
    }

    this.setState({
      computedSize: { width, height }
    })

    if (this.props.onLayout) {
      this.props.onLayout(event)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#f4a62a",
    lineHeight: 15,
    textAlign: "center",
    borderWidth: 1 + Layout.pixel,
    borderColor: "#f4a62a",
    borderRadius: 17 / 2,
    overflow: "hidden"
  }
})