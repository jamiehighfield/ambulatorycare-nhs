import React, { Component } from 'react'
import { StyleSheet, Modal, TouchableHighlight, ScrollView, Text, Alert, View, FlatList, TouchableOpacity } from 'react-native';
import {colours} from '../constants/Colors.js'
import { colors } from 'react-native-elements';



export default class Items extends Component {
	constructor(props){
		super(props);
		this.state = {
			enableScrollViewScroll: true,
			modalVisible: false,
			modalData: this.props.items[0],
			metric: this.props.amountMetric,
		}
	}
	onEnableScroll= (value) => {
    this.setState({
      enableScrollViewScroll: value,
    });
  };
	componentDidMount() {
		this.setState({metric: this.props.amountMetric});
	}
	setModalVisible(visible, data){
		console.log(this.state.modalData);
		console.log("metric = " + this.state.metric);
		this.setState({
			modalVisible: visible,
			modalData: data
		})
	}

	render() {
		//function for mapping the objects for the modal
		function mapObject(object, callback) {
			return Object.keys(object).map(function (key) {
				return callback(key, object[key]);
			});
		}

		return(
			<View>
				<ScrollView style={styles.container} scrollEnabled={this.state.enableScrollViewScroll}>
					<FlatList 
						style={styles.itemContainer}
						data={this.props.items} //data or items are passed to the component to display
						keyExtractor={item => item.id} //The key for each item must be a unique value
						onTouchStart={() => {
							this.onEnableScroll( false );
					 }}
					 onMomentumScrollEnd={() => {
							this.onEnableScroll( true );
					 }}
						renderItem={({item}) =>
							
							<TouchableOpacity onPress={ () => this.setModalVisible(true, item)} style={styles.item}>

								<View>
									<Text style={styles.itemTxt}>{item.title}</Text>
									<Text style={styles.subTitle}>Amount: {item.amount}{this.state.metric} On {item.dateTime}</Text>
								</View>

							</TouchableOpacity>}
						/>
				</ScrollView>
				<Modal
					style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.modalTitle}>{this.state.modalData.title}</Text>
							<View>
								
							{mapObject(this.state.modalData, function (key, value) {
								if(value !== null && (key !== "title")){
									if(key == "amount"){
										return <View style={styles.modalRow}>
											<Text style={styles.keyTxt}>{key}</Text>
											<Text>{value}</Text>
										</View>
									}else{
										return <View style={styles.modalRow}>
											<Text style={styles.keyTxt}>{key}</Text>
											<Text>{value}</Text>
										</View>
									}
								}
								})}
							</View>
              <TouchableHighlight
								style={styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible, this.props.items[0]);
                }}>
                <Text style={styles.btnText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
			</View>

		);
	}
}
const styles = StyleSheet.create({
  container: {
		flex: 1,
		paddingTop: 22,
		backgroundColor: colours.bgGrey
  },
  itemContainer: {
		padding: 10,
    fontSize: 18,
    color: colours.white,
		borderRadius: 6,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 1,
  },
  item: {
		color: colours.white,
  	padding: 10,
  	borderWidth: 1,
		borderColor: colours.softPurple,
		borderRadius: 6,
		marginTop: 10,
		backgroundColor: colours.softPurple,
		textAlign: 'center',
	},
	itemTxt: {
		color: colours.white,
		textAlign: 'center',
		fontSize: 18
	},
	subTitle: {
		color: colours.white,
		textAlign: 'left',
		fontSize: 12
	},
	modalContainer: {
		flex: 1,
    justifyContent: 'center',
		//backgroundColor: colours.bgGrey,
		backgroundColor: 'rgba(236, 236, 236, 0.7)',
		height: 200,
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colours.white,
		borderWidth: 2,
		borderColor: colours.darkPurple,
		margin: 10,
	},
	modalTitle: {
		fontSize: 20,
		padding: 20,
		fontWeight: 'bold',
		color: colours.boldBlue
	},
	keyTxt: {
		fontSize: 18,
		color: colours.darkPurple,
		fontWeight: '200',
	},
	modalRow: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: colours.darkPurple
	},
	button: {
		backgroundColor: colours.boldBlue,
		padding: 20,
		borderRadius: 30,
		margin: 20
	},
	btnText: {
		fontSize: 18,
		color: colours.white,
		fontWeight: '300'
	}
})

