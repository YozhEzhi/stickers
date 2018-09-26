import {SET_STICKERS} from './consts';

const stickers = (state = [], action) => {
    switch (action.type) {
        case SET_STICKERS:
            return {
                ...state,
                stickers: action.payload,
            };

        default:
            return state;
    }
};

export default stickers;
