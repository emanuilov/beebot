import React from 'react';
import PropTypes from 'prop-types';
import text from '../controllers/TextContent';

export default class Lesson extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			totalPages: 1,
			taskID: props.taskID,
			title: ''
		};
		this.playSound = this.playSound.bind(this);
		this.subTask = this.subTask.bind(this);
		this.getItems = this.getItems.bind(this);
	}

	componentDidMount() {
		this.setTaskTitle();
	}

	setTaskTitle = () => {
		this.setState(prevState => ({
			title: `${prevState.taskID + 1}. ${
				text.lessons[this.props.lessonID].tasks[prevState.taskID].title
			}`
		}));
	};

	getItems(taskID, pageID) {
		// text.lessons[this.props.lessonID].tasks.length;
	}

	separateIntoPages = () => {};

	generateNavigation = () => {
		if (text.lessons[this.props.lessonID].tasks.length > 1) {
			return (
				<div className={'left'}>
					<i
						role={'button'}
						tabIndex={'0'}
						className={'material-icons'}
						onClick={this.showPrevPart}
					>
						skip_previous
					</i>
					<i
						role={'button'}
						tabIndex={'0'}
						className={'material-icons next'}
						onClick={this.showNextPart}
					>
						skip_next
					</i>
					<i
						role={'button'}
						tabIndex={'0'}
						className={'material-icons'}
						onClick={this.showPrevSubPart}
					>
						navigate_before
					</i>
					<div>
						<span className={'current-page'}>{this.state.currentPage}</span>
						<span>/</span>
						<span className={'total-pages'}>{this.state.totalPages}</span>
					</div>
					<i
						role={'button'}
						tabIndex={'0'}
						className={'material-icons'}
						onClick={this.showNextSubPart}
					>
						navigate_next
					</i>
				</div>
			);
		}
		return (
			<div className={'left'}>
				<i
					role={'button'}
					tabIndex={'0'}
					className={'material-icons'}
					onClick={this.showPrevSubPart}
				>
					navigate_before
				</i>
				<div>
					<span className={'current-page'}>{this.state.currentPage}</span>
					<span>/</span>
					<span className={'total-pages'}>{this.state.totalPages}</span>
				</div>
				<i
					role={'button'}
					tabIndex={'0'}
					className={'material-icons'}
					onClick={this.showNextSubPart}
				>
					navigate_next
				</i>
			</div>
		);
	};

	goToPrevPart = () => {
		if (this.state.taskID - 1 >= 0) {
			this.setState(prevState => ({ taskID: prevState.taskID - 1 }));
		}
	};

	goToNextPart = () => {
		if (this.state.taskID + 1 < text.lessons[this.props.lessonID].length) {
			this.setState(prevState => ({ taskID: prevState.taskID + 1 }));
		}
	};

	goToPrevSubPart = () => {
		if (this.state.currentPage - 1 >= 1) {
			this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
		}
	};

	goToNextSubPart = () => {
		if (
			this.state.currentPage < this.state.totalPages &&
			this.state.currentPage + 1 <= this.state.totalPages
		) {
			this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
		}
	};

	subTask(soundFile, spanText) {
		return (
			<li>
				<i
					className={'material-icons'}
					role={'button'}
					tabIndex={'0'}
					file={soundFile}
					onClick={this.playSound}
				>
					record_voice_over
				</i>
				<span className={'bullet'}>&#8226;</span>
				<span>{spanText}</span>
			</li>
		);
	}

	playSound(e) {
		const sound = new Audio(`/sounds/lessons/${text.lang}/${e.target.getAttribute('file')}`);
		sound.play();
	}

	render() {
		return (
			<div className={'white-box lesson'}>
				<div className={'content'}>
					<h3>{this.state.title}</h3>
					<ul>{this.getItems(this.state.taskID, this.state.pageID)}</ul>
				</div>
				<nav>
					{this.generateNavigation()}
					<div className={'right'}>
						<i
							className={'material-icons'}
							role={'button'}
							tabIndex={'0'}
							onClick={this.showAnswers}
						>
							check
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
