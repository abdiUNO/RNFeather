import React, { Component } from "react"
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert
} from "react-native"
import { Card, Button, Icon, Header } from "react-native-elements"
import RNPickerSelect from "react-native-picker-select"
import KeyboardSpacer from "react-native-keyboard-spacer"
import ImageResizer from "react-native-image-resizer"
import ImagePicker from "react-native-image-picker"

import styled from "styled-components"
import Spinner from "react-native-loading-spinner-overlay"

const NONE = 0
const PICKING = 1
const UPLOADING = 2

const StyledTextarea = styled(TextInput)`
  font-size: 20px;
  background-color: #fff;
  padding: 15px 15px;
  margin-bottom: 35px;
  border-top-width: 2px;
  border-top-color: rgba(112, 113, 114, 0.25);
  font-size: 18px;
`

const CameraButton = styled(TouchableOpacity)`
  justify-content: center;
  align-self: center;
  padding: 10px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 35px;
  background-color: rgba(0, 0, 0, 0.1);
`

function getRandomColor() {
  const color = [
    "#3498db",
    "#e74c3c",
    "#9b59b6",
    "#27ae60",
    "#2c3e50",
    "#90b5ab",
    "#686de0",
    "#ff3838",
    "#ff6348",
    "#4b4b4b"
  ]

  return color[Math.floor(Math.random() * color.length)]
}
class PostModal extends Component {
  constructor(props) {
    super(props)
    this.inputRefs = {}
    this.state = {
      group: "",
      modalVisible: false,
      content: "",
      imageState: NONE,
      image: null
    }

    this.selectImage = this.selectImage.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  componentDidMount() {}

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  selectImage() {
    let customButtons = []
    if (this.state.image) {
      customButtons = [{ name: "remove", title: "Remove Image" }]
    }

    var options = {
      title: "Select Image",
      customButtons: customButtons,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    }

    this.setState({ imageState: PICKING }, () => {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          this.setState({ imageState: NONE })
        } else if (response.customButton === "remove") {
          this.setState({ image: null }, () => {
            this.setState({ imageState: NONE })
          })
        } else {
          this.setState({ imageState: UPLOADING })
          ImageResizer.createResizedImage(response.uri, 500, 500, "JPEG", 80)
            .then(this.uploadImage)
            .catch(error => {})
        }
      })
    })
  }

  uploadImage = response => {
    const data = new FormData()

    data.append("file", {
      uri: response.uri,
      name: response.name,
      type: "image/jpeg"
    })

    this.setState({ image: response.uri, imageState: NONE, formData: data })

    //this.props.uploadImage(data)
  }

  submit = () => {
    const color = getRandomColor()
    const group = this.state.group
    const content = this.state.content

    console.log(this.state.formData)
    if (this.state.formData) {
      this.setState({ imageState: UPLOADING })
      fetch("http://localhost:3000/user/image", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.props.user.token.accessToken}`
        },
        body: this.state.formData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(group)
          this.setState({ imageState: NONE })
          this.props.onSubmit(content, color, group, responseJson.image)
        })
    } else {
      this.props.onSubmit(this.state.content, color, this.state.group, null)
    }
    this.state.group = ""
  }

  render() {
    let backcolor = "#FF8900"
    const uploadingImage = this.state.uploadingImage
    const pickingImage = this.state.pickingImage

    return (
      <Modal
        animationType="slide"
        animationOut="slideOutDown"
        hideModalContentWhileAnimating={true}
        animationInTiming={25}
        visible={this.props.visible}
        style={styles.modal}
        backdropOpacity={1}
        backdropColor="#4F6EFD"
        useNativeDriver={true}
        transparent={false}
        onRequestClose={this.props.closePost}
      >
        <Spinner
          style={{ flex: 1 }}
          visible={!(this.state.imageState === NONE)}
          textContent={
            this.state.imageState === PICKING
              ? "Select Image..."
              : "Uploading Image..."
          }
          textStyle={{
            color: "#FFF"
          }}
        />

        <Header
          outerContainerStyles={{
            padding: 0,
            paddingBottom: 7,
            paddingHorizontal: 15
          }}
          backgroundColor="#FF8900"
          leftComponent={
            <TouchableOpacity onPress={() => this.props.closePost()}>
              <Icon
                iconStyle={{
                  color: "white",
                  fontSize: 30,
                  fontWeight: "bold",
                  opacity: 1
                }}
                type="material"
                color="#fff"
                name="arrow-back"
              />
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity onPress={this.submit}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 18,
                  paddingBottom: 5
                }}
              >
                Post
              </Text>
            </TouchableOpacity>
          }
        />
        <RNPickerSelect
          placeholder={{
            label: "Select a Group...",
            value: null
          }}
          placeholderTextColor="rgba(0, 0, 0,0.5)"
          items={this.props.subscriptions}
          onValueChange={value => {
            this.setState({
              group: value
            })
          }}
          onUpArrow={() => {
            this.inputRefs.name.focus()
          }}
          onDownArrow={() => {
            this.inputRefs.picker2.togglePicker()
          }}
          style={{ ...pickerSelectStyles }}
          value={this.state.group}
          ref={el => {
            this.inputRefs.picker = el
          }}
          useNativeAndroidPickerStyle={false}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingBottom: 35
          }}
        >
          <View contentContainerStyle={styles.modalContent}>
            <StyledTextarea
              numberOfLines={4}
              multiline={true}
              maxLength={160}
              autoFocus={true}
              placeholder="Create a new post"
              placeholderTextColor="rgba(0, 0, 0,0.5)"
              onChangeText={content => this.setState({ content })}
            />
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignSelf: "center",
              bottom: 5,
              right: 10,
              position: "absolute"
            }}
          >
            {this.state.image === null ? (
              <CameraButton onPress={this.selectImage}>
                <Icon
                  iconStyle={{
                    color: "rgba(0, 0, 0, 0.75)",
                    fontSize: 25,
                    fontWeight: "bold",
                    opacity: 1
                  }}
                  type="material"
                  color="#fff"
                  name="photo-camera"
                />
              </CameraButton>
            ) : (
              <TouchableOpacity onPress={this.selectImage}>
                <Image
                  style={{ flex: 1, height: 100, width: 100 }}
                  resizeMode="contain"
                  source={{
                    uri: this.state.image,
                    isStatic: true
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 8,
    backgroundColor: "#FF8900",
    padding: 25
  },
  modalContent: {
    backgroundColor: "#FF8900",
    padding: 7,
    paddingBottom: 2,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid"
  },
  innerModal: {
    backgroundColor: "#fff"
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 15,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    color: "black"
  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    color: "black"
  }
})

export default PostModal
