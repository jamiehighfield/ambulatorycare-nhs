import React from 'react';
import ListView from '../components/ListView';

export default class PrivacyScreen extends React.Component {
    static navigationOptions = {
        title: 'Privacy',
    };

	constructor(props) {
        super(props);
    }

    render () {
        let data = [
            {
                divider: true,
                label: 'This application and associated websites are operated by Cardiff & Value University Health Board (“CVUHB”, “Us”, “We” or “Our”), as part of NHS Wales. This document exists to inform You (“You”, “Your”) of our policies and Your obligations and rights, including, but not limited to:'
            },
            {
                divider: true,
                label: 'How we collect your Personally Identifiable Information (“Personal Data”, “PID”), and'
            },
            {
                divider: true,
                label: 'How we use your Personal Data, and'
            },
            {
                divider: true,
                label: 'Disclosure of your Personal Data, and'
            },
            {
                divider: true,
                label: 'Your rights under the General Data Protection Regulation (“GDPR”).'
            }
        ];

        return (
            <ListView data={data} />
        );
	}
}