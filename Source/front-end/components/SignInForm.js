import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class SignInForm extends React.Component {
  constructor (props) {
    super(props)

    // Set the default usernamd and password from the components properties.
    this.state = {
      username: (props.username || ''),
      password: (props.password || '')
    }
  }

  render () {
    return (
      <View style={{ width: '100%' }}>
        <TextInput type='username' style={[styles.textboxUnderlined, { marginBottom: 30 }]} placeholder='Username or email address' placeholderTextColor='#FFFFFF' value={this.state.username} onChangeText={(text) => {
          this.setState({
            username: text
          })
        }} text
          returnKeyType='next' onSubmitEditing={() => {
          this.passwordTextInput.focus()
        }} />
        <TextInput ref={(input) => { this.passwordTextInput = input }} type='password' secureTextEntry style={styles.textboxUnderlined} placeholder='Password' placeholderTextColor='#FFFFFF' value={this.state.password} onChangeText={(text) => {
          this.setState({
            password: text
          })
        }}
          returnKeyType='go' onSubmitEditing={() => {
          this.props.onSubmit()
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textboxUnderlined: {
    width: '100%',
    height: 40,
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    fontSize: 18
  }
})
