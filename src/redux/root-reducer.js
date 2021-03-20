import { combineReducers } from 'redux';
import ToggleReducer from './toggleQuesion/toggleQuestion.reducer';

export const RootReducer =combineReducers({
    toggle:ToggleReducer
});