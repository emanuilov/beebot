import React from 'react';
import PropTypes from 'prop-types';
import SubjectProgress from '../controllers/SubjectProgress';
import Lesson from './Lesson';
import Trophies from './Trophies';
import ribbon from '../img/game/ribbon.png';
import text from '../controllers/TextContent';

export default class LessonsContainer extends React.PureComponent {
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
				<Lesson lessonID={this.subjectProgress.lessonID} taskID={this.subjectProgress.taskID} />
			</div>
		);
	}
}

LessonsContainer.propTypes = {
	id: PropTypes.string
};

LessonsContainer.defaultProps = {
	id: null
};
