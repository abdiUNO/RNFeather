import React, { Component } from "react"
import { View } from "react-native"
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Card,
  Button,
  Icon
} from "react-native-elements"
import connect from "react-redux/es/connect/connect"
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
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(email)
  }

  render() {
    const { email, password, email_valid, showLoading } = this.state

    return (
      <View>
        <Card containerStyle={{ marginTop: 35, paddingBottom: 35 }}>
          <View>
            <FormLabel>Usernam or Email</FormLabel>
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
          <View>
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
  { login }
)(Login)
