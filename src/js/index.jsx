import React from "react";
import ReactDOM from "react-dom";

class HomeScreen {
	constructor() {
		this.header();
		this.footer();
	}

	header() {
		ReactDOM.render(
			<header>
				Test
			</header>,
			document.getElementById("container")
		);
	}

	footer() {
		ReactDOM.render(
			<footer>
				<div className="left">Безопасност на движението по пътищата © Иновации и Консултиране</div>
				<div className="right">За играта • Контакти • Поверителност и условия</div>
			</footer>,
			document.getElementById("container")
		);
	}
}

new HomeScreen();