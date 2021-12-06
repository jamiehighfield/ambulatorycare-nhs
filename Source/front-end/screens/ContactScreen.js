import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View
  } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import AddressCard from './../components/Contact/AddressCard';
import GeneralSymptomListView from './../components/Contact/GeneralSymptomListView';
import Communications from 'react-native-communications';
import {colours} from '../constants/Colors.js'

export default class ContactScreen extends React.Component {
    static navigationOptions = {
      title: 'Contact',
    };

    render() {
        /* This section is the composition of the Contacts page
        Structure of page is : list of generic symptoms, contact number, hospital address */

        /**
     * The code was adapted from the Reactive Native Elements documentation
     * accessed 06-03-2019
     * https://facebook.github.io/react-native/docs/button
     * Changed icon to make it more appropriate, also changed title of button
     * 
     * @param input icon title
     * @param input title of call contact
     * @return button simulating call button
     */

        /**
     * The code was adapted from the React-Native-Communications GitHub project
     * accessed 24-03-2019
     * https://github.com/anarchicknight/react-native-communications
     * Changed phone numbers for different contacts
     * 
     * @param input phone number of dedicated contact
     * @return call page with phone number of selected contact
     */
        return (
            <ScrollView style={styles.backgroundColor}>
                <GeneralSymptomListView />
                <View>
                    <ThemeProvider theme={theme}>
                    <View style={{margin:10}}>
                        <Button style={styles.button} title=' Ambulatory Care Nurse in Charge' icon={<Icon name="phone" size={15} color="white"/>} colour='#DC143C' onPress={() => Communications.phonecall('0777 3672 304', true)} />
                    </View>
                    <View style={{margin:10}}>
                        <Button style={styles.button} title=' B4 Haemotology Unit' icon={<Icon name="phone" size={15} color="white"/>} onPress={() => Communications.phonecall('0292 0742 882', true)} />
                    </View>
                    <View style={{margin:10}}>
                        <Button style={styles.button} title=' Young Persons Cancer Unit' icon={<Icon name="phone" size={15} color="white" />} backgroundColour={colours.deepRed} onPress={() => Communications.phonecall('0292 0746 784', true)}/>
                    </View>
                    </ThemeProvider>
                </View>
                <AddressCard address = ' University Hospital of Wales, Heath Park, Cardiff, CF14 4XW'/>
            </ScrollView>
        );
    }
}

// 'Theming' implmented and is applicable to every button instance
// Adapted from https://react-native-training.github.io/react-native-elements/docs/customization.html
// Date accessed: 23-03-2019
const theme = {
    Button: {
      buttonStyle: {
        backgroundColor: colours.deepRed,
      },
    },
  };

  
const styles = StyleSheet.create({
    header: {
        color: colours.darkBlue,
        letterSpacing: -0.5,
        fontSize: 45,
        marginLeft: 135,
        paddingTop: 23,
        paddingBottom: 23,
    },
    backgroundColor: {
        backgroundColor: colours.bgGrey
    },
    contact: {
        backgroundColor: colours.white
    },
    button: {
        backgroundColor: colours.deepRed,
        borderColor: colours.deepRed
    }
});
