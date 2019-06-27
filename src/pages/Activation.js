import React from 'react';
import LicenseManagment from '../controllers/LicenseManagment';
import Container from '../components/Container';
import '../sass/activation.scss';

export default class Activation extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { key: '', wrongKey: false, technicalError: false };

		this.change = this.change.bind(this);
		this.submit = this.submit.bind(this);
	}

	getErrorMessage() {
		return <span className={'red'}>Възникна технически проблем, опитайте пак.</span>;
	}

	getWrongKeyMessage() {
		return <span className={'red'}>Въведеният код е грешен.</span>;
	}

	change(event) {
		this.setState({ key: event.target.value });
	}

	async submit() {
		const result = await new LicenseManagment(this.state.key);
		if (result !== 200) {
			switch (result) {
				case 406:
					this.setState({ wrongKey: true });
					break;
				default:
					this.setState({ technicalError: true });
			}
		}
	}

	render() {
		return (
			<Container
				class={'activation'}
				content={
					<div className={'white-box big'}>
						<h2>Моля активирайте продукта</h2>
						<input
							name={'key'}
							type={'text'}
							placeholder={'Лицензен ключ'}
							value={this.state.key}
							onChange={this.change}
						/>
						<div role={'button'} tabIndex={'0'} className={'activate'} onClick={this.submit}>
							Активирай
						</div>
						<div className={'result'}>
							{this.state.technicalError ? this.getErrorMessage() : null}
							{this.state.wrongKey ? this.getWrongKeyMessage() : null}
						</div>
					</div>
				}
			/>
		);
	}
}
