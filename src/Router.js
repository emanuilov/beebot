import React from 'react';
import Home from './pages/Home';
import Game from './pages/Game';
import Contents from './pages/Contents';
import Contacts from './pages/Contacts';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import InitialLocation from './InitialLocation';
import Activation from './pages/Activation';

export default {
	'/Home': () => <Home />,
	'/Game': () => <Game />,
	'/Contents': () => <Contents />,
	'/Contacts': () => <Contacts />,
	'/Terms': () => <Terms />,
	'/Privacy': () => <Privacy />,
	'/Activation': () => <Activation />,
	'/': () => <InitialLocation />
};
