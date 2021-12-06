import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, 	FlatList} from 'react-native';
import {colours} from '../constants/Colors.js'
import TemperatureInput from '../components/TemperatureInput';
import Temperatures from './../api/Temperatures';
export default class TemperatureDiaryScreen extends React.Component {
	static navigationOptions = {
    title: 'Temperature Diary',
	};
	
	constructor(props) {
		super(props);
		this.state = {
				data: []
		}
}
	
// Method to get temperatures from the database
 componentDidMount =  async() => {
		let responseObj = await Temperatures.getAllTemperatures();
		this.setState({
				data: JSON.stringify(responseObj)
		});
}

// Method to refresh the component once data has been added
componentDidUpdate = async() => {
	let responseObj = await Temperatures.getAllTemperatures();
	this.setState({
			data: JSON.stringify(responseObj)
	});
}

	    /*
	TouchableOpacity is a button that can be clicked on. It is used for the 'Add new'
	temperature button.

	The structure of the page is: date - add new temperature - temperature recording(s) of patient
    */
  render() {
		// If the database does not return a 'null' value, then display all the info
	if(this.state.data.length != 0){
		let data = JSON.parse(this.state.data);
				return (
					<ScrollView style={styles.container}>
						{/* <Text style={styles.warningBanner}> Contact the hospital if your sumbitted reading appears RED.</Text> */}
							<TemperatureInput />
								<View>
									<FlatList
											style={styles.itemContainer}
											data={data}
											keyExtractor={item => item.id} 
											renderItem={({item}) => {
													return (
															<View>
																{/* If temperature input is less than 36, make it appear as red */}
																{item.temperature < 36 && <Text style={styles.dangerReading}>{item.temperature} °</Text>}
																{/* If temperature input is bigger or equal to 38, make it appear as red */}
																{item.temperature >= 38 && <Text style={styles.dangerReading}>{item.temperature} °</Text>}
																{/* If temperature is less or equal to 36 and less or equal to 37.4, make it appear as normal (green) */}
																{item.temperature >= 36 && item.temperature <=37.4 && <Text style={styles.reading}>{item.temperature} °</Text>}
																{/* If temperature is less or equal to 37.5 and less than 38, make it appear as red */}
																{item.temperature >= 37.5 && item.temperature < 38 && <Text style={styles.dangerReading}>{item.temperature} °</Text>}
															</View>
												);
										}}
								/>
							</View>
						</ScrollView>
				);
	}
	// otherwise, throw this as an error
	else {
		return (
						<View>

						</View>
		)};
	} 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colours.bgGrey,
  },
		    // The appearance of list of temperatures
				itemContainer: {
					padding: 10,
					fontSize: 18,
					color: colours.white,
					borderRadius: 6,
					marginLeft: 10,
					marginRight: 10,
					paddingTop: 10,
					paddingBottom: 10,
					marginTop: 1
				},
				reading: {
					color: colours.white,
					padding: 10,
					borderWidth: 1,
					borderColor: colours.softGreen,
					borderRadius: 6,
					marginTop: 10,
					backgroundColor: colours.softGreen,
					textAlign: 'center'
			},
			dangerReading: {
				color: colours.white,
				padding: 10,
				borderWidth: 1,
				borderColor: colours.deepRed,
				borderRadius: 6,
				marginTop: 10,
				backgroundColor: colours.deepRed,
				textAlign: 'center'
		},
});