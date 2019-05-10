import React from 'react';
import LessonData from '../controllers/LessonData';
import Lesson from './Lesson';
import Trophies from './Trophies';

export default class LessonsContainer extends React.PureComponent {
	constructor(props) {
		super(props);
		this.lessonData = new LessonData();
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
