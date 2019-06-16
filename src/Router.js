import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Terms from './pages/Terms';
import InitialLocation from './InitialLocation';
import Activation from './pages/Activation';
import './sass/main.scss';

const App = () => {
	// getStartLocation();
	return (
		<BrowserRouter>
			<Switch>
				<Route path={'/Home'} component={Home} />
				<Route path={'/Game'} component={Game} />
				<Route path={'/About'} component={About} />
				<Route path={'/Contacts'} component={Contacts} />
				<Route path={'/Terms'} component={Terms} />
				<Route path={'/Activation'} component={Activation} />
				<Route path={'/'} component={InitialLocation} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
