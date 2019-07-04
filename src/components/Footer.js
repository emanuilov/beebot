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
					<div
						role={'button'}
						tabIndex={'0'}
						onClick={() => openLink('https://innovateconsult.net')}
					>
						За играта
					</div>{' '}
					•{' '}
					<div role={'button'} tabIndex={'0'} onClick={() => goTo('/Contacts')}>
						Контакти
					</div>{' '}
					•{' '}
					<div className={'terms'}>
						<span role={'button'} tabIndex={'0'} onClick={() => goTo('/Privacy')}>
							Поверителност
						</span>{' '}
						и{' '}
						<span role={'button'} tabIndex={'0'} onClick={() => goTo('/Terms')}>
							условия
						</span>
					</div>
				</div>
			</footer>
		);
	}
}
