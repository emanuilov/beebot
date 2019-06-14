import React from 'react';
import Container from '../components/Container';

export default class Instructions extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.change = this.change.bind(this);
	}

	change() {
		this.setState({});
	}

	render() {
		return (
			<Container
				class={'instructions'}
				content={
					<div className={'white-box big'}>
						<div role={'button'} tabIndex={'0'} className={'activate'} onClick={this.submit}>
							Активирай
						</div>
					</div>
				}
			/>
		);
	}
}
