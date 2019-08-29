import {
    BUSQUEDA,
    MENU,
    ROWSELECT,
    NAMEFORM,
} from '../actions/types';

const INITIAL_STATE = {
    busqueda: null,
    menu: false,
    row: null,
    nameF: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUSQUEDA:
            return { ...state, busqueda: action.payload };
        case MENU:
            return { ...state, menu: action.payload };
        case ROWSELECT:
            return { ...state, row: action.payload };
        case NAMEFORM:
            return { ...state, nameF: action.payload };
        default:
            return state;
    }
};