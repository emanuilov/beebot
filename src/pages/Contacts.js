/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import Container from '../components/Container';
import '../sass/info.scss';

export default function Contacts() {
	return (
		<Container
			class={'contacts'}
			content={
				<div className={'white-box big contacts'}>
					<div role={'button'} tabIndex={'0'} className={'activate'}>
						<div className={'pr business'}>
							<h1>Търговски данни:</h1>
							<div>„Иновации и консултиране“ ООД</div>
							<div>гр. Шумен, ул. Братя Миладинови“ 12, ап. 4</div>
							<div>Булстат: BG202410459</div>
							<div>МОЛ: Ангел Ангелов</div>
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

						<div className={'pl authors'}>
							<h1>Автори:</h1>
							<div>
								д-р Галина Хайдар
								<p
									className={'email pointer'}
									role={'button'}
									tabIndex={'0'}
									onClick={() => window.openMail('galinahaidar@abv.bg')}
								>
									• galinahaidar@abv.bg
								</p>
							</div>
							<div>
								д-р Ангел Ангелов
								<p
									className={'email pointer'}
									role={'button'}
									tabIndex={'0'}
									onClick={() => window.openMail('angelov@innovateconsult.net')}
								>
									• angelov@innovateconsult.net
								</p>
							</div>
							<div>
								Николай Бебенов
								<p
									className={'email pointer'}
									role={'button'}
									tabIndex={'0'}
									onClick={() => window.openMail('bebenovnikolai@abv.bg')}
								>
									• bebenovnikolai@abv.bg
								</p>
							</div>
							<div>
								Габриел Атанасов
								<p
									className={'email pointer'}
									role={'button'}
									tabIndex={'0'}
									onClick={() => window.openMail('me@gabo.space')}
								>
									• me@gabo.space
								</p>
							</div>
						</div>
					</div>
				</div>
			}
		/>
	);
}
