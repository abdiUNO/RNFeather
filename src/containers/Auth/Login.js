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
import { login } from "@redux/modules/auth"

class Login extends Component {
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

  submitLoginCredentials() {
    const { showLoading } = this.state

    this.setState({
      showLoading: !showLoading
    })

    this.props.login(this.state.email, this.state.password)
  }

  validateEmail(email) {
    var re = /^[A-Za-z0-9._%+-]+@unomaha.com(\s+)$/

    return re.test(email)
  }

  render() {
    const { email, password, email_valid, showLoading } = this.state

    return (
      <ScrollView>
        <View>
          <Card containerStyle={{ marginTop: 35, paddingBottom: 35 }}>
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
                shake={!this.props.errors ? false : true}
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
              <FormValidationMessage>
                {this.props.errors && this.props.errors.emailisEmail
                  ? `! ${this.props.errors.emailisEmail}`
                  : ""}
              </FormValidationMessage>
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
                shake={!this.props.errors ? false : true}
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
            loading={this.props.loading}
            disabled={!email_valid && password.length < 4}
            disabledStyle={{ backgroundColor: "#9e9e9e" }}
            textStyle={{ fontWeight: "bold", color: "white" }}
            onPress={this.submitLoginCredentials.bind(this)}
          />

          <Button
            style={{ marginTop: 25 }}
            title="Don't have an account sign up!"
            backgroundColor="#fff"
            color={"#f39c12"}
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    errors: state.auth.errors,
    loading: state.auth.loading
  }
}

export default connect(
  mapStateToProps,
  { login }
)(Login)
