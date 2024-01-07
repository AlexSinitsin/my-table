import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { save, load } from 'redux-localstorage-simple';

const createStoreWithMiddleware = compose(applyMiddleware(save({ namespace: 'my_app' })))(
  createStore
);

const store = createStoreWithMiddleware(rootReducer, load({ namespace: 'my_app' }));

export default store;
