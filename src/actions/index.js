import { 
    BUSQUEDA,
    MENU,
    ROWSELECT,
    NAMEFORM,
} from './types';

export const Buscar = (busqueda) => {
    return {
        type: BUSQUEDA,
        payload: busqueda
    };
};
export const VerMenu = (menu) => {
    return {
        type: MENU,
        payload: menu
    };
};

export const selectRow = (row) => {
    return {
        type: ROWSELECT,
        payload: row
    };
};

export const nameForm = (nameF) => {
    return {
        type: NAMEFORM,
        payload: nameF
    };
};
