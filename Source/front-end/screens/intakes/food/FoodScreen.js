import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Items from '../../../components/Items.js';
import {colours} from '../../../constants/Colors.js'
import FoodItems from '../../../api/FoodItems';
import AddButton from '../../../components/AddButton';



export default class FoodDiaryScreen extends React.Component {
	static navigationOptions = {
		title: 'Food Diary',
	};
	constructor(props) {
		super(props);
		this.state = { 
			foodItems:[]
		 };
	}
	componentWillMount = async() => {

		let food = await FoodItems.GetFoodItems();
		console.log("Food = " + food);
		// Message.ShowOkMessage('Test', JSON.stringify(responseJson), () => { });
		// Jamie fix here - This is a good way to debug when you can't use console logging.
		this.setState({foodItems: food}); //Jamie fix here - you cannot
		//store JavaScript objects in state which is returned from Api.PerformRequest, instead
		//you have to serialise it to a JSON string first.
	}

  render() {
	  console.log("Data: " + this.state.foodItems);
		//If the state object is not empty, render the items list with food items from DB
		if (this.state.foodItems.length != 0) {
			return (
				<View style={{flex: 1}}>
					<ScrollView style={styles.container}>
						<Items items={JSON.parse(this.state.foodItems)} amountMetric={"."} />
						{/* <View style={styles.row}>
							<TouchableOpacity style={styles.btn} onPress={() => {
								this.props.navigation.navigate('FoodDiaryAdd');
							}}> 
								<Text style={styles.btnTxt}> + </Text>
							</TouchableOpacity>
						</View> */}
					</ScrollView>
					<View style={styles.addButton}>
						<AddButton onPress={() => {
							this.props.navigation.navigate('FoodDiaryAdd');
						}}></AddButton>
					</View>
				</View>
			);
		} else {
			return (
				<ScrollView style={styles.container}>
				</ScrollView>
			);
		}
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: colours.bgGrey,
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		width: '100%'
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
	addNew: { 
		marginBottom: 20,
		marginLeft: 7,
	},
	addButton: {
		position: 'absolute',
		bottom: 25,
		right: 25
	}
});
