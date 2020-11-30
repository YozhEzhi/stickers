import { ADD, DISABLE, ENABLE } from './consts';

const stickers = (state = [], action) => {
    const { payload = {} } = action;
    const { id } = payload;

    switch (action.type) {
        case ADD:
            return [...state, payload];

        case ENABLE:
            const withEnabled = state.map(item => {
                if (item.id === id) {
                    item.enabled = true;
                }
                return item;
            });
            return [...withEnabled];

        case DISABLE:
            const withDisabled = state.map(item => {
                if (item.id === id) {
                    item.enabled = false;
                }
                return item;
            });
            return [...withDisabled];

        default:
            return state;
    }
};

export default stickers;
