import React from 'react';
import PropTypes from 'prop-types';
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
			return (
				<div
					role={'button'}
					tabIndex={'0'}
					className={'pointer item'}
					onClick={() => this.props.history.push(`/Game?id=${index}`)}
				>{`${index + 1}. ${lesson.title}`}</div>
			);
		});
	}

	render() {
		return (
			<Container
				class={'contents'}
				history={this.props.history}
				content={
					<div className={'white-box big'}>
						<div
							className={'homeButton pointer'}
							role={'button'}
							tabIndex={'0'}
							onClick={() => this.props.history.push('/Home')}
						>
							<i className={'material-icons'}>home</i>
						</div>
						{this.getContents()}
					</div>
				}
			/>
		);
	}
}

Contents.propTypes = {
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
