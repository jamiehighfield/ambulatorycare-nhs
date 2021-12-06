import React from 'react'
import { Button } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import AccountScreen from '../screens/AccountScreen'
import UserAccountScreen from '../screens/UserAccountScreen'
import PatientProfileScreen from '../screens/PatientProfileScreen'
import PrivacyScreen from '../screens/PrivacyScreen'
import NotesScreen from '../screens/NotesScreen'
import Message from '../ui/Message'
import AboutScreen from '../screens/AboutScreen'

// This acts as a stack navigator so there can be multiple screens within the single tab screen.
export default createStackNavigator({
	Account: AccountScreen,
	UserAccount: {
		screen: UserAccountScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Account',
			//headerRight: (
			//Removed due to feature not implemented.
			// <Button title='Edit' onPress={() => {
			//   Message.ShowOkMessage('Placeholder', 'This is just a placeholder for now.', () => { })
			// }} />
			//)
		})
	},
	PatientProfile: PatientProfileScreen,
	Privacy: PrivacyScreen,
	Notes: NotesScreen,
	About: AboutScreen
})