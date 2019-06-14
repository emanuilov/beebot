/* eslint-disable import/no-cycle */
import React from 'react';
import ReactDOM from 'react-dom';
import About from '../pages/About';
import Contacts from '../pages/Contacts';
import Terms from '../pages/Terms';
import '../sass/footer.scss';

export default class Footer extends React.PureComponent {
	about() {
		ReactDOM.render(<About />, document.getElementById('root'));
	}

	contacts() {
		ReactDOM.render(<Contacts />, document.getElementById('root'));
	}

	terms() {
		ReactDOM.render(<Terms />, document.getElementById('root'));
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
