import React from 'react';
import ListView from '../components/ListView';

export default class AboutScreen extends React.Component {
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
                label: 'Copyright © Cardiff & Value University Health Board'
            },
            {
                divider: true,
                label: 'Developed by students at the National Software Academy.'
            }
		];

		return (
			<ListView data={data} />
		)
	}
}