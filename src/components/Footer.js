import React from 'react';
import { Redirect } from 'react-router-dom';
import '../sass/footer.scss';

export default class Footer extends React.PureComponent {
	about() {
		return <Redirect to={'/About'} />;
	}

	contacts() {
		return <Redirect to={'/Contacts'} />;
	}

	terms() {
		return <Redirect to={'/Terms'} />;
	}

	render() {
		return (
			<footer>
				<div className={'left'}>
					Безопасност на движението по пътищата © Иновации и Консултиране
				</div>
				<div className={'right'}>
					<span role={'button'} tabIndex={'0'} onClick={this.about}>
						За играта
					</span>{' '}
					•{' '}
					<span role={'button'} tabIndex={'0'} onClick={this.contacts}>
						Контакти
					</span>{' '}
					•{' '}
					<span role={'button'} tabIndex={'0'} onClick={this.terms}>
						Поверителност и условия
					</span>
				</div>
			</footer>
		);
	}
}
