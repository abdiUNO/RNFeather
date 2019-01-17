import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native"
import { Button, Icon } from "react-native-elements"
import ImageResizer from "react-native-image-resizer"
import ImagePicker from "react-native-image-picker"
import connect from "react-redux/es/connect/connect"
import { uploadImage } from "@redux/modules/auth"
import Spinner from "react-native-loading-spinner-overlay"

const { height: screenHeight } = Dimensions.get("window")

class ImageUpload extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state

    return {
      headerLight: <View />
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      uploadingImage: false,
      pickingImage: false
    }

    this.selectImage = this.selectImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  selectImage() {
    const { params } = this.props.navigation.state

    var options = {
      title: "Select Avatar",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    }

    if (Platform.OS === "ios")
      this.setState({ pickingImage: true, uploadingImage: true })

    ImagePicker.showImagePicker(options, response => {
      this.setState({ pickingImage: false })
      if (response.didCancel) {
        this.setState({ uploadingImage: false })
      } else {
        if (Platform.OS === "android")
          this.setState({ pickingImage: false, uploadingImage: true })

        ImageResizer.createResizedImage(response.uri, 500, 500, "JPEG", 80)
          .then(this.uploadImage)
          .catch(error => {})
      }
    })
  }

  uploadImage(response) {
    const data = new FormData()

    data.append("file", {
      uri: response.uri,
      name: response.name,
      type: "image/jpeg"
    })

    this.setState({ uploadingImage: false })

    this.props.uploadImage(data)
  }

  render() {
    const uploadingImage = this.state.uploadingImage
    const pickingImage = this.state.pickingImage
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.props.loading || uploadingImage}
          textContent={pickingImage ? "Select Image..." : "Uploading Image..."}
          textStyle={{
            color: "#FFF"
          }}
        />
        <View styles={styles.body}>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                alignSelf: "center",
                marginTop: 50
              }}
            >
              {"You're almost done"}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 20, alignSelf: "center" }}
            >
              {"Take a minute to upload a profile photo"}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50
            }}
          >
            <Image
              style={{ width: 250, height: 250 }}
              source={require("./wizard.png")}
            />
          </View>
        </View>
        <Button
          title="Upload Image"
          style={{ marginTop: 25 }}
          backgroundColor="#f39c12"
          textStyle={{ fontWeight: "bold", color: "white" }}
          onPress={this.selectImage}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  messageContainer: {
    flex: 1,
    padding: 25
  },
  body: {
    flex: 1,
    height: screenHeight / 2,
    marginTop: 125,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  center: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  text: {
    color: "#636e72",
    textAlign: "center",
    fontSize: 20
  },
  activity: {
    paddingTop: 25
  }
})

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  }
}

export default connect(
  mapStateToProps,
  { uploadImage }
)(ImageUpload)
