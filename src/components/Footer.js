import React from 'react';
import '../sass/footer.scss';

export default function Footer() {
	return (
		<footer>
			<div className={'left'}>Безопасност на движението по пътищата © Иновации и консултиране</div>
			<div className={'right'}>
				<div
					role={'button'}
					tabIndex={'0'}
					onClick={() => window.openLink('https://innovateconsult.net')}
				>
					За играта
				</div>{' '}
				•{' '}
				<div role={'button'} tabIndex={'0'} onClick={() => window.goTo('/Contacts')}>
					Контакти
				</div>{' '}
				•{' '}
				<div className={'terms'}>
					<span role={'button'} tabIndex={'0'} onClick={() => window.goTo('/Privacy')}>
						Поверителност
					</span>{' '}
					и{' '}
					<span role={'button'} tabIndex={'0'} onClick={() => window.goTo('/Terms')}>
						условия
					</span>
				</div>
			</div>
		</footer>
	);
}
