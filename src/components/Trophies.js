import React from 'react';
import PropTypes from 'prop-types';
import trophyActive from '../img/game/trophies/trophy-active.png';
import trophyInactive from '../img/game/trophies/trophy-inactive.png';

export default class Trophies extends React.Component {
	constructor(props) {
		super(props);
		this.state = { status: this.props.status };
	}

	changePageLink(link) {
		window.localStorage.setItem('nextPage', link);
		this.props.history.push('/SecondaryLocation');
	}

	updatePicture(trophyID, value) {
		this.setState(state => {
			const { trophies } = state.status;
			trophies[trophyID] = value;

			return {
				trophies
			};
		});
	}

	render() {
		return (
			<div className={'white-box trophies'}>
				<div>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=0')}
						src={this.state.status[0] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=1')}
						src={this.state.status[1] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>

					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=2')}
						src={this.state.status[2] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=3')}
						src={this.state.status[3] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=4')}
						src={this.state.status[4] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=5')}
						src={this.state.status[5] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=6')}
						src={this.state.status[6] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
				</div>
				<div>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=7')}
						src={this.state.status[7] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=8')}
						src={this.state.status[8] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=9')}
						src={this.state.status[9] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=10')}
						src={this.state.status[10] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=11')}
						src={this.state.status[11] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
					<img
						className={'pointer'}
						role={'button'}
						tabIndex={'0'}
						onClick={() => this.changePageLink('/Game?id=12')}
						src={this.state.status[12] ? trophyActive : trophyInactive}
						alt={'Трофей'}
					/>
				</div>
			</div>
		);
	}
}
Trophies.propTypes = {
	status: PropTypes.arrayOf(PropTypes.bool).isRequired,
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
