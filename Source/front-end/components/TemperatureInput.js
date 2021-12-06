import React, { Component } from 'react'
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert } from 'react-native'
import { colours } from '../constants/Colors.js'
import Api from '../api/Temperatures'
export default class TemperatureInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      temperature: (props.temperature || 0)
    }
  };

  render () {
    const { showAlert } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput style={styles.inputContainer}
            keyboardType={'numeric'}
            placeholder='Enter Temperature Here'
            value={this.state.temperature}
            underlineColorAndroid='transparent'
            onChangeText={(number) => {
              this.setState({
                temperature: number
              })
            }} />
          <TouchableOpacity style={styles.btn} onPress={() => {
            // if temperature is less than 36
            if (this.state.temperature < 36) {
              // Add temperature method
              Api.AddTemperature(this.state.temperature)
              Alert.alert(
                'Your temperature is very low',
                'Ring the ward immediately - contacts are on the contact page.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              )
            };

            // if temperature submitted is more or equal to 38
            if (this.state.temperature >= 38) {
              // Add temperature method
              Api.AddTemperature(this.state.temperature)
              Alert.alert(
                'Your temperature is very high',
                'Ring the ward immediately - contacts are on the contact page.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              )
            };

            // if temperature is between (and including) 36 and (including) 37.4
            // normal
            if (this.state.temperature >= 36 && this.state.temperature <= 37.4) {
              // Add temperature method
              Api.AddTemperature(this.state.temperature)
              Alert.alert(
                'Success',
                'Your temperature has been saved',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              )
            };

            // if temperature is between (and including) 36 and (including) 37.4
            // not normal - check again later
            if (this.state.temperature >= 37.5 && this.state.temperature < 38) {
              // Add temperature method
              Api.AddTemperature(this.state.temperature)
              Alert.alert(
                'Your temperature is high',
                'Measure your temperature again in 30 minutes. If this warning persists in the second reading, call the ward immediately on the contact page.',
                [
                  { text: 'Remind me later', onPress: () => console.log('Remind me later pressed') },
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              )
            };

            // if temperature submitted is null
            if (this.state.temperature == null) {
              // Add temperature method
              Api.AddTemperature(this.state.temperature)
              Alert.alert(
                'No valid temperature submitted, please try again',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              )
            };

            // if temperature submitted is equal to 0
            if (this.state.temperature == 0) {
              Alert.alert(
                'No valid temperature submitted, please try again',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ]
              )
            };
          }} activeOpacity={0.7}>
            <Text style={styles.btnTxt}> + </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

// Styling of the adding a new temperature feature
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: colours.bgGrey
  },
  // The appearance of the input box
  inputContainer: {
    borderColor: colours.bgGrey,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
    borderColor: colours.darkGreen,
    backgroundColor: colours.white,
    textAlign: 'center',
    marginLeft: '5%',
    width: '65%'
  },
  // The layout of the input information, all displayed in a row
  row: {
    flexDirection: 'row'
  },
  // The appearance of the add a new temperature button
  btn: {
    width: 60,
    backgroundColor: colours.darkGreen,
    borderWidth: 1,
    borderColor: colours.darkGreen,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: '4%',
    marginLeft: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2 // Android
  },
  // The positioning of the 'add' icon
  btnTxt: {
    fontSize: 20,
    marginTop: '125%',
    fontWeight: 'bold',
    color: colours.white,
    textAlign: 'center',
    marginTop: '-20%'
  }
})
