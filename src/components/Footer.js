import React from 'react';
import goTo, { openLink } from '../controllers/Redirect';
import '../sass/footer.scss';

export default class Footer extends React.PureComponent {
	render() {
		return (
			<footer>
				<div className={'left'}>
					Безопасност на движението по пътищата © Иновации и консултиране
				</div>
				<div className={'right'}>
					<span
						role={'button'}
						tabIndex={'0'}
						onClick={() => openLink('https://innovateconsult.net')}
					>
						За играта
					</span>{' '}
					•{' '}
					<span role={'button'} tabIndex={'0'} onClick={() => goTo('/Contacts')}>
						Контакти
					</span>{' '}
					•{' '}
					<span role={'button'} tabIndex={'0'} onClick={() => goTo('/Terms')}>
						Поверителност и условия
					</span>
				</div>
			</footer>
		);
	}
}
