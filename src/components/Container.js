import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import title from '../img/home/title.png';
import cityLeft from '../img/home/city-left.png';
import cityRight from '../img/home/city-right.png';
import '../sass/container.scss';

const Container = props => {
	return (
		<div className={`box-container main ${props.class}`}>
			<div
				className={'title pointer'}
				role={'button'}
				tabIndex={'0'}
				onClick={() => props.history.push('/index.html')}
			>
				<img src={title} alt={'Заглавие'} />
			</div>
			<div className={'city'}>
				<img src={cityLeft} alt={'Град'} />
				{props.content}
				<img src={cityRight} alt={'Град'} />
			</div>

			<Footer history={props.history} />
		</div>
	);
};
Container.propTypes = {
	class: PropTypes.node.isRequired,
	content: PropTypes.node.isRequired,
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

export default Container;
