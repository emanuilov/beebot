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
		this.subtasksPerPage = [[]];
		this.pageCharacterLimits = { start: this.state.title.length, max: 230 };
		this.setTaskTitle = this.setTaskTitle.bind(this);
		this.generateNavigation = this.generateNavigation.bind(this);
		this.showPrevTask = this.showPrevTask.bind(this);
		this.showNextTask = this.showNextTask.bind(this);
		this.showPrevSubTasksPage = this.showPrevSubTasksPage.bind(this);
		this.showNextSubTasksPage = this.showNextSubTasksPage.bind(this);
		this.playSound = this.playSound.bind(this);
		this.subTask = this.subTask.bind(this);
		this.updateTaskContent = this.updateTaskContent.bind(this);
	}

	componentDidMount() {
		this.updateTaskContent();
	}

	setTaskTitle() {
		this.setState(prevState => ({
			title: `${prevState.taskID + 1}. ${
				text.lessons[this.props.lessonID].tasks[prevState.taskID].title
			}`
		}));
	}

	getCurrentSubtasks(pageId) {
		return this.subtasksPerPage[pageId].map(subtask => subtask);
	}

	getWholeNavigation() {
		return (
			<div>
				<i role={'button'} tabIndex={'0'} className={'material-icons'} onClick={this.showPrevTask}>
					skip_previous
				</i>
				<i
					role={'button'}
					tabIndex={'0'}
					className={'material-icons next'}
					onClick={this.showNextTask}
				>
					skip_next
				</i>
				{this.getSubtasksNavigation()}
			</div>
		);
	}

	getSubtasksNavigation() {
		return (
			<div>
				<i
					role={'button'}
					tabIndex={'0'}
					className={'material-icons'}
					onClick={this.showPrevSubTasksPage}
				>
					navigate_before
				</i>
				<div className={'pageStats'}>
					<span className={'current-page'}>{this.state.currentPage}</span>
					<span>/</span>
					<span className={'total-pages'}>{this.state.totalPages}</span>
				</div>
				<i
					role={'button'}
					tabIndex={'0'}
					className={'material-icons'}
					onClick={this.showNextSubTasksPage}
				>
					navigate_next
				</i>
			</div>
		);
	}

	updateTaskContent() {
		this.setTaskTitle();
		this.generateSubtaskPages();
	}

	generateNavigation() {
		if (text.lessons[this.props.lessonID].tasks.length > 1) {
			return <div className={'left'}>{this.getWholeNavigation()}</div>;
		}
		return <div className={'left'}>{this.getSubtasksNavigation()}</div>;
	}

	showPrevTask() {
		if (this.state.taskID - 1 >= 0) {
			this.setState(
				prevState => ({ taskID: prevState.taskID - 1 }),
				() => this.updateTaskContent()
			);
		}
	}

	showNextTask() {
		if (this.state.taskID + 1 < text.lessons[this.props.lessonID].tasks.length) {
			this.setState(
				prevState => ({ taskID: prevState.taskID + 1 }),
				() => this.updateTaskContent()
			);
		}
	}

	showPrevSubTasksPage() {
		if (this.state.currentPage - 1 >= 1) {
			this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
		}
	}

	showNextSubTasksPage() {
		if (
			this.state.currentPage < this.state.totalPages &&
			this.state.currentPage + 1 <= this.state.totalPages
		) {
			this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
		}
	}

	generateSubtaskPages() {
		let pageId = 0;
		let pageLength = this.pageCharacterLimits.start;
		if (text.lessons[this.props.lessonID].tasks[this.state.taskID].text !== undefined) {
			text.lessons[this.props.lessonID].tasks[this.state.taskID].text.forEach((taskText, index) => {
				if (this.subtasksPerPage[pageId].length === 2) {
					pageId += 1;
					pageLength = this.pageCharacterLimits.start + taskText.length;
				} else if (pageLength + taskText.length > this.pageCharacterLimits.max) {
					pageId += 1;
					pageLength = this.pageCharacterLimits.start + taskText.length;
				} else {
					pageLength += taskText.length;
				}
				if (this.subtasksPerPage[pageId] === undefined) {
					this.subtasksPerPage[pageId] = [];
				}
				this.subtasksPerPage[pageId].push(
					this.subTask(
						`${this.props.lessonID + 1}.${this.state.taskID + 1}.${index + 1}.ogg`,
						taskText
					)
				);
			});
			this.setState({ currentPage: 1 });
			this.setState({ totalPages: this.subtasksPerPage.length });
			this.forceUpdate();
		}
	}

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
		if (this.taskAudio !== undefined) {
			this.taskAudio.pause();
		}
		this.taskAudio = new Audio(`/sounds/lessons/${text.lang}/${e.target.getAttribute('file')}`);
		this.taskAudio.play();
	}

	render() {
		return (
			<div className={'white-box lesson'}>
				<div className={'content'}>
					<h3>{this.state.title}</h3>
					<ul>{this.getCurrentSubtasks(this.state.currentPage - 1)}</ul>
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
