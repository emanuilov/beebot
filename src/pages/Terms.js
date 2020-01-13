import React from 'react';
import Container from '../components/Container';
import '../sass/info.scss';

export default function Terms(props) {
	return (
		<Container
			class={'terms'}
			history={props.history}
			content={
				<div className={'white-box big terms'}>
					<h1 className={'mb'}>ЛИЦЕНЗЕН ДОГОВОР МЕЖДУ ПОТРЕБИТЕЛЯ И ИНОВАЦИИ И КОНСУЛТИРАНЕ ООД</h1>
					<p>
						ВНИМАНИЕ! МОЛЯ ПРОЧЕТЕТЕ СЛЕДНИЯ ДОГОВОР. СЪС СЪГЛАСИЕТО СИ С ТОЗИ ДОГОВОР, СЕ СЧИТА, ЧЕ
						ВИЕ ПРИЕМАТЕ ВСИЧКИ УСЛОВИЯ И КЛАУЗИ В НЕГО („ДОГОВОРА“) БЕЗУСЛОВНО И СТАВАТЕ СТРАНА В
						ТОЗИ ДОГОВОР С АВТОРИТЕ НА СОФТУЕРА. В ПРОТИВЕН СЛУЧАЙ НЕ ИЗПОЛЗВАЙТЕ „БЕЗОПАСНОСТ НА
						ДВИЖЕНИЕТО ПО ПЪТИЩАТА“
					</p>
					<p>
						1. По този договор се отстъпва право на потребителя да използва „безопасност на
						движението по пътищата“, с цел обучение.
					</p>
					<p>
						2. Авторските права на този продукт са изцяло притежание на Иновации и консултиране ООД.
						Той е обект на интелектуална собственост и е защитен от закона, като такъв
					</p>

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
