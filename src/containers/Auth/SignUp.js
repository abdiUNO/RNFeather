import React, { Component } from "react"
import { View, ScrollView, Platform } from "react-native"
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Card,
  Button,
  Icon
} from "react-native-elements"
import { connect } from "react-redux"
import { signup } from "@redux/modules/auth"

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      email_valid: false,
      password: "",
      login_failed: false,
      showLoading: false
    }
  }

  submitSignupCredentials() {
    const { showLoading } = this.state

    this.setState({
      showLoading: !showLoading
    })

    this.props.signup(
      this.state.username,
      this.state.email,
      this.state.password
    )
  }

  validateEmail(email) {
    var re = /^[A-Za-z0-9._%+-]+@unomaha.com(\s+)$/

    return re.test(email)
  }

  validateUsername(username) {
    return username.length > 4
  }

  render() {
    const {
      email,
      username,
      password,
      username_valid,
      email_valid,
      showLoading
    } = this.state

    return (
      <View>
        <ScrollView>
          <Card containerStyle={{ marginTop: 35, paddingBottom: 35 }}>
            <View
              style={{
                borderBottomColor:
                  Platform.OS === "android" ? "#9e9e9e" : "white",
                borderBottomStyle: "solid",
                borderBottomWidth: Platform.OS === "android" ? 2 : 0
              }}
            >
              <FormLabel>Username</FormLabel>
              <View>
                <FormInput
                  style={{
                    color: "#000"
                  }}
                  onChangeText={username => this.setState({ username })}
                  value={username}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  ref={input => (this.usernameInput = input)}
                  onSubmitEditing={() => {
                    this.setState({
                      username_valid: this.validateUsername(username)
                    })
                    this.passwordInput.focus()
                  }}
                  blurOnSubmit={false}
                  errorMessage={
                    username_valid
                      ? null
                      : "Your username must be at least 5 characters"
                  }
                />
              </View>
            </View>
            <View
              style={{
                borderBottomColor:
                  Platform.OS === "android" ? "#9e9e9e" : "white",
                borderBottomStyle: "solid",
                borderBottomWidth: Platform.OS === "android" ? 2 : 0
              }}
            >
              <FormLabel>UNO Email Address</FormLabel>
              <FormInput
                style={{ color: "#000" }}
                onChangeText={email => this.setState({ email })}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                ref={input => (this.emailInput = input)}
                onSubmitEditing={() => {
                  this.setState({ email_valid: this.validateEmail(email) })
                  this.passwordInput.focus()
                }}
                blurOnSubmit={false}
                errorMessage={
                  email_valid ? null : "Please enter a valid email address"
                }
              />
            </View>
            <View
              style={{
                borderBottomColor:
                  Platform.OS === "android" ? "#9e9e9e" : "white",
                borderBottomStyle: "solid",
                borderBottomWidth: Platform.OS === "android" ? 2 : 0
              }}
            >
              <FormLabel>Password</FormLabel>
              <FormInput
                onChangeText={password => this.setState({ password })}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                ref={input => (this.passwordInput = input)}
                blurOnSubmit={true}
              />
            </View>
            <View />
          </Card>

          <Button
            title="LOG IN"
            activeOpacity={1}
            underlayColor="transparent"
            style={{ marginTop: 25 }}
            backgroundColor="#f39c12"
            loading={showLoading}
            disabled={!email_valid && password.length < 4 && !username_valid}
            disabledStyle={{ backgroundColor: "#9e9e9e" }}
            textStyle={{ fontWeight: "bold", color: "white" }}
            onPress={this.submitSignupCredentials.bind(this)}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  }
}

export default connect(
  mapStateToProps,
  { signup }
)(SignUp)
