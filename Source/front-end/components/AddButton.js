import React from 'react'
import { Animated, ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { colours } from '../constants/Colors.js'

export default class AddButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      widthHeight: 50
    }
  }

  render () {
    return (
      <TouchableOpacity style={[{ width: this.state.widthHeight, height: this.state.widthHeight }, styles.btn]} onPressIn={() => {
        // Animated.timing(this.state.widthHeight, {
        //     toValue: 40,
        //     duration: 500,
        //     useNativeDriver: false
        // }).start();
      }} onPress={this.props.onPress}>
        <Text style={styles.btnTxt}> + </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colours.boldBlue,
    borderWidth: 1,
    borderColor: colours.boldBlue,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: '80%',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2 // Android
  },
  btnTxt: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colours.white
  }
})
