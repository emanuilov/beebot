import React from 'react';
import PropTypes from 'prop-types';
import trophyActive from '../img/game/lessons/trophies/trophy-active.png';
import trophyInactive from '../img/game/lessons/trophies/trophy-inactive.png';

export default class Trophies extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { status: this.props.status };
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
					<img src={this.state.status[0] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[1] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[2] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[3] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[4] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[5] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[6] ? trophyActive : trophyInactive} alt={'Трофей'} />
				</div>
				<div>
					<img src={this.state.status[7] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[8] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[9] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[10] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[11] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[12] ? trophyActive : trophyInactive} alt={'Трофей'} />
					<img src={this.state.status[13] ? trophyActive : trophyInactive} alt={'Трофей'} />
				</div>
			</div>
		);
	}
}
Trophies.propTypes = {
	status: PropTypes.arrayOf(PropTypes.bool).isRequired
};