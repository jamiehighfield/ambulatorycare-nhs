import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
  } from 'react-native';
import SupportCard from '../components/Support/SupportCard';
import SymptomsList from '../components/Support/SymptomsList';
import BenefitsListView from '../components/Support/BenefitsListView';
import {colours} from '../constants/Colors.js'

export default class SupportScreen extends React.Component {
    static navigationOptions = {
      title: 'Support',
    };

    render() {
        return (
            <ScrollView style={styles.backgroundColor}>
                <View style={styles.container}>
                    <Text style={styles.header}>Facts {"&"} Questions</Text>
                    <Text style={styles.message}>Just in-case you were wondering...</Text>
                </View>
                <View>
                    <SupportCard question = 'What are the benefits of Ambulatory Care?' answer = 'Great reasons for this alternative style of treatment includes:'/>
                    <BenefitsListView />
                    <SupportCard question = 'How can I be referred to Ambulatory Care?' answer = 'If you think you would like to receive your treatment in Ambulatory Care or would like to find out more information, please speak to your Nurse Specialist, Pharmacist or Doctor who can discuss this treatment method with you. '/>
                    <SupportCard question = 'I am experiencing pain and/or experiencing discomfort, who do I contact?' answer = 'Please contact the unit or your dedicated doctor if you experience any of the following:'/>
                    <SymptomsList />
                    <SupportCard question = 'How often should I record my food intake' answer = 'As soon as you remember to! This allows the Ambulatory Care team to ensure that you are staying hydrated.'/>
                    <SupportCard question = 'How often should I record my fluid intake' answer = 'As soon as you remember to! The Ambulatory Care team will be able to monitor whether you are eating as much or as little as your body needs.' />
                    <SupportCard question = 'How often should I measure my temperature?'answer = 'Enter your temperature reading as soon as you have taken your temperature. This is important as it will allow the Ambulatory Care team to monitor your health and react as soon as possible if your temperature readings suddenly become different to what they should be.'/>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        marginTop: 25,
        marginBottom: 25

    },
    header: {
        fontSize: 30,
        color: colours.darkPurple,
        textAlign: 'left',
        marginLeft: '5%'
    },
    backgroundColor: {
        backgroundColor: colours.bgGrey
    },
    message: {
        color: colours.darkGrey,
        fontSize: 15,
        marginLeft: '5%',
        marginRight: '5%'
    }
});
