/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import '../sass/info.scss';

const Contacts = props => {
	return (
		<Container
			class={'contacts'}
			history={props.history}
			content={
				<div className={'white-box big contacts'}>
					<div
						className={'homeButton pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => props.history.push('/Home')}
					>
						<i className={'material-icons'}>home</i>
					</div>
					<div role={'button'} tabIndex={'0'} className={'activate'}>
						<div className={'pr business'}>
							<h1>Търговски данни:</h1>
							<div>„Иновации и консултиране“ ООД</div>
							<div>гр. Шумен, ул. Братя Миладинови“ 12, ап. 4</div>
							<div>Булстат: BG202410459</div>
							<div>МОЛ: Ангел Ангелов</div>

							<div className={'authors mt'}>
								<h1 className={'pt'}>Автори:</h1>
								<div className={'left'}>
									<div>д-р Галина Хайдар</div>
									<div>д-р Ангел Ангелов</div>
									<div>Николай Бебенов</div>
									<div>Габриел Атанасов</div>
									<div>Радостин Емануилов</div>
								</div>
								<div className={'right'}>
									<div>автор-методист</div>
									<div>ръководител</div>
									<div>художник</div>
									<div>дизайнер</div>
									<div>софтуерен инженер</div>
								</div>
							</div>
						</div>
						<div className={'pl details'}>
							<h1 className={'mt'}>Връзка с нас:</h1>
							<div
								className={'pointer'}
								role={'button'}
								tabIndex={'0'}
								onClick={() => window.openMail('office@innovateconsult.net')}
							>
								Е: office@innovateconsult.net
							</div>
							<div>T: 0878 711 714</div>
							<div
								className={'pointer'}
								role={'button'}
								tabIndex={'0'}
								onClick={() => window.openLink('https://bdp.innovateconsult.net')}
							>
								W: bdp.innovateconsult.net
							</div>
						</div>
					</div>
				</div>
			}
		/>
	);
};

Contacts.propTypes = {
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

export default Contacts;
