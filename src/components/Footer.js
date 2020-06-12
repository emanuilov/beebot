import React from 'react';
import PropTypes from 'prop-types';
import '../sass/footer.scss';

const Footer = props => {
	return (
		<footer>
			<div className={'left'}>Безопасност на движението по пътищата © Иновации и консултиране</div>
			<div className={'right'}>
				<div
					role={'button'}
					tabIndex={'0'}
					onClick={() => window.openLink('https://bdp.innovateconsult.net')}
				>
					За играта
				</div>{' '}
				•{' '}
				<div role={'button'} tabIndex={'0'} onClick={() => props.history.push('/Contacts')}>
					Контакти
				</div>{' '}
				•{' '}
				<div
					role={'button'}
					tabIndex={'0'}
					onClick={() => window.openLink('https://bdp.innovateconsult.net/terms-of-use')}
				>
					Поверителност и условия
				</div>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	history: PropTypes.shape({
		action: PropTypes.string,
		block: PropTypes.func,
		createHref: PropTypes.func,
		go: PropTypes.func,
		goBack: PropTypes.func,
		goForward: PropTypes.func,
		length: PropTypes.number,
		listen: PropTypes.func,
		location: PropTypes.shape({
			pathname: PropTypes.string,
			search: PropTypes.string,
			hash: PropTypes.string,
			state: PropTypes.string,
			key: PropTypes.string
		}),
		push: PropTypes.func,
		replace: PropTypes.func
	}).isRequired
};

export default Footer;
