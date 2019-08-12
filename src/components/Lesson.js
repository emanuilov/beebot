import React from 'react';
import PropTypes from 'prop-types';
import SubjectProgress from '../controllers/SubjectProgress';
import Task from './Task';
import Trophies from './Trophies';
import ribbon from '../img/game/ribbon.png';
import text from '../controllers/TextContent';

export default class Lesson extends React.Component {
	constructor(props) {
		super(props);
		this.subjectProgress = new SubjectProgress(props.id);
	}

	render() {
		return (
			<div>
				<div className={'ribbon'}>
					<img src={ribbon} alt={'Ribbon'} />
					<h1 className={'title'}>{text.lessons[this.subjectProgress.lessonID].title}</h1>
				</div>
				<Trophies status={this.subjectProgress.trophies} />
				<Task lessonID={this.subjectProgress.lessonID} taskID={this.subjectProgress.taskID} />
			</div>
		);
	}
}

Lesson.propTypes = {
	id: PropTypes.string
};

Lesson.defaultProps = {
	id: null
};
