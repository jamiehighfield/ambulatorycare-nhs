import React from 'react';
import ListView from '../components/ListView';
import Message from '../ui/Message';
import ExtendedMessage from '../ui/ExtendedMessage';
import { WebBrowser } from 'expo';
import CurrentUser from '../api/CurrentUser';

export default class AccountScreen extends React.Component {
	static navigationOptions = {
		title: 'Account',
	};

	constructor(props) {
		super(props);
	}

	render () {
		let data = [
            {
                divider: true,
                label: 'ACCOUNT INFORMATION'
            },
			{
				divider: false,
				label: 'Account Information',
				avatar: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/22405952_1913209005362070_31231932413825963_n.jpg?_nc_cat=106&_nc_ht=scontent-lhr3-1.xx&oh=79300297b69e6cc62ab23a5a8156953a&oe=5CDDA6E0',
				subtitle: 'Access and modify information pertinent to this account.',
				clickable: true,
				onPress: () => {
					this.props.navigation.navigate('UserAccount');
				}
			},
			{
				divider: false,
				label: 'Patient Information',
				avatar: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/22405952_1913209005362070_31231932413825963_n.jpg?_nc_cat=106&_nc_ht=scontent-lhr3-1.xx&oh=79300297b69e6cc62ab23a5a8156953a&oe=5CDDA6E0',
				subtitle: 'Access information pertinent to this profile.',
				clickable: true,
				onPress: () => {
					this.props.navigation.navigate('PatientProfile');
				}
			},
			{
				divider: true,
				label: 'SEND PROFILE'
			},
			// {
			// 	divider: false,
			// 	label: 'Update Medical Professional',
			// 	clickable: true,
			// 	onPress: () => {
			// 		Message.ShowOkMessage('Placeholder', 'This will send an email to your medical professional with all your up-to-date intake information.', () => { });
			// 	}
			// },
            {
                divider: true,
                label: 'SETTINGS & OTHER INFORMATION'
            },
			{
				divider: false,
				label: 'Notes',
				onPress: () => {
					this.props.navigation.navigate('Notes');
				}
			},
			//Removed due to features not implemented.
			// {
			// 	divider: false,
			// 	label: 'Settings',
			// 	onPress: () => {
			// 		Message.ShowOkMessage("Placeholder", "Placeholder", () => { });
			// 	}
			// },
			// {
			// 	divider: false,
			// 	label: 'Accessibility',
			// 	onPress: () => {
			// 		Message.ShowOkMessage("Placeholder", "Placeholder", () => { });
			// 	}
			// },
			{
				divider: false,
				label: 'Terms & Conditions',
				onPress: () => {
					WebBrowser.openBrowserAsync('http://www.wales.nhs.uk/termsofuse');
				}
			},
			{
				divider: false,
				label: 'Privacy',
				onPress: () => {
					this.props.navigation.navigate('Privacy');
				}
			},
			{
				divider: false,
				label: 'About',
				onPress: () => {
					this.props.navigation.navigate('About');
				}
			},
            {
                divider: true,
                label: ''
            },
			{
				divider: false,
				label: 'Sign Out',
				onPress: () => {
					ExtendedMessage.ShowSignOutMessage(() => {
						CurrentUser.SignOut();

						this.props.navigation.navigate('SignIn');
					}, () => {

					});
				}
			},
            {
                divider: true,
                label: ''
            },
            // {
			// 	divider: false,
			// 	critical: true,
            //     label: 'Delete Account',
            //     onPress: () => {
            //         Message.ShowOkMessage('Delete Account', 'This is just a placeholder for the time being.', () => { });
            //     }
            // },
            {
                divider: true,
                label: ''
            },
            {
                divider: true,
                label: ''
            }
		];

		return (
			<ListView data={data} />
		)
	}
}