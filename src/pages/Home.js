import React from 'react';
import PropTypes from 'prop-types';
import Container from '../components/Container';
import langBG from '../img/home/bg.png';
import langEN from '../img/home/us.png';
import blueBot from '../img/home/blueBot.png';
import beeBot from '../img/home/beeBot.png';
import contents from '../img/home/contents.png';
import contacts from '../img/home/contacts.png';
import text from '../controllers/TextContent';
import '../sass/home.scss';

const Home = class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			langPicture: this.getLangPicture(),
			botPicture: this.getCharacterPicture(),
			botOpt:
				window.localStorage.getItem('botOpt') !== '1' && window.localStorage.getItem('botOpt'),
			langOpt: window.localStorage.getItem('lang') !== 'bg' && window.localStorage.getItem('lang')
		};

		this.switchBot = this.switchBot.bind(this);
		this.switchLang = this.switchLang.bind(this);
		window.localStorage.setItem('nextPage', '');
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
			this.setState({ langPicture: langEN });
			window.localStorage.setItem('lang', 'en');
			this.setState({ langOpt: true });
			window.localStorage.setItem('nextPage', '/Home');
			this.forceUpdate();
		} else {
			localStorage.setItem('lang', 'bg');
			this.setState({ langPicture: langBG });
			window.localStorage.setItem('lang', 'bg');
			this.setState({ langOpt: false });
			window.localStorage.setItem('nextPage', '/Home');
			this.forceUpdate();
		}
	}

	switchBot() {
		if (localStorage.getItem('character') === 'bee') {
			localStorage.setItem('character', 'blue');
			this.setState({ botPicture: blueBot });
			window.localStorage.setItem('botOpt', 2);
			this.setState({ botOpt: true });
		} else {
			localStorage.setItem('character', 'bee');
			this.setState({ botPicture: beeBot });
			window.localStorage.setItem('botOpt', 1);
			this.setState({ botOpt: false });
		}
	}

	render() {
		return (
			<Container
				class={'home'}
				history={this.props.history}
				content={
					<div className={'white-box big'}>
						<div className={'topRow'}>
							<div
								className={'play'}
								role={'button'}
								tabIndex={'0'}
								onClick={() =>
									this.props.history.push(`/Game?id=${window.localStorage.getItem('lessonId')}`)
								}
							>
								<i className={'material-icons'} data-action={'1'}>
									play_arrow
								</i>
								<div>{text.ui.home[0]}</div>
							</div>
							<div
								className={'contents'}
								role={'button'}
								tabIndex={'0'}
								onClick={() => this.props.history.push('/Contents')}
							>
								<img src={contents} alt={'Contents'} />
							</div>
						</div>
						<div className={'bottomRow'}>
							<div className={'box'} role={'button'} tabIndex={'0'} onClick={this.switchBot}>
								<div className={'switchContainer'}>
									<label className={'switch'} htmlFor={'bot'}>
										<input
											type={'checkbox'}
											id={'bot'}
											onChange={this.switchBot}
											checked={this.state.botOpt}
										/>
										<span className={'slider round'} />
									</label>
								</div>
								<img src={this.state.botPicture} alt={'Пчела'} />
								<span>{text.ui.home[1]}</span>
							</div>
							<div
								className={'box langSwitch'}
								role={'button'}
								tabIndex={'0'}
								onClick={this.switchLang}
							>
								<div className={'switchContainer'}>
									<label className={'switch'} htmlFor={'lang'}>
										<input
											type={'checkbox'}
											id={'lang'}
											onChange={this.switchLang}
											checked={this.state.langOpt}
										/>
										<span className={'slider round'} />
									</label>
								</div>
								<img src={this.state.langPicture} alt={'Български'} />
								<span>{text.ui.home[2]}</span>
							</div>
							<div
								className={'box'}
								role={'button'}
								tabIndex={'0'}
								onClick={() => this.props.history.push('/Contacts')}
							>
								<img src={contacts} alt={'Контакти'} />
								<span>{text.ui.home[3]}</span>
							</div>
						</div>
					</div>
				}
			/>
		);
	}
};

Home.propTypes = {
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

export default Home;
