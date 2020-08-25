import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/App';
import Currencystore from './stores/Currencystore';

const rootID = document.getElementById('root');

const Root = (
	<Provider Currencystore={Currencystore}>
		<App />
	</Provider>
);

if (typeof rootID !== 'undefined' && rootID != null) {
	ReactDOM.render(Root, rootID);
}
