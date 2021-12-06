import React from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import { colours } from '../../constants/Colors';
import Api from '../../api/Activities'
import Icon from 'react-native-vector-icons/FontAwesome'
import Message from '../../ui/Message';

export default class AddActivityForm extends React.Component {
    static navigationOptions = {
        title: 'Add Activity',

    };

    constructor(props) {
        super(props);
            this.state = {
            name: (props.name || ''),
            duration: (props.duration || 0)

    }
}


render() {
  return (
      <ScrollView style={styles.container}>
          <TextInput style={styles.inputBox} placeholder='Activity Name'  value={this.state.name} onChangeText={(text) => {
            this.setState({
              name: text
         })
      }} />

          {/* Duration input keyboardType is number only so that user can not input a string*/}
         <TextInput keyboardType={'numeric'}
            style={styles.inputBox} placeholder='Duration (minutes)'  value={this.state.duration} onChangeText={(number) => {
            this.setState({
              duration: number
         })
      }} />

    
        {/* Add Button */}
        <TouchableOpacity style={styles.btn} onPress={() => {
          // validation for the text boxes for thid form 
          if (this.state.name != "" && this.state.duration > 0 ){
                // Sends user inputs to AddActivity mehtod inside Api/api/Activities
                Api.AddActivity(this.state.name, this.state.duration);
                this.props.navigation.navigate('MainMenu');
          }
          else {
            Message.ShowOkMessage('Invalid', 'Please Enter a valid Name and Duration.', () => { });
          }

        }}>
        <Icon name='thumbs-up' style={styles.confirmAdd} size={30} color='white' />
        </TouchableOpacity>
      </ScrollView>

  )
}
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  backgroundColor: colours.lightGreen
},
inputBox: {
  backgroundColor: colours.white,
  marginTop: 10,
  borderRadius: 6,
  padding: 10,
  borderWidth: 1,
  borderColor: colours.white,
  textAlign: 'center',
  width: '100%'
},
btn:{
  marginTop: 20,
  borderWidth: 1,
  borderColor: colours.darkGreen,
  borderRadius: 40,
  width: 60,
  height: 60,
  justifyContent: 'center',
  backgroundColor: colours.darkGreen,
  paddingVertical: 20,
  marginLeft: '40%'
},
confirmAdd:{
  marginTop: 3,
  textAlign: 'center',
  color: colours.white,
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10
}
});
