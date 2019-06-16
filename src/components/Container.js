import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import title from '../img/home/title.png';
import cityLeft from '../img/home/city-left.png';
import cityRight from '../img/home/city-right.png';
import '../sass/container.scss';

export default class Container extends React.PureComponent {
	render() {
		return (
			<div className={`box-container main ${this.props.class}`}>
				<div className={'title'}>
					<img src={title} alt={'Заглавие'} />
				</div>
				<div className={'city'}>
					<img src={cityLeft} alt={'Град'} />
					{this.props.content}
					<img src={cityRight} alt={'Град'} />
				</div>

				<Footer />
			</div>
		);
	}
}
Container.propTypes = {
	class: PropTypes.node.isRequired,
	content: PropTypes.node.isRequired
};
