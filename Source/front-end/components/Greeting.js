import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { colours } from '../constants/Colors.js'

export default class Greeting extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.displayName}>Hello, {this.props.name}!</Text>
        <Text style={styles.message}>Welcome to your portal. Keep track of your health on-the-go!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginTop: 25
  },
  displayName: {
    fontSize: 30,
    color: colours.darkPurple,
    textAlign: 'left',
    marginLeft: '5%'
  },
  message: {
    color: colours.darkGrey,
    fontSize: 15,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%'
  }
})
