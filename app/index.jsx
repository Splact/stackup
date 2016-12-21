import '../index.html';
import './styles/app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { I18nextProvider } from 'react-i18next';

import i18n from './libs/i18n';
import configureStore from './libs/configureStore';

import App from './components/App';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router history={browserHistory}>
        <Route path={BASE_PATH || '/'} component={App}>
          <IndexRoute name="dashboard" component={Dashboard} />

          {/* Insert your routes here */}

          {/* Leave "not found" as last route */}
          <Route path="/:wrongPath" component={NotFound} />
        </Route>
      </Router>
    </I18nextProvider>
  </Provider>
), document.getElementById('root'));
