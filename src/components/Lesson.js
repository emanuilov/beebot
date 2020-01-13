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
		window.localStorage.setItem('lessonId', props.id);
	}

	render() {
		return (
			<div>
				<div className={'ribbon'}>
					<img src={ribbon} alt={'Ribbon'} />
					<h1 className={'title'}>{text.lessons[this.subjectProgress.lessonID].title}</h1>
				</div>
				<Trophies history={this.props.history} status={this.subjectProgress.trophies} />
				<Task lessonID={this.subjectProgress.lessonID} taskID={this.subjectProgress.taskID} />
			</div>
		);
	}
}

Lesson.propTypes = {
	id: PropTypes.string,
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

Lesson.defaultProps = {
	id: null
};
