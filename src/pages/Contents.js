import React from 'react';
import Container from '../components/Container';
import '../sass/contents.scss';
import text from '../controllers/TextContent';

export default class Contents extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.getContents = this.getContents.bind(this);
	}

	getContents() {
		return text.lessons.map((lesson, index) => {
			return <a href={`/Game?id=${index}`}>{lesson.lessonName}</a>;
		});
	}

	render() {
		return (
			<Container
				class={'contents'}
				content={<div className={'white-box big'}>{this.getContents()}</div>}
			/>
		);
	}
}
