import React from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import FoodDiary from '../components/Items';
import DateHeader from '../components/DateHeader.js';
import {colours} from '../constants/Colors.js'

export default class AddFoodScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Food',
    };

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.label} >What did you eat?</Text>
                <TextInput type='title' style={styles.txtInput} placeholder='Food Item or Meal' />

                <Text style={styles.label} >Description of Meal (Optional)</Text>
                <TextInput type='description' style={styles.txtInput} placeholder='eg...sandwitch had chick, bacon, lettuce and mayonnaise' />

                <Text style={styles.label} >How much did you eat?</Text>
                <TextInput type='amount' style={styles.txtInput} placeholder='2 sandiwtches / 2 / 100g' />

                <Text style={styles.label}> What time did you eat it?</Text>
                <Picker
                    selectedValue={this.state.time}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({time: itemValue})
                    }>
                    <Picker.Item label="00:00" value="00:00" />
                    <Picker.Item label="01:00" value="01:00" />
                    <Picker.Item label="02:00" value="02:00" />
                    <Picker.Item label="03:00" value="03:00" />
                    <Picker.Item label="04:00" value="04:00" />
                    <Picker.Item label="05:00" value="05:00" />
                    <Picker.Item label="06:00" value="06:00" />
                    <Picker.Item label="07:00" value="07:00" />
                    <Picker.Item label="08:00" value="08:00" />
                    <Picker.Item label="09:00" value="09:00" />
                    <Picker.Item label="10:00" value="10:00" />
                    <Picker.Item label="11:00" value="11:00" />
                    <Picker.Item label="12:00" value="12:00" />
                    <Picker.Item label="13:00" value="13:00" />
                    <Picker.Item label="14:00" value="14:00" />
                    <Picker.Item label="15:00" value="15:00" />
                    <Picker.Item label="16:00" value="16:00" />
                    <Picker.Item label="17:00" value="17:00" />
                    <Picker.Item label="18:00" value="18:00" />
                    <Picker.Item label="19:00" value="19:00" />
                    <Picker.Item label="20:00" value="20:00" />
                    <Picker.Item label="21:00" value="21:00" />
                    <Picker.Item label="22:00" value="22:00" />
                    <Picker.Item label="23:00" value="23:00" />
                    </Picker>

                    <TouchableOpacity syle={styles.btn}>
                        <Text style={styles.label}>Submit</Text>
                    </TouchableOpacity> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.boldBlue,
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colours.white,
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