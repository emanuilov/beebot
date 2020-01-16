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
			title: '',
			showTask: true
		};
		this.subtasksPerPage = [[]];
		this.answersPerPage = [[]];
		this.pageCharacterLimits = { start: this.state.title.length, max: 230 };
	}

	componentDidMount() {
		this.updateTaskContent();
	}

	setTitle = () => {
		const answerTitle = text.lessons[this.props.lessonID].tasks[this.state.taskID].answers.title;
		this.setState(prevState => ({
			title: `${prevState.taskID + 1}. ${
				// eslint-disable-next-line no-nested-ternary
				prevState.showTask
					? text.lessons[this.props.lessonID].tasks[prevState.taskID].title
					: answerTitle !== undefined
					? answerTitle
					: 'Решение'
			}`
		}));
	};

	getCurrentContent(pageId, showTask) {
		if (showTask) {
			return this.subtasksPerPage[pageId].map(subtask => subtask);
		}
		return this.answersPerPage[pageId].map(subtask => subtask);
	}

	getNavigation() {
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
				{this.getSubNavigation()}
			</div>
		);
	}

	getSubNavigation() {
		return (
			<div>
				<i
					role={'button'}
					tabIndex={'0'}
					className={'material-icons'}
					onClick={this.showPrevSubPage}
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
					onClick={this.showNextSubPage}
				>
					navigate_next
				</i>
			</div>
		);
	}

	switchToAnswers = () => {
		if (!this.state.showTask) {
			this.setState(prevState => ({
				showTask: !prevState.showTask,
				totalPages: this.subtasksPerPage.length,
				currentPage: 1
			}));
		} else {
			this.setState(prevState => ({
				showTask: !prevState.showTask,
				totalPages: this.answersPerPage.length,
				currentPage: 1
			}));
		}
		this.setTitle();
	};

	updateTaskContent = () => {
		this.setTitle();
		this.generateSubPages();
	};

	generateNavigation = () => {
		if (text.lessons[this.props.lessonID].tasks.length > 1) {
			return <div className={'left'}>{this.getNavigation()}</div>;
		}
		return <div className={'left'}>{this.getSubNavigation()}</div>;
	};

	showPrevTask = () => {
		if (this.state.taskID - 1 >= 0) {
			this.setState(
				prevState => ({ taskID: prevState.taskID - 1, showTask: true }),
				() => this.updateTaskContent()
			);
		}
	};

	showNextTask = () => {
		if (this.state.taskID + 1 < text.lessons[this.props.lessonID].tasks.length) {
			this.setState(
				prevState => ({ taskID: prevState.taskID + 1, showTask: true }),
				() => this.updateTaskContent()
			);
		}
	};

	showPrevSubPage = () => {
		if (this.state.currentPage - 1 >= 1) {
			this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
		}
	};

	showNextSubPage = () => {
		if (
			this.state.currentPage < this.state.totalPages &&
			this.state.currentPage + 1 <= this.state.totalPages
		) {
			this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
		}
	};

	subTask = (soundFile, spanText) => {
		return (
			<li>
				{soundFile !== false && (
					<i
						className={'material-icons'}
						role={'button'}
						tabIndex={'0'}
						file={soundFile}
						onClick={this.playSound}
					>
						record_voice_over
					</i>
				)}

				<span className={'bullet'}>&#8226;</span>
				<span>{spanText}</span>
			</li>
		);
	};

	playSound = e => {
		if (this.taskAudio !== undefined) {
			this.taskAudio.pause();
		}
		this.taskAudio = new Audio(`/sounds/lessons/${text.lang}/${e.target.getAttribute('file')}`);
		this.taskAudio.play();
	};

	// eslint-disable-next-line no-shadow
	addSubPage = (page, text, index, isTask) => {
		const property = isTask ? 'subtasksPerPage' : 'answersPerPage';

		if (this[property][page.id].length === 2) {
			// eslint-disable-next-line no-param-reassign
			page.id += 1;
			// eslint-disable-next-line no-param-reassign
			page.length = this.pageCharacterLimits.start + text.length;
		} else if (page.length + text.length > this.pageCharacterLimits.max) {
			if (page.hasBeenChanged) {
				// eslint-disable-next-line no-param-reassign
				page.id += 1;
			}
			// eslint-disable-next-line no-param-reassign
			page.length = this.pageCharacterLimits.start + text.length;
			// eslint-disable-next-line no-param-reassign
			page.hasBeenChanged = true;
		} else {
			// eslint-disable-next-line no-param-reassign
			page.length += text.length;
		}
		if (this[property][page.id] === undefined) {
			this[property][page.id] = [];
		}
		this[property][page.id].push(
			this.subTask(
				isTask ? `${this.props.lessonID + 1}.${this.state.taskID + 1}.${index + 1}.ogg` : false,
				text
			)
		);
		return page;
	};

	generateSubPages() {
		if (text.lessons[this.props.lessonID].tasks[this.state.taskID].text !== undefined) {
			let subTaskPage = {
				id: 0,
				length: this.pageCharacterLimits.start,
				hasBeenChanged: false
			};
			text.lessons[this.props.lessonID].tasks[this.state.taskID].text.forEach((taskText, index) => {
				subTaskPage = this.addSubPage(subTaskPage, taskText, index, true);
			});
		}
		if (text.lessons[this.props.lessonID].tasks[this.state.taskID].answers.content !== undefined) {
			let answersPage = {
				id: 0,
				length: this.pageCharacterLimits.start,
				hasBeenChanged: false
			};
			text.lessons[this.props.lessonID].tasks[this.state.taskID].answers.content.forEach(
				(answerText, index) => {
					answersPage = this.addSubPage(answersPage, answerText, index, false);
				}
			);
		}
		this.setState({ currentPage: 1 });
		this.setState({ totalPages: this.subtasksPerPage.length });
		this.forceUpdate();
	}

	render() {
		return (
			<div className={'white-box lesson'}>
				<div className={'content'}>
					<h3 className={this.state.showTask ? '' : 'answer'}>{this.state.title}</h3>
					<ul>{this.getCurrentContent(this.state.currentPage - 1, this.state.showTask)}</ul>
				</div>
				<nav>
					{this.generateNavigation()}
					<div className={'right'}>
						<i
							className={'material-icons'}
							role={'button'}
							tabIndex={'0'}
							onClick={this.switchToAnswers}
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
