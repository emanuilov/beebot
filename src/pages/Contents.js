import React from 'react';
import Container from '../components/Container';
import '../sass/contents.scss';
import text from '../controllers/TextContent';

export default class Contents extends React.Component {
	constructor(props) {
		super(props);
		this.getContents = this.getContents.bind(this);
	}

	getContents() {
		return text.lessons.map((lesson, index) => {
			return <a href={`/Game?id=${index}`}>{`${index + 1}. ${lesson.title}`}</a>;
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
