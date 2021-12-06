import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {colours} from '../../../constants/Colors.js'
import Items from '../../../components/Items';
//import { colors } from 'react-native-elements';
import FluidItems from '../../../api/FluidIntake';
import AddButton from '../../../components/AddButton';

export default class FluidIntakeScreen extends React.Component {
    static navigationOptions = {
        title: 'Fluids',
    };
    constructor(props) {
        super(props);
        this.state = {
            fluids:[],
            fluidTotal: 900,
            fluidGoal: 2000
        }
    }
    calculateFluidTotal() {
        if(this.state.fluids.length > 0){
            consol.log("Calculating total fluids....")
            var total = 0;
            for(var i = 0; i < this.state.fluids.length; i++){
                total = total + this.state.fluids[i].amount;
                console.log("Total = " + total);
            }
            this.setState({fluidTotal: total});
            console.log("Fluid total: " + this.state.fluidTotal);
        } else {
            console.log("no fluids..setting 0.....");
            this.setState({fluidTotal: 0});
        }
    }
    componentWillMount = async() => {
        let fluidItems = await FluidItems.GetFluidItems();
        console.log(fluidItems);
        this.setState({fluids: fluidItems});
        console.log("Fluids state: " + this.state.fluids);
        this.calculateFluidTotal();
    }
    render() {
        if (this.state.fluids.length != 0) {
            return(
                <View style={styles.container2}>
                    <View style={styles.container1}>
                        <View style={styles.bubble}>
                            <Text style={styles.BoldPurpleTxt}>{this.state.fluidTotal} / {this.state.fluidGoal}</Text>
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <ScrollView>
                            <View>
                                <ScrollView>
                                    <Items items={JSON.parse(this.state.fluids)} amountMetric={"Ml"} />
                                </ScrollView>
                                {/* <TouchableOpacity style={styles.btn} onPress={() => {
                                        this.props.navigation.navigate('FluidAdd');
                                    }}>
                                    <Text style={styles.btnTxt}> + </Text>
                                </TouchableOpacity> */}
                            </View>
                        </ScrollView>
                        <View style={styles.addButton}>
                            <AddButton onPress={() => {
                                this.props.navigation.navigate('FluidAdd');
                            }}></AddButton>
                        </View>
                    </View>
                </View>
                );
        } else {
            return(
            <ScrollView>
                <View>
                    <View style={styles.bubble}>
                        <Text style={styles.BoldPurpleTxt}>{this.state.fluidTotal} ML / {this.state.fluidGoal}ML</Text>
                    </View>
                </View>
            </ScrollView>
            );
        }
        
    }
}
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: colours.boldBlue,
        height: 10,
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
    },
    BoldPurpleTxt: {
        fontSize: 32,
        color: colours.darkPurple,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container2: {
        backgroundColor: colours.bgGrey,
        flex: 1
    },
    bubble: {
        backgroundColor: colours.white,
        borderWidth: 4,
        borderColor: colours.softPurple,
        borderRadius: 100,
        width: 150,
        height: 150,
        textAlign: 'center',
        justifyContent: 'center',
    },
    btn: {
		width:60,
		backgroundColor: colours.boldBlue,
		borderWidth: 1,
		borderColor: colours.white,
		borderRadius: 40,
		height:60,
        justifyContent: 'center',
        alignItems: 'center',
		marginLeft: '80%',
    },
    btnTxt: {
        fontSize: 23,
        fontWeight: 'bold',
        color: colours.white,
    },
	addButton: {
		position: 'absolute',
		bottom: 25,
		right: 25
	}
})
