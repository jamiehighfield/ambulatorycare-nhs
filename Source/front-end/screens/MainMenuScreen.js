import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView} from 'react-native';
import {colours} from '../constants/Colors.js'
import Greeting from './../components/Greeting';
import ListView from '../components/ListView';
import CurrentUser from '../api/CurrentUser';



export default class MainMenuScreen extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};

	componentDidMount = async () => {
		let userIdentity = await CurrentUser.GetUserIdentity();
		let patientIdentity = await CurrentUser.GetPatientIdentity();
	}

	render() {
		let data = [
			{
				divider: false,
				label: 'Food',
				avatar: 'http://oi68.tinypic.com/359zuky.jpg',
				subtitle: 'Add/review your food intake.\n\nQuantity this Period: 3\nGoal this Period: 10',
				colouredSubtitle: 'Not meeting goal',
				colouredSubtitleColour: colours.deepRed,
				clickable: true,
				onPress: () => {
					this.props.navigation.navigate('FoodMain');
				}
			},
			{
				divider: false,
				label: 'Fluids',
				avatar: 'http://i65.tinypic.com/epllpz_th.png',
				subtitle: 'Add/review your fluid intake.\n\nQuantity this Period: 1\nGoal this Period: 10',
				colouredSubtitle: 'Not meeting goal',
				colouredSubtitleColour: colours.deepRed,
				clickable: true,
				onPress: () => {
					this.props.navigation.navigate('FluidsMain');
				}
			},
			{
				divider: false,
				label: 'Activities',
				avatar: 'http://i65.tinypic.com/2vmsx1y_th.png',
				subtitle: 'Add/review your completed activities.\n\nQuantity this Period: 1',
				clickable: true,
				onPress: () => {
					this.props.navigation.navigate('ActivityMain');
				}
			},
			{
				divider: false,
				label: 'Temperature',
				avatar: 'http://i68.tinypic.com/2ey9zdd_th.png',
				subtitle: 'Add/review your temperature readings.\n\nQuantity this Period: 3',
				clickable: true,
				onPress: () => {
					this.props.navigation.navigate('TemperatureDiaryMain');
				}
			}
		];

		return (
			<ScrollView style={styles.container}>
				<View>
					<Greeting name="Jamie"/>
					<ListView data={data}></ListView>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
			backgroundColor: colours.bgGrey,
	}
});
