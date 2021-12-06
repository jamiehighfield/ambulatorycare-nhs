import React from 'react';
import { Button } from 'react-native';
import ListView from '../../../components/ListView';
import Message from '../../../ui/Message';
import Api from '../../../api/Api';

export default class Step1PatientVerificationScreen extends React.Component {

	constructor(props) {
        super(props);
        
        this.state = {
            nextDisabled: true,
            firstName: '',
            lastName: ''
        };
    }

    //This is used to parse details to the static navigation options below.
    getUserDetails() {
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
			headerRight: (
				<Button disabled={navigation.state.nextDisabled} title='Next' onPress={async () => {
                    //Not currently working
                    navigation.setParams({
                        nextDisabled: true
                    });

                    let userDetails = navigation.state.params.getUserDetails();

                    //Check for details validation
                    if (userDetails.firstName == null || userDetails.firstName == ''
                        || userDetails.lastName == null || userDetails.lastName == '') {
                        Message.ShowOkMessage('Invalid Details', 'Please ensure you have entered valid first name, last name and date of birth before continuing.', () => { });
                        
                        return;
                    }
                    
                    try {
                        //Perform the request, parsing in the entered details.
                        let responseObj = await Api.PerformRequestWithBody('api/v1/account/verify?patient_first_name=' + userDetails.firstName + '&patient_last_name=' + userDetails.lastName, 'GET', { });
                    
                        //Check the response is valid.
                        if(responseObj.firstName == null) {
                            Message.ShowOkMessage('Invalid Details', 'Please ensure you have entered valid first name, last name and date of birth before continuing.', () => { });
                        
                            return;
                        } else {
                            navigation.navigate('Step2UsernamePassword', {
                                userDetails: JSON.stringify(responseObj)
                            });
                        }
                    } catch(error) {
                        Message.ShowOkMessage('Invalid Details', 'Please ensure you have entered valid first name, last name and date of birth before continuing.', () => { });
                        
                        return;
                    }
				}} />
			)
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            nextDisabled: false,
            getUserDetails: this.getUserDetails.bind(this)
        });
    }

    render () {
        let data = [
            {
                divider: true,
                label: 'In order to confirm your identity, please confirm the following information for the patient.'
            },
            {
                divider: true,
                label: 'PERSONAL INFORMATION'
            },
            {
                divider: false,
                input: true,
                label: 'First Name',
                inputChange: (text) => {
                    this.setState({
                        firstName: text
                    });
                }
            },
            {
                divider: false,
                input: true,
                label: 'Last Name',
                inputChange: (text) => {
                    this.setState({
                        lastName: text
                    });
                }
            },
            {
                divider: false,
                input: true,
                label: 'Date of Birth'
            },
            {
                divider: true,
                label: 'We will attempt to match this information you provide to the information we hold on the patient.'
            },
        ];

        return (
            <ListView data={data} />
        );
	}
}