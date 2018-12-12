import React from "react"
import PropTypes from "prop-types"
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  InteractionManager,
  Text
} from "react-native"

import theme from "@common/colors.js"
const { height: screenHeight } = Dimensions.get("window")
import { default as CommonText } from "@common/Text"
import withPreventDoubleClick from "@common/withPreventDoubleClick"
import Swiper from "react-native-swiper"
import { Button } from "react-native-elements"

const NextButton = withPreventDoubleClick(Button)

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      showsButtons: true
    }
  }

  onPrev = () => this.props.navigation.navigate("SignUp")

  onNext = () => {
    InteractionManager.runAfterInteractions(() => this.swiper.scrollBy(1, true))
  }

  render() {
    return (
      <Swiper
        ref={ref => {
          this.swiper = ref
        }}
        style={styles.wrapper}
        bounces={true}
        scrollEnabled={false}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        showsButtons={this.state.showsButtons}
        buttonWrapperStyle={styles.buttonWrapper}
        showsPagination={false}
        prevButton={
          <Button transparent onPress={this.onPrev}>
            <Text style={{ color: "#617AF5" }}>Skip</Text>
          </Button>
        }
        nextButton={
          <NextButton style={{ borderColor: "#617AF5" }} onPress={this.onNext}>
            <Text style={{ color: "#617AF5" }}>Next</Text>
          </NextButton>
        }
        onIndexChanged={index => {
          if (index === 2) {
            this.setState({ showsButtons: false })
          }
        }}
      >
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={{ padding: 15, marginBottom: 50 }}>
              <CommonText color="#4f5c68" align="center" size={18}>
                We are happy you are here. POSTWORLD is a place for people to
                share, collect, and discover the stories of their world.
              </CommonText>
            </View>

            <Image
              style={{ width: 200, height: 200 }}
              source={require("./welcome_image.png")}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.container}>
            <View style={{ padding: 15, marginBottom: 50 }}>
              <CommonText color="#4f5c68" align="center" size={18}>
                Posts are location specific, and public for all to see. Have a
                special note about a place, object, or aspect of your city?
                Share it!
              </CommonText>
            </View>

            <Image
              style={{ width: 200, height: 200 }}
              source={require("./map_image.png")}
            />
          </View>
        </View>
        <View style={styles.AuthBody}>
          <View style={styles.AuthContainer}>
            <View style={{ padding: 15, marginBottom: 50 }}>
              <CommonText color="#4f5c68" align="center" size={18}>
                We ask that all users be respectful of other posters. Anything
                offensive, inappropriate, or otherwise uncool will have you
                removed from the community.
              </CommonText>
            </View>

            <Image
              style={{ width: 200, height: 200 }}
              source={require("./smile_image.png")}
            />
          </View>
        </View>
      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    top: screenHeight / 2 - 35,
    right: 30,
    position: "absolute"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 45,
    textAlign: "center",
    color: "white",
    marginTop: 100,
    marginBottom: 100
  },
  body: {
    flex: 1,
    height: screenHeight / 2,
    paddingTop: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  AuthBody: {
    flex: 1,
    height: screenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  AuthContainer: {
    flex: 1,
    paddingTop: 70,
    padding: 25,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  footertab: {
    backgroundColor: theme.lightGreen,
    borderColor: theme.lightGray,
    borderWidth: 1,
    borderRadius: 0
  },
  buttonText: {
    color: theme.black,
    fontSize: 20,
    padding: 6
  }
})

export default Welcome
