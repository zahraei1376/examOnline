import { createStore , applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import RootReducer from './root-reducer';

const middleware =[logger];
export const Store = createStore(RootReducer , applyMiddleware(...middleware));
export const Persistor = persistStore(Store);