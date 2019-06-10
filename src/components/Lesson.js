import React from 'react';
import PropTypes from 'prop-types';
import text from '../controllers/TextContent';

export default class Lesson extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			title: `${this.props.lessonID + 1}.${' '}
						${text.lessons[this.props.lessonID].tasks[this.props.taskID].title}`,
			topLine: '',
			bottomLine: ''
		};
		this.playSound = this.playSound.bind(this);
	}

	generateTasks() {}

	playSound() {
		import(`../sounds/${this.props.lessonID}.mp3`).then(song => {
			const sound = new Audio(song.default);
			sound.play();
		});
	}

	render() {
		// this.lessonTitle = text.lessons[this.lessonID].lessonName;
		return (
			<div className={'white-box lesson'}>
				<div className={'content'}>
					<h3>{this.state.title}</h3>
					<ul>
						<li>{this.state.topLine}</li>
						<li>{this.state.bottomLine}</li>
					</ul>
				</div>
				<nav>
					<div className={'left'}>
						<i className={'material-icons'}>skip_previous</i>
						<i className={'material-icons'}>skip_next</i>
						<i className={'material-icons'}>navigate_before</i>
						<div>
							<span className={'current-page'}>{this.state.currentPage}</span>
							<span>/</span>
							<span className={'total-pages'}>{this.state.totalPages}</span>
						</div>
						<i className={'material-icons'}>navigate_next</i>
					</div>
					<div className={'right'}>
						<i
							className={'material-icons'}
							role={'button'}
							tabIndex={'0'}
							onClick={this.playSound}
							onKeyDown={this.playSound}
						>
							record_voice_over
						</i>
					</div>
				</nav>
			</div>
		);
	}
}

Lesson.propTypes = {
	lessonID: PropTypes.number.isRequired,
	taskID: PropTypes.number.isRequired
};
