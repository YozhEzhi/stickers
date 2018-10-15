import {ADD, DISABLE, ENABLE, SET_ORDER} from './consts';

export const addSticker = (text, color) => dispatch => dispatch({
    type: ADD,
    payload: {
        color,
        date: new Date().toLocaleString(),
        id: Math.random().toString(36).substr(2, 5),
        name: 'YozhEzhi',
        text,
    },
});

export const removeSticker = id => dispatch => dispatch({
    type: DISABLE,
    payload: {id},
});

export const restoreSticker = id => dispatch => dispatch({
    type: ENABLE,
    payload: {id},
});

export const updateStickersOrder = sortedIds => dispatch => dispatch({
    type: SET_ORDER,
    payload: {sortedIds},
});
