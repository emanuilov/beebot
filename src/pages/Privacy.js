import React from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import '../sass/info.scss';

const Privacy = props => {
	return (
		<Container
			class={'terms'}
			history={props.history}
			content={
				<div className={'white-box big'}>
					<div
						className={'homeButton pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => props.history.push('/Home')}
					>
						<i className={'material-icons'}>home</i>
					</div>
					<h1 className={'mb'}>Общи условия</h1>
					<ul>
						<li>
							Иновации и консултиране ООД прилага в търговските си взаимоотношения с Клиентите
							настоящите Общи условия, наричан в настоящия текст за краткост “Администратор” или
							“Иновации и консултиране”.
						</li>
						<li>
							Иновации и консултиране, като администратор на лични данни, събира и обработва
							определена информация за физически и юридически лица.
						</li>
						<li>
							Настоящата политика за защита на личните данни урежда как да бъдат събирани,
							обработвани и съхранявани личните данни, за да отговарят на стандартите в
							организацията на Администратора и да са в съответствие с правните изисквания.
						</li>
					</ul>

					<div
						role={'button'}
						tabIndex={'0'}
						className={'more mt'}
						onClick={() => {
							window.openLink('https://bdp.innovateconsult.net/terms-of-use');
						}}
					>
						Още
					</div>
				</div>
			}
		/>
	);
};

Privacy.propTypes = {
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

export default Privacy;
