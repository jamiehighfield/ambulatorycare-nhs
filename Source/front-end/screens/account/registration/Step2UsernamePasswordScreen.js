import React from 'react';
import { Button } from 'react-native';
import ListView from '../../../components/ListView';
import Message from '../../../ui/Message';
import Api from '../../../api/Api';

export default class Step2UsernamePasswordScreen extends React.Component {

	constructor(props) {
        super(props);
        
        this.state = {
            nextDisabled: true,
            emailAddress: '',
            username: '',
            password: '',
            confirmPassword: '',
            answer: ''
        };
    }

    //This is used to parse details to the static navigation options below.
    getDetails() {
        let userDetails = JSON.parse(this.props.navigation.getParam('userDetails'));

        return {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            emailAddress: this.state.emailAddress,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            answer: this.state.answer
        }
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
			headerRight: (
				<Button disabled={navigation.state.nextDisabled} title='Register' onPress={async () => {
                    //Not currently working
                    navigation.setParams({
                        nextDisabled: true
                    });

                    let userDetails = navigation.state.params.getDetails();

                    //Check for details validation
                    if (userDetails.emailAddress == null || userDetails.emailAddress == ''
                        || userDetails.username == null || userDetails.username == ''
                        || userDetails.password == null || userDetails.confirmPassword == ''
                        || userDetails.answer == null || userDetails.answer == '') {
                        Message.ShowOkMessage('Invalid Details', 'Please ensure you have completed all fields before continuing.', () => { });
                        
                        return;
                    }

                    //Check if passwords match
                    if (userDetails.password != userDetails.confirmPassword) {
                        Message.ShowOkMessage('Invalid Details', 'Plmease ensure both passwords match before continuing.', () => { });
                        
                        return;
                    }
                    
                    try {
                        //Perform the request, parsing in the entered details.
                        let responseObj = await Api.PerformRequestWithBody('api/v1/account/register?patient_first_name=' + userDetails.firstName + '&patient_last_name=' + userDetails.lastName + '&patient_dob=2019-03-29&patient_nhs_number=asd&username=' + userDetails.username + '&password=' + userDetails.password + '&security_question_id=1&security_question_answer=' + userDetails.answer, 'GET', { });
                    
                        //Check the response is valid.
                        if(responseObj.firstName == null) {
                            Message.ShowOkMessage('Invalid Details', 'Please ensure you have completed all fields before continuing.', () => { });
                        
                        return;
                        } else {
                            Message.ShowOkMessage('Success', 'Successfully registered.', () => {
                                navigation.popToTop();
                            });

                            return;
                        }
                    } catch(error) {
                        Message.ShowOkMessage('Invalid Details', 'Please ensure you have completed all fields before continuing.', () => { });
                        
                        return;
                    }
				}} />
			)
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            nextDisabled: false,
            getDetails: this.getDetails.bind(this)
        });
    }

    render () {
        let userDetails = JSON.parse(this.props.navigation.getParam('userDetails'));

        let data = [
            {
                divider: true,
                label: 'You are registering for the patient ' + userDetails.firstName + ' ' + userDetails.lastName + '. Please complete the following information for registration.'
            },
            {
                divider: true,
                label: 'PERSONAL INFORMATION'
            },
            {
                divider: false,
                input: true,
                label: 'Email Address',
                inputChange: (text) => {
                    this.setState({
                        emailAddress: text
                    });
                }
            },
            {
                divider: true,
                label: 'USERNAME & PASSWORD'
            },
            {
                divider: false,
                input: true,
                label: 'Username',
                inputChange: (text) => {
                    this.setState({
                        username: text
                    });
                }
            },
            {
                divider: false,
                input: true,
                label: 'Password',
                inputChange: (text) => {
                    this.setState({
                        password: text
                    });
                }
            },
            {
                divider: false,
                input: true,
                label: 'Confirm Password',
                inputChange: (text) => {
                    this.setState({
                        confirmPassword: text
                    });
                }
            },
            {
                divider: true,
                label: 'SECURITY INFORMATION'
            },
            {
                divider: false,
                input: true,
                label: 'Answer',
                inputChange: (text) => {
                    this.setState({
                        answer: text
                    });
                }
            },
            {
                divider: true,
                label: 'By clicking \'Register\', you are agreeing to the Terms & Conditions and Privacy Policy.'
            },
        ];

        return (
            <ListView data={data} />
        );
	}
}