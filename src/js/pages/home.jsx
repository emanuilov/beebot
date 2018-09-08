import React from 'react';
// import ReactDOM from 'react-dom';

class HomeScreen {
	render() {
		this.header();
		this.footer();
	}

	header() {
		return (
			<header>
				Test
			</header> ,
			document.getElementById('container')
		);
	}

	footer() {
		return (
			<footer>
				<div className='left'>Безопасност на движението по пътищата © Иновации и Консултиране</div>
				<div className='right'>За играта • Контакти • Поверителност и условия</div>
			</footer> ,
			document.getElementById('container')
		);
	}
}

new HomeScreen();