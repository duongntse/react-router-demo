import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-snapshot';
import Root from './Root';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

// const { run } = require('react-snap');

// async () =>
// 	await run({
// 		// You would have other args here,
// 		puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
// 	})();

const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
// 	ReactDOM.hydrate(<Root />, rootElement);
// } else {
// 	ReactDOM.render(<Root />, rootElement);
// }
ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
