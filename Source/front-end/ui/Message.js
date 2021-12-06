import React from 'react'
import { Alert } from 'react-native'

export default class Message extends React.Component {
  static ShowOkMessage (title, message, okAction) {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => { okAction() }
      }
    ])
  }

  static ShowOkCancelMessage (title, message, okAction, cancelAction) {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => { okAction() }
      },
      {
        text: 'Cancel',
        onPress: () => { cancelAction() },
        style: 'cancel'
      }
    ])
  }

  static ShowMessage (title, message, actions) {
    Alert.alert(title, message, actions)
  }
}
