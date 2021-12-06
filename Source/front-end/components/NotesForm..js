import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class SignInForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      note: (props.note || '')
    }
  }

  render () {
    return (
      <View style={{ width: '100%' }}>
        <TextInput type='note' style={[styles.textboxUnderlined, { marginBottom: 30 }]} placeholder='note' placeholderTextColor='#FFFFFF' value={this.state.note} onChangeText={(text) => {
          this.setState({
            note: text
          })
        }} text
          returnKeyType='next' onSubmitEditing={() => {
          this.noteTextInput.focus()
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
