import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import consultaReducer from './consultaReducer';

export default combineReducers({
    form: formReducer,
    consulta: consultaReducer,
});