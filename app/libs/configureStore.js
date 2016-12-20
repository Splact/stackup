import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localforage';
import filter from 'redux-storage-decorator-filter';
import debounce from 'redux-storage-decorator-debounce';

import config from '../config';
import rootReducer from '../reducers/root';
import rootSaga from '../sagas/root';
import sagaMonitor from './sagaMonitor';

export default function configureStore(initialState) {
  const isProd = process.env.NODE_ENV === 'production';
  const windowDevToolsExtention =
    (!isProd && window.devToolsExtension) ? window.devToolsExtension() : f => f;

  const sagaOptions = config.isDev ? { sagaMonitor } : {};
  const sagaMiddleware = createSagaMiddleware(sagaOptions);

  // Setup storage engine and middleware
  const engine = createEngine(config.storage.key, config.storage.options);
  const filteredEngine = filter(engine, config.storage.whitelist, config.storage.blacklist);
  const debouncedfilteredEngine = debounce(filteredEngine, config.storage.debounceTime);
  // ISSUE: redux-storage doesn't intercept actions fired by redux-saga
  const storageMiddleware = storage.createMiddleware(debouncedfilteredEngine);
  const load = storage.createLoader(debouncedfilteredEngine);

  // Wrap rootReducer to let operate on storage
  const persistReducer = storage.reducer(rootReducer);

  const store = createStore(
    persistReducer,
    initialState,
    compose(
      applyMiddleware(
        storageMiddleware,
        sagaMiddleware
      ),
      windowDevToolsExtention
    )
  );

  sagaMiddleware.run(rootSaga);

  // Load from storage on page load
  load(store).catch(() => console.warn('Failed to load previous state from storage'));

  return store;
}
