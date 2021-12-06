import React from 'react';
import { ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity, Text, View, Picker } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FoodDiary from '../../../components/Items';
import DateHeader from '../../../components/DateHeader.js';
import {colours} from '../../../constants/Colors.js';
import FluidItems from '../../../api/FluidIntake';

export default class AddFluidScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Fluids'
    };
    constructor(props) {
        super(props);
        this.state = {
            amount: 250,
            title: "",
            dateTime: "2019-03-02 00:00:00" 
        }
    }
    addFluids() {
        var d = new Date();
        var nd = d.toISOString();
        nd = nd.toString().slice(0, 10);
        var dt = nd.toString() + " 00:00:00";
        console.log("date = " + dt);
        this.setState({dateTime: dt});
        console.log("DateTime" + this.state.dateTime);
        console.log(this.state.amount + " " + this.state.title + this.state.dateTime);
        if(this.state.title.length > 0 && this.state.dateTime.length > 0){
            FluidItems.AddFluidItem(this.state.title, this.state.dateTime, this.state.amount);
            Alert.alert(
                'Adding ' + this.state.title + ' to the db...',
                this.state.title + ' ' + this.state.amount + "ml on " + this.state.dateTime,
                [
                    {text: 'OK', onPress: () => {
                        this.props.navigation.navigate('LiquidIntakeMain');
                    }},
                    {text: 'Add another item', onPress: () => {
                        console.log("Adding another item...")
                    }}
                    ],
                    {cancelable: false},
            );
        }
        else{
            Alert.alert(
                'Please complete all required Fields',
                'lengths of txt field values: ' + this.state.title.length > 0 + this.state.amount.length > 0 + this.state.dateTime.length > 0,
                [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.label} >What did you drink?</Text>
                <TextInput onChangeText={(text) => {this.setState({title: text})}} type='title' style={styles.txtInput} placeholder='eg. water, coke, milk etc' />

                <Text style={styles.label}>How much did you drink?</Text>
                <Picker
                    selectedValue={this.state.amount}
                    style={styles.dropBox}
                    onValueChange={(itemValue, itemIndex) =>
                        //this.setState({amount: itemValue})
                        { }
                    }>
                    <Picker.Item label="Small Glass" value="250" />
                    <Picker.Item label="Large/Pint Glass" value="470" />
                    <Picker.Item label="Can" value="330" />
                    <Picker.Item label="Standard bottle" value="500" />
                    <Picker.Item label="Litre" value="1000" />
                    <Picker.Item label="Mug" value="350" />
                    <Picker.Item label="Large Mug" value="500" />
                </Picker>

                <TouchableOpacity style={styles.btn} onPress={() => {this.addFluids()}}>
                    <Text style={styles.label}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.darkPurple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropBox: {
        width: 250,
        height: 50,
        color: colours.white,
        borderWidth: 2,
        borderColor: colours.white
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colours.white,
        padding: 20
    },
    txtInput: {
        width:'76%',
        height: 40,
        color: colours.white,
        borderWidth: 1,
        borderColor: colours.white,
        fontSize: 18,
        padding: 10,
        marginBottom: 20
    },
    btn: {
        backgroundColor: colours.softPurple,
        color: colours.white,
        borderWidth: 2,
        borderColor: colours.white,
        borderRadius: 20,
        height: 70,
        margin: 30,
    }
})
