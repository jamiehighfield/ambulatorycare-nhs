import React from 'react'
import Message from './Message'

export default class ExtendedMessage extends React.Component {
  static ShowSignOutMessage (signOutAction, cancelAction) {
    Message.ShowMessage('Sign Out', 'Are you sure you wish to sign out?', [
      {
        text: 'Sign Out',
        onPress: () => { signOutAction() }
      },
      {
        text: 'Cancel',
        onPress: () => { cancelAction() },
        style: 'cancel'
      }
    ])
  }
}
