import React from 'react';
import { ScrollView, StyleSheet, TextInput, Alert, TouchableOpacity, Text, View, Picker } from 'react-native';
import FoodItems from "../../../api/FoodItems"
import {colours} from '../../../constants/Colors.js'
import Api from '../../../api/Api';

export default class AddFoodScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Food',
    };
    constructor(props) {
		super(props);
		this.state = { 
            title: "",
            description: "",
            amount: "",
            dateTime: "",
            time: ""
		};
	}
    addFood() {
        //validation
        console.log("item length: " + this.state.title.length + ", " + this.state.description.length + ", " + this.state.amount.length + ", " + this.state.time.length);
        if(this.state.title.length > 0 && this.state.amount.length > 0 && this.state.dateTime.length > 0){
            FoodItems.AddFoodItem(this.state.title, this.state.amount, this.state.description, this.state.dateTime);
            console.log("food item added: " + this.state.title);
            Alert.alert(
                'Item: ' + this.state.title + " has been added",
                '',
                [
                {text: 'OK', onPress: () => {
                    this.props.navigation.goBack();
                }},
                {text: 'Add another item', onPress: () => {
                    console.log("Adding another item...")
                }}
                ],
                {cancelable: false},
            );
        }
        else{
            // Works on both iOS and Android
            console.log("Item lengths are more than 0: " + (this.state.title.length > 0) + (this.state.amount.length > 0) + (this.state.dateTime.length > 0));
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
    createDateTime(time) {
        console.log("creating dateTime....")
        this.setState({time: time})
        var d = new Date();
        var nd = d.toISOString();
        nd = nd.toString().slice(0, 10);
        var ndt = "" + nd + " " + time + "";
        console.log("create new date with: " + ndt)
        this.state.dateTime = ndt; //yyyy-mm-dd hh:mm:ss
        console.log("dateTime: " + this.state.dateTime);
    }

    render() {
        return(
            <View style={styles.container}>
                <View styles={styles.innerContainer}>
                    <Text style={styles.label} >What did you eat?</Text>
                    <TextInput type='title' style={styles.txtInput} placeholder='Food Item or Meal' onChangeText={(text) => {this.setState({title: text})}} />

                    <Text style={styles.label} >Description of Meal (Optional)</Text>
                    <TextInput type='description' style={styles.txtInput} onChangeText={(text) => {this.setState({description: text})}} placeholder='eg...sandwitch had chick, bacon, lettuce and mayonnaise' />

                    <Text style={styles.label} >How much did you eat?</Text>
                    <TextInput type='amount' style={styles.txtInput} onChangeText={(text) => {this.setState({amount: text})}} placeholder='2 sandiwtches / 2 / 100g' />

                    <Text style={styles.label}> What time did you eat it?</Text>
                    <Picker
                        selectedValue={this.state.time}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.createDateTime(itemValue)
                        }>
                        <Picker.Item label="00:00" value="00:00:00" />
                        <Picker.Item label="01:00" value="01:00:00" />
                        <Picker.Item label="02:00" value="02:00:00" />
                        <Picker.Item label="03:00" value="03:00:00" />
                        <Picker.Item label="04:00" value="04:00:00" />
                        <Picker.Item label="05:00" value="05:00:00" />
                        <Picker.Item label="06:00" value="06:00:00" />
                        <Picker.Item label="07:00" value="07:00:00" />
                        <Picker.Item label="08:00" value="08:00:00" />
                        <Picker.Item label="09:00" value="09:00:00" />
                        <Picker.Item label="10:00" value="10:00:00" />
                        <Picker.Item label="11:00" value="11:00:00" />
                        <Picker.Item label="12:00" value="12:00:00" />
                        <Picker.Item label="13:00" value="13:00:00" />
                        <Picker.Item label="14:00" value="14:00:00" />
                        <Picker.Item label="15:00" value="15:00:00" />
                        <Picker.Item label="16:00" value="16:00:00" />
                        <Picker.Item label="17:00" value="17:00:00" />
                        <Picker.Item label="18:00" value="18:00:00" />
                        <Picker.Item label="19:00" value="19:00:00" />
                        <Picker.Item label="20:00" value="20:00:00" />
                        <Picker.Item label="21:00" value="21:00:00" />
                        <Picker.Item label="22:00" value="22:00:00" />
                        <Picker.Item label="23:00" value="23:00:00" />
                    </Picker>

                    <TouchableOpacity syle={styles.btn} onPress={() => {this.addFood()}}>
                        <Text style={styles.label}>Submit</Text>
                    </TouchableOpacity> 
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.boldBlue,
        justifyContent: 'center',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colours.white,
        margin: 10,
        padding: 10
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colours.white,
        textAlign: 'center',
        margin: 10,
    },
    txtInput: {
        width:'76%',
        height: 40,
        color: colours.white,
        borderBottomWidth: 1,
        borderBottomColor: colours.white,
        fontSize: 18,
    },
    btn: {
        backgroundColor: colours.softGreen,
        color: colours.white,
    }
})
