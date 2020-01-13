import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SecondaryLocation from './SecondaryLocation';
import Home from './pages/Home';
import Game from './pages/Game';
import Contents from './pages/Contents';
import Contacts from './pages/Contacts';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import InitialLocation from './InitialLocation';
import Activation from './pages/Activation';

const history = createBrowserHistory();

export default () => {
	return (
		<Router history={history}>
			<Route path={'/Home'}>
				<Home history={history} />
			</Route>
			<Route path={'/Game'}>
				<Game history={history} />
			</Route>
			<Route path={'/Contents'}>
				<Contents history={history} />
			</Route>
			<Route path={'/Contacts'}>
				<Contacts history={history} />
			</Route>
			<Route path={'/Terms'}>
				<Terms history={history} />
			</Route>
			<Route path={'/Privacy'}>
				<Privacy history={history} />
			</Route>
			<Route path={'/Activation'}>
				<Activation history={history} />
			</Route>
			<Route path={'/SecondaryLocation'}>
				<SecondaryLocation />
			</Route>
			<Route path={'/index.html'}>
				<InitialLocation />
			</Route>
			<Route exact path={'/'}>
				<InitialLocation />
			</Route>
		</Router>
	);
};
