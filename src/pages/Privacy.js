import React from 'react';
import Container from '../components/Container';
import '../sass/info.scss';

export default function Privacy() {
	return (
		<Container
			class={'terms'}
			content={
				<div className={'white-box big'}>
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
							window.openLink('https://innovateconsult.net');
						}}
					>
						Още
					</div>
				</div>
			}
		/>
	);
}
