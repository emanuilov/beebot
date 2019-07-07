import React from 'react';
import ReactDOM from 'react-dom';
import { useRoutes } from 'hookrouter';
import routes from './Router';
import * as serviceWorker from './serviceWorker';
import './sass/main.scss';

import(`./sounds/background.mp3`).then(song => {
	window.music = new Audio(song.default);
	window.music.loop = true;
	// window.music.play();
});

function App() {
	return useRoutes(routes);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
