import React from 'react';
import PropTypes from 'prop-types';
import Sketchpad from '../controllers/Sketchpad';
import BeeMovement from '../controllers/BeeMovement';
import text from '../controllers/TextContent';
import Lesson from '../components/Lesson';
import board from '../img/game/drawing/board.svg';
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

const Game = class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgrMusicIcon: 'volume_up',
			beeOpacity: '1',
			beeInvisibility: '',
			pressedButtons: []
		};
		this.appendLessonPictures = this.appendLessonPictures.bind(this);
		this.embed = React.createRef();
		this.bee = React.createRef();
		this.isTheBeeOnTheCanvas = false;
		this.beeImageName = localStorage.getItem('character') === 'blue' ? 'blueBot.png' : 'beeBot.png';
		const urlLessonId = new URL(window.location.href).searchParams.get('id');
		this.lessonId = urlLessonId !== 'null' ? urlLessonId : '0';
		window.localStorage.setItem('nextPage', '');
	}

	componentDidMount() {
		this.initiateDrawing();
		this.initiateGameUI();
	}

	onControlClick = e => {
		e.persist();
		const actionID = parseInt(e.target.getAttribute('data-action'), 10);
		if (actionID !== 7 && actionID !== 6) {
			this.setState(prevState => {
				prevState.pressedButtons.push(actionID);
				return { pressedButtons: prevState.pressedButtons };
			});
			this.controller.pushSteps(actionID);
		} else if (actionID === 6) {
			this.controller.runTheSteps();
		} else {
			this.sketchpad.clear();
			this.controller.reset();
			this.setState({ beeInvisibility: '', pressedButtons: [] });
		}
		e.target.setAttribute('style', 'transform: translate(0px, 5px);');
		setTimeout(target => target.setAttribute('style', ''), 100, e.target);
	};

	// Cnvas
	onDragEnter = () => {
		this.isTheBeeOnTheCanvas = true;
	};

	onDragOver(e) {
		e.preventDefault();
		return false;
	}

	onDragLeave = () => {
		this.isTheBeeOnTheCanvas = false;
	};

	onDrop = e => {
		e.stopPropagation();
		if (this.isTheBeeOnTheCanvas) {
			this.setState({ beeOpacity: '1' });
			this.controller.insertImage(
				this.controller.getBoxAndRowID(this.controller.getMouseCoordinates(e))
			);
		}
		return false;
	};

	// Bee image
	onDragStart = () => {
		this.setState({ beeOpacity: 0.4 });
	};

	onDragEnd = () => {
		if (this.isTheBeeOnTheCanvas) {
			this.setState({ beeInvisibility: 'invisible' });
			this.isTheBeeOnTheCanvas = false;
		} else {
			this.setState({ beeOpacity: 1 });
		}
	};

	getArrowLabel(button) {
		switch (button) {
			case 1:
				return 'arrow_upward';
			case 2:
				return 'arrow_forward';
			case 3:
				return 'arrow_downward';
			case 4:
				return 'arrow_back';
			default:
				return '';
		}
	}

	toggleBackgroundMusic = () => {
		if (!window.music.paused) {
			this.setState({ backgrMusicIcon: 'volume_off' });
			window.music.pause();
		} else {
			this.setState({ backgrMusicIcon: 'volume_up' });
			window.music.play();
		}
	};

	initiateDrawing = () => {
		this.sketchpad = new Sketchpad({
			element: '#drawing-board',
			scale: 0.92
		});
	};

	initiateGameUI = () => {
		this.embed.current.addEventListener('load', () => {
			this.controller = new BeeMovement(this.embed.current, this.beeImageName);
			this.appendLessonPictures();
		});
	};

	appendLessonPictures() {
		text.lessons[this.lessonId].images.forEach(image =>
			this.controller.insertImage(image.position, image.name)
		);
	}

	renderPressedButtons(buttons) {
		if (this.state.beeInvisibility) {
			return buttons.map(button => (
				<i className={'material-icons'}>{this.getArrowLabel(button)}</i>
			));
		}
		return null;
	}

	render() {
		return (
			<div>
				<div className={'orange-line'} />
				<header>
					<nav>
						<div
							className={'item'}
							role={'button'}
							tabIndex={'0'}
							onClick={() => this.props.history.push('/Home')}
						>
							<i className={'material-icons'}>home</i>
							<span>Начало</span>
						</div>
						<div
							className={'item'}
							role={'button'}
							tabIndex={'0'}
							onClick={() => this.props.history.push('/Contents')}
						>
							<i className={'material-icons'}>flag</i>
							<span>Съдържание</span>
						</div>
						<div
							className={'item'}
							role={'button'}
							tabIndex={'0'}
							onClick={() => window.openLink('https://bdp.innovateconsult.net')}
						>
							<i className={'material-icons'}>settings</i>
							<span>За играта</span>
						</div>
						<div
							className={'item'}
							role={'button'}
							tabIndex={'0'}
							onClick={() => this.props.history.push('/Contacts')}
						>
							<i className={'material-icons'}>phone</i>
							<span>Контакти</span>
						</div>
					</nav>
					<div
						className={'background-sound-button'}
						role={'button'}
						tabIndex={'0'}
						onClick={this.toggleBackgroundMusic}
					>
						<i className={'material-icons'}>{this.state.backgrMusicIcon}</i>
					</div>
				</header>

				<div className={'container'}>
					<div className={'left'}>
						<Lesson history={this.props.history} id={this.lessonId} />
						<div className={'game-managment'}>
							<div className={'white-box bee-controls'}>
								<div>
									<i
										role={'button'}
										tabIndex={'0'}
										onClick={this.onControlClick}
										className={'material-icons'}
										data-action={'1'}
									>
										arrow_upward
									</i>
								</div>
								<div>
									<i
										role={'button'}
										tabIndex={'0'}
										onClick={this.onControlClick}
										className={'material-icons'}
										data-action={'4'}
									>
										arrow_back
									</i>
									<span
										role={'button'}
										tabIndex={'0'}
										className={'go-button'}
										onClick={this.onControlClick}
										data-action={'6'}
									>
										GO
									</span>
									<i
										role={'button'}
										tabIndex={'0'}
										onClick={this.onControlClick}
										className={'material-icons'}
										data-action={'2'}
									>
										arrow_forward
									</i>
								</div>
								<div>
									<i
										role={'button'}
										tabIndex={'0'}
										className={'material-icons'}
										data-action={'7'}
										onClick={this.onControlClick}
									>
										clear
									</i>
									<i
										role={'button'}
										tabIndex={'0'}
										className={'material-icons'}
										onClick={this.onControlClick}
										data-action={'3'}
									>
										arrow_downward
									</i>
									<i
										role={'button'}
										tabIndex={'0'}
										className={'material-icons'}
										onClick={this.onControlClick}
										data-action={'5'}
									>
										pause
									</i>
								</div>
							</div>
							<div className={'white-box board-manager'}>
								<div className={'colors'}>
									<div>
										<img
											role={'button'}
											src={turquoise}
											alt={'Tturquoise'}
											onClick={() => {
												this.sketchpad.color = '#1abc9c';
											}}
										/>
										<img
											role={'button'}
											src={emerald}
											alt={'Emerald'}
											onClick={() => {
												this.sketchpad.color = '#2ecc71';
											}}
										/>
										<img
											role={'button'}
											src={peterRiver}
											alt={'Peter River'}
											onClick={() => {
												this.sketchpad.color = '#3498db';
											}}
										/>
										<img
											role={'button'}
											src={amethyst}
											alt={'Amethyst'}
											onClick={() => {
												this.sketchpad.color = '#9b59b6';
											}}
										/>
										<img
											role={'button'}
											src={wetAsphalt}
											alt={'Wet Asphalt'}
											onClick={() => {
												this.sketchpad.color = '#34495e';
											}}
										/>
									</div>
									<div>
										<img
											role={'button'}
											src={sunFlower}
											alt={'Sun Flower'}
											onClick={() => {
												this.sketchpad.color = '#f1c40f';
											}}
										/>
										<img
											role={'button'}
											src={carrot}
											alt={'Carrot'}
											onClick={() => {
												this.sketchpad.color = '#e67e22';
											}}
										/>
										<img
											role={'button'}
											src={alizarin}
											alt={'Alizarin'}
											onClick={() => {
												this.sketchpad.color = '#e74c3c';
											}}
										/>
										<img
											role={'button'}
											src={cloud}
											alt={'Cloud'}
											onClick={() => {
												this.sketchpad.color = '#ecf0f1';
											}}
										/>
										<img
											role={'button'}
											src={concrete}
											alt={'Concrete'}
											onClick={() => {
												this.sketchpad.color = '#95a5a6';
											}}
										/>
									</div>
								</div>
								<div className={'tools'}>
									<span>
										<img src={pencil} data-mode={'pencil'} alt={'Pencil'} />
										<img
											role={'button'}
											src={eraser}
											data-mode={'eraser'}
											alt={'Eraser'}
											onClick={() => this.sketchpad.clear()}
										/>
									</span>
									<span>
										<img
											role={'button'}
											src={smallSize}
											alt={'Small'}
											onClick={() => {
												this.sketchpad.penSize = 5;
											}}
										/>
										<img
											role={'button'}
											src={bigSize}
											alt={'Big'}
											onClick={() => {
												this.sketchpad.penSize = 10;
											}}
										/>
									</span>
								</div>
							</div>

							<div
								className={`white-box bee-container ${
									this.state.beeInvisibility ? 'flexStart' : ''
								}`}
							>
								<img
									ref={this.bee}
									className={this.state.beeInvisibility}
									style={{ opacity: this.state.beeOpacity }}
									onDragStart={this.onDragStart}
									onDragEnd={this.onDragEnd}
									src={`${process.env.PUBLIC_URL}/img/bees/regular/${this.beeImageName}`}
									alt={'Bot'}
								/>
								<div>{this.renderPressedButtons(this.state.pressedButtons)}</div>
							</div>
						</div>
					</div>
					<div className={'right'}>
						<div className={'board-container'}>
							<embed ref={this.embed} className={'white-box board'} src={board} alt={'Board'} />
							<canvas
								onDragEnter={this.onDragEnter}
								onDragOver={this.onDragOver}
								onDragLeave={this.onDragLeave}
								onDrop={this.onDrop}
								className={'drawing-board'}
								id={'drawing-board'}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

Game.propTypes = {
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

export default Game;
