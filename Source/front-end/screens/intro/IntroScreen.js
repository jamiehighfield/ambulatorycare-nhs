import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { colours } from '../../constants/Colors';
import Button from 'apsl-react-native-button';
import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

export default class IntroScreen extends React.Component { 

    static navigationOptions = {
        title: null,
        header: null
	};

	constructor(props) {
		super(props);

		this.state = {
			pushNotificationsDisabled: false
		};
	}

	componentWillMount = async () => {
		//Check to see if permissions have already been requested. This is because Apple
		//will only ask once whether rejected or accepted.
		let permissionsBeenAsked = await AsyncStorage.getItem('push_notifications');

		if (permissionsBeenAsked === 'true') {
			this.setState({
				pushNotificationsDisabled: true
			});
		}
	}

	//Source https://docs.expo.io/versions/latest/guides/push-notifications/
	registerForPushNotifications = async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		
		let finalStatus = existingStatus;
	
		//Check if existing status is already been granted - if not, ask for permission.
		//On iOS, once permission has been granted or denied, the popup will not show again.
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}

		if (finalStatus === 'granted') {
			//Get a token from Expo that uniquely identifies this device.
			let token = await Notifications.getExpoPushTokenAsync();
	
			//Store this unique token on this device for later use.
			await AsyncStorage.setItem('unique_token', token);

			await AsyncStorage.setItem('push_notifications', 'true');

			this.setState({
				pushNotificationsDisabled: true
			});
		}
	}

	getStarted = async () => {
		//Set that the intro stage has been complete so not to show it again.
		await AsyncStorage.setItem('intro_complete', 'true');

		this.props.navigation.navigate('SignIn');
	}
	
	render() {
		return (
			<Swiper style={styles.wrapper} showsButtons dotColor={'#FFFFFF'}>
				<View style={styles.slide1}>
					<Text style={styles.text}>Welcome to Ambicare!</Text>
					<Text style={styles.smallText}>There are just a few things to setup before you can start using Ambicare. Tap the arrow to the right to begin.</Text>
				</View>
				<View style={styles.slide2}>
				<Text style={styles.text}>Register for push notifications</Text>
					<Text style={styles.smallText}>We recommend that you register for push notifications so that we can send notifications to your phone as to whether you're meeting your targets.</Text>
					<Button isDisabled={this.state.pushNotificationsDisabled} style={styles.button} textStyle={styles.buttonText} onPress={this.registerForPushNotifications}>
                        Register
                    </Button>
				</View>
				<View style={styles.slide3}>
					<Text style={styles.text}>All good to go!</Text>
					<Text style={styles.smallText}>Ambicare is setup and ready to use! Click below to get started and setup your new account.</Text>
					<Button style={styles.button} textStyle={styles.buttonText} onPress={this.getStarted}>
                        Get Started
                    </Button>
				</View>
			</Swiper>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
	},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0099CC'
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#666699'
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0099CC'
	},
	text: {
		color: '#FFFFFF',
		fontSize: 26,
    	fontFamily: 'System',
	},
	smallText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontFamily: 'System',
		marginTop: 15,
		marginLeft: 25,
		marginRight: 25,
		textAlign: 'center'
	},
    button: {
        height: 35,
		marginTop: 30,
		marginLeft: 55,
		marginRight: 55,
        backgroundColor: colours.brightBlue,
        borderRadius: 3,
		borderWidth: 0,
		marginTop: 25
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16
    },
});