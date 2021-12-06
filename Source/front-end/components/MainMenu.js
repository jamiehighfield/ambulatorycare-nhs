import React, { Component } from 'react'
import { SectionList, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import {colours} from '../constants/Colors.js'

export default class MainMenu extends Component {
	state = {
		Selection: []
	}

	componentDidMount() {
		this.setState({Selection:[
			// Template of a selection state for the main menu and how users can interact with it.
			// {'id': '1', 'title': 'Meals'},
			// {'id': '11', 'title': 'Goal'},
			// // {'id': '12', 'title': ''},
			//
			// {'id': '2', 'title': 'Liquid'},
			// {'id': '21', 'title': 'Goal'},
			// // {'id': '22', 'title': ''},
			//
			// {'id': '3', 'title': 'Activities'},
			// {'id': '31', 'title': 'Goal'},
			// // {'id': '32', 'title': ''},
			//
			// {'id': '4', 'title': 'Temprature'}
		]});


		{// this.Selection = this.state.Selection.map((item, key) =>
		// 	<li key={Selection.id}>{Selection.title}</li>
		// );
		}
	}


	render() {
		{// const items = this.state.Selection.map( (item, key) =>
		// 	<li key={item.id}>{item.title}</li>
		//);
		}
		return(
			<View style={styles.container}>
				<FlatList
				style={styles.itemContainer}
					data={this.state.Selection}
					keyExtractor={item => item.id} //The key for each item must be a unique value
					renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
					/>
			</View>

		);
	}
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0,
   backgroundColor: colours.bgGrey
  },
  itemContainer: {
    padding: 0,
    fontSize: 18,
    backgroundColor: colours.boldBlue,
    color: colours.white,
	padding: 0,
  },
  item: {
  	color: colours.white,
  	padding: 10,
  	borderWidth: 0,
  	borderColor: colours.white,
  }
})
