import React from 'react';
import ListView from '../components/ListView';
import CurrentUser from '../api/CurrentUser';
import Message from '../ui/Message';

export default class UserAccountScreen extends React.Component {
    static navigationOptions = {
        title: 'Account Profile',
    };

	constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            address: '',
            emailAddress: '',
            telephoneNumber: ''
        };
    }

    render () {
        CurrentUser.GetUserIdentity()
            .then((response) => {
                this.setState({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    gender: response.gender,
                    emailAddress: response.emailAddress
                });
            });

        let data = [
            {
                divider: true,
                label: 'PERSONAL INFORMATION'
            },
            {
                divider: false,
                label: 'First Name',
                value: (this.state.firstName)
            },
            {
                divider: false,
                label: 'Last Name',
                value: (this.state.lastName)
            },
            {
                divider: false,
                label: 'Gender',
                value: (this.state.gender)
            },
            {
                divider: false,
                label: 'Date of Birth',
                value: (this.state.dateOfBirth)
            },
            {
                divider: false,
                label: 'Address',
                value: (this.state.address)
            },
            {
                divider: false,
                label: 'Email Address',
                value: (this.state.emailAddress)
            },
            {
                divider: false,
                label: 'Telephone Number',
                value: (this.state.telephoneNumber)
            },
            {
                divider: true,
                label: 'If you wish to update this information, please contact your medical professional.'
            }
        ];

        return (
            <ListView data={data} />
        );
	}
}