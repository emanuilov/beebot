import React from 'react';
import PropTypes from 'prop-types';
import LessonData from '../controllers/LessonData';
import Lesson from './Lesson';
import Trophies from './Trophies';

export default class LessonsContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.lessonData = new LessonData(props.id);
		this.lesson = React.createRef();
		this.trophies = React.createRef();
	}

	render() {
		return (
			<div>
				<Trophies status={this.lessonData.trophies} ref={this.trophies} />
				<Lesson
					lessonID={this.lessonData.lessonID}
					taskID={this.lessonData.taskID}
					ref={this.lesson}
				/>
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
