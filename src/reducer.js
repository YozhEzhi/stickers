import {ADD, DISABLE} from './consts';

const stickers = (state = [], action) => {
    const {payload = {}} = action;
    const {id} = payload;

    switch (action.type) {
        case ADD:
            return [...state, payload];

        case DISABLE:
            const items = state.filter(item => item.id !== id);
            return [...items];

        default:
            return state;
    }
};

export default stickers;
