import React from 'react';
import LessonsContainer from '../components/LessonsContainer';
import ribbon from '../img/game/ribbon.png';
import board from '../img/game/drawing/board.svg';
import bee from '../img/game/lessons/in-lesson-pictures/bee.png';
import turquoise from '../img/game/drawing/colors/turquoise.png';
import emerald from '../img/game/drawing/colors/emerald.png';
import peterRiver from '../img/game/drawing/colors/peter-river.png';
import amethyst from '../img/game/drawing/colors/amethyst.png';
import wetAsphalt from '../img/game/drawing/colors/wet-asphalt.png';
import sunFlower from '../img/game/drawing/colors/sun-flower.png';
import carrot from '../img/game/drawing/colors/carrot.png';
import alizarin from '../img/game/drawing/colors/alizarin.png';
import cloud from '../img/game/drawing/colors/cloud.png';
import concrete from '../img/game/drawing/colors/concrete.png';
import pencil from '../img/game/drawing/tools/pencil.png';
import eraser from '../img/game/drawing/tools/eraser.png';
import smallSize from '../img/game/drawing/tools/small-size.png';
import bigSize from '../img/game/drawing/tools/big-size.png';
import '../sass/main.scss';
import '../sass/game.scss';
// import '../board/ManageUI';

export default class Game extends React.PureComponent {
	onNextClick() {}

	onPrevClick() {}

	onForwardClick() {}

	onBackwardsClick() {}

	render() {
		return (
			<div>
				<div className={'orange-line'} />
				<header>
					<div className={'ribbon'}>
						<img src={ribbon} alt={'Ribbon'} />
						<h1 className={'title'}>Test</h1>
					</div>
					<nav>
						<div className={'item'}>
							<i className={'material-icons'}>home</i>
							<span>Начало</span>
						</div>
						<div className={'item'}>
							<i className={'material-icons'}>flag</i>
							<span>Съдържание</span>
						</div>
						<div className={'item'}>
							<i className={'material-icons'}>settings</i>
							<span>За играта</span>
						</div>
						<div className={'item'}>
							<i className={'material-icons'}>phone</i>
							<span>Контакти</span>
						</div>
					</nav>
				</header>

				<div className={'container'}>
					<div className={'left'}>
						<LessonsContainer />
						<div className={'game-managment'}>
							<div className={'white-box bee-controls'}>
								<div>
									<i className={'material-icons'} data-action={'1'}>
										arrow_upward
									</i>
								</div>
								<div>
									<i className={'material-icons'} data-action={'5'}>
										arrow_back
									</i>
									<span className={'go-button'} data-action={'6'}>
										GO
									</span>
									<i className={'material-icons'} data-action={'2'}>
										arrow_forward
									</i>
								</div>
								<div>
									<i className={'material-icons'} data-action={'7'}>
										clear
									</i>
									<i className={'material-icons'} data-action={'4'}>
										arrow_downward
									</i>
									<i className={'material-icons'} data-action={'3'}>
										pause
									</i>
								</div>
							</div>
							<div className={'white-box board-manager'}>
								<div className={'colors'}>
									<div>
										<img src={turquoise} data-color={'#1abc9c'} alt={'Tturquoise'} />
										<img src={emerald} data-color={'#2ecc71'} alt={'Emerald'} />
										<img src={peterRiver} data-color={'#3498db'} alt={'Peter River'} />
										<img src={amethyst} data-color={'#9b59b6'} alt={'Amethyst'} />
										<img src={wetAsphalt} data-color={'#34495e'} alt={'Wet Asphalt'} />
									</div>
									<div>
										<img src={sunFlower} data-color={'#f1c40f'} alt={'Sun Flower'} />
										<img src={carrot} data-color={'#e67e22'} alt={'Carrot'} />
										<img src={alizarin} data-color={'#e74c3c'} alt={'Alizarin'} />
										<img src={cloud} data-color={'#ecf0f1'} alt={'Cloud'} />
										<img src={concrete} data-color={'#95a5a6'} alt={'Concrete'} />
									</div>
								</div>
								<div className={'tools'}>
									<span>
										<img src={pencil} data-mode={'pencil'} alt={'Pencil'} />
										<img src={eraser} data-mode={'eraser'} alt={'Eraser'} />
									</span>
									<span>
										<img src={smallSize} data-size={'5'} alt={'Small'} />
										<img src={bigSize} data-size={'10'} alt={'Big'} />
									</span>
								</div>
							</div>

							<div className={'white-box bee-container'}>
								<img src={bee} alt={'Bee'} />
							</div>
						</div>
					</div>
					<div className={'right'}>
						<div className={'board-container'}>
							<embed className={'white-box board'} src={board} alt={'Board'} />
							<div id={'drawing-board'} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
