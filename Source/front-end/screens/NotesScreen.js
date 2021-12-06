import React, { Component } from 'react'
import { colours } from './../constants/Colors';
import {AsyncStorage} from 'react-native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView  } from 'react-native'

class Inputs extends Component {
   static navigationOptions = {
      title: 'Notes',
     };

   state = {
      // Where the user input will be placed
      note: ''
   }
   handleNote = (text) => {
      this.setState({ note: text })
   }
   inputtedNote = (note) => {
      alert(new Date() + ' \nNote has been saved: \n'  +  note )
      
   }
   render() {
      return (
         <ScrollView style = {styles.container}>
            <View>
               {/* <Text style={styles.informationText}>If you have any notes that you want to write down, 
               which does not fit in one of the sections of the home page, please do so here.</Text> */}
               <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Enter note here"
                  autoCapitalize = "none"
                  onChangeText = {this.handleNote}/>
               <TouchableOpacity
                  style = {styles.button}
                  onPress = {
                     () => this.inputtedNote(this.state.note)
                  }>
                  <Text style = {styles.buttonText}> Add </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      )
   }
   _storeData = async () => {
      try {
        await AsyncStorage.setItem('@MySuperStore:note', 'I like to save it.');
      } catch (error) {
        // Error saving data
      }
    }
   retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('TASKS');
        if (value !== null) {
          // Able to find and pull notes
          console.log(value);
        }
      } catch (error) {
        // unable to find notes
      }
    };
}
export default Inputs

const styles = StyleSheet.create({
   //  informationText: {
   //      color: '#0099cc',
   //      fontSize: 18,
   //      textAlign: 'center'
   //  },
   container: {
      flex: 1,
      backgroundColor: colours.bgGrey
   },
   input: {
      color: colours.black,
      padding: 10,
      borderWidth: 1,
      borderColor: colours.bgGrey,
      borderRadius: 6,
      marginTop: 10,
      backgroundColor: colours.white,
      textAlign: 'center',
      marginLeft: '5%',
      marginRight: '5%'
   },
   button: {
      backgroundColor: colours.darkPurple,
      borderWidth: 1,
      borderColor: colours.darkPurple,
      borderRadius: 30,
      height:40,
      justifyContent: 'center',
      marginTop: '2%',
      marginLeft: '15%',
      marginRight: '15%'
    },
    buttonText: {
      color: colours.white,
      textAlign: 'center',
      fontSize: 16
   }
})
