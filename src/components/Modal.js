import React, { Component } from "react"
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Picker,
  TouchableOpacity
} from "react-native"
import { Card, Button, Icon, Header } from "react-native-elements"
import RNPickerSelect from "react-native-picker-select"

import styled from "styled-components"

const StyledText = styled(Text)`
  font-size: 20;
  color: black;
  margin-left: 45px;
  margin-right: 45px;
  margin-top: 3px;
  margin-bottom: 3px;
`

const StyledCard = styled(Card)`
  border-radius: 5;
`

const StyledCardItem = styled(Card)`
  border-radius: 5;
`
const StyledTextarea = styled(TextInput)`
  height: 200;
  width: 100%;
  font-size: 20;
  background-color: #fff;
  border-radius: 10;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
`
const StyledPicker = styled(Picker)`
  height: 50;
  width: 100%;
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
      content: ""
    }
  }

  componentDidMount() {
    console.log("HELLO WORLD")
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  submit = () => {
    const color = getRandomColor()
    this.props.onSubmit(this.state.content, color, this.state.group)
    this.state.group = ""
  }

  render() {
    let backcolor = "#FF8900"

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
        <Header
          backgroundColor="#9e9e9e"
          rightComponent={
            <TouchableOpacity onPress={() => this.props.closePost()}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 15
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          }
          leftComponent={
            <TouchableOpacity onPress={this.submit}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: 15
                }}
              >
                + Post
              </Text>
            </TouchableOpacity>
          }
        />
        <View
          style={{
            flex: 1,
            backgroundColor: backcolor
          }}
        >
          <View contentContainerStyle={styles.modalContent}>
            <View style={styles.innerModal}>
              <StyledTextarea
                numberOfLines={4}
                multiline={true}
                maxLength={160}
                autoFocus={true}
                placeholder="Create a new post"
                onChangeText={content => this.setState({ content })}
              />
            </View>
            <View
              style={{
                paddingVertical: 25,
                justifyContent: "center",
                paddingHorizontal: 20
              }}
            >
              <RNPickerSelect
                placeholder={{
                  label: "Select a Group...",
                  value: null
                }}
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
              />
            </View>
            {/*<View*/}
            {/*style={{*/}
            {/*marginTop: 30*/}
            {/*}}*/}
            {/*>*/}
            {/*<Button title="ADD POST" onPress={this.submit} />*/}
            {/*</View>*/}
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    top: 20,
    flex: 1,
    margin: 10,
    backgroundColor: "#FF8900",
    padding: 25
  },
  modalContent: {
    borderRadius: 10,
    backgroundColor: "#FF8900",
    padding: 7,
    paddingBottom: 2
  },
  innerModal: {
    backgroundColor: "#FF8900",
    padding: 15,
    paddingTop: 25,
    opacity: 1
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  }
})

export default PostModal
