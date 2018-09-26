import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import 'react-notifications/lib/notifications.css';

import StickerList from './StickerList';
import * as actions from '../../actions';

function StickersWrapper(props) {
    const {
        addSticker,
        removeSticker,
        restoreSticker,
        stickers,
        updateStickersOrder,
    } = props;

    return (
        <div className="stickers">
            <StickerList
                addSticker={addSticker}
                removeSticker={removeSticker}
                restoreSticker={restoreSticker}
                stickers={stickers}
                updateStickersOrder={updateStickersOrder}
            />
        </div>
    );
}

StickersWrapper.propTypes = {
    addSticker: PropTypes.func.isRequired,
    updateStickersOrder: PropTypes.func.isRequired,
    removeSticker: PropTypes.func.isRequired,
    restoreSticker: PropTypes.func.isRequired,
    stickers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (stickers) => ({stickers});
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StickersWrapper);
