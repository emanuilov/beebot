import React from 'react';
// eslint-disable-next-line import/no-cycle
import Container from '../components/Container';

export default class Terms extends React.PureComponent {
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
				class={'terms'}
				content={
					<div className={'white-box big'}>
						<div
							role={'button'}
							tabIndex={'0'}
							className={'activate'}
							onClick={this.submit}
							onKeyDown={this.submit}
						>
							Условия
						</div>
					</div>
				}
			/>
		);
	}
}
