import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../components/Container';
import Game from './Game';
import About from './About';
import langBG from '../img/home/bg.png';
import langEN from '../img/home/us.png';
import blueBot from '../img/home/blueBot.png';
import beeBot from '../img/home/beeBot.png';
import faq from '../img/home/faq.png';
import text from '../controllers/TextContent';
import bee from '../img/game/lessons/in-lesson-pictures/bee.png';
import '../sass/home.scss';

export default class Home extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			lang: this.getLangPicture(),
			bot: this.getCharacterPicture()
		};

		this.switchBot = this.switchBot.bind(this);
		this.switchLang = this.switchLang.bind(this);
	}

	getCharacterPicture() {
		if (localStorage.getItem('character') === 'blue') {
			return blueBot;
		}
		return beeBot;
	}

	getLangPicture() {
		if (localStorage.getItem('lang') !== null && localStorage.getItem('lang') === 'en') {
			return langEN;
		}
		return langBG;
	}

	switchLang() {
		if (localStorage.getItem('lang') === 'bg') {
			localStorage.setItem('lang', 'en');
			this.setState({ lang: langEN });
		} else {
			localStorage.setItem('lang', 'bg');
			this.setState({ lang: langBG });
		}
	}

	switchBot() {
		if (localStorage.getItem('character') === 'bee') {
			localStorage.setItem('character', 'blue');
			this.setState({ bot: blueBot });
		} else {
			localStorage.setItem('character', 'bee');
			this.setState({ bot: beeBot });
		}
	}

	play() {
		ReactDOM.render(<Game />, document.getElementById('root'));
	}

	about() {
		ReactDOM.render(<About />, document.getElementById('root'));
	}

	render() {
		return (
			<Container
				class={'home'}
				content={
					<div className={'white-box big'}>
						<div className={'topRow'}>
							<div
								className={'play'}
								role={'button'}
								tabIndex={'0'}
								onClick={this.play}
								onKeyDown={this.play}
							>
								<i className={'material-icons'} data-action={'1'}>
									play_arrow
								</i>
								<div>{text.ui.home[0]}</div>
							</div>
							<div
								className={'faq'}
								role={'button'}
								tabIndex={'0'}
								onClick={this.about}
								onKeyDown={this.about}
							>
								<img src={faq} alt={'FAQ'} />
							</div>
						</div>
						<div className={'bottomRow'}>
							<div
								className={'box'}
								role={'button'}
								tabIndex={'0'}
								onClick={this.switchLang}
								onKeyDown={this.switchLang}
							>
								<img src={this.state.lang} alt={'Български'} />
								<span>{text.ui.home[1]}</span>
							</div>
							<div
								className={'box'}
								role={'button'}
								tabIndex={'0'}
								onClick={this.switchBot}
								onKeyDown={this.switchBot}
							>
								<img src={this.state.bot} alt={'Пчела'} />
								<span>{text.ui.home[2]}</span>
							</div>
							<div className={'box'}>
								<img src={bee} alt={'Пчела'} />
								<span>{text.ui.home[2]}</span>
							</div>
						</div>
					</div>
				}
			/>
		);
	}
}
