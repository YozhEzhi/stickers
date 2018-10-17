import PropTypes from 'prop-types';
import React from 'react';

import Icon from 'components/Icon';

export default function Sticker(props) {
    const {
        date,
        dragHandle,
        id,
        name,
        text,
        color,
        removeSticker,
    } = props;

    return (
        <div
            className="sticker__inner"
            style={color && {backgroundColor: color}}
        >
            <div className="sticker__header clear">
                <div className="sticker__name">{name}</div>
                <div className="sticker__time">{date}</div>
            </div>

            <div className="sticker__header sticker__header-slide clear">
                {dragHandle}

                <div
                    className="sticker__trigger_remove"
                    onClick={() => removeSticker(id, text)}
                    title="Снять стикер"
                >
                    <Icon icon="close" width="19" height="19" />
                </div>
            </div>
            <div className="sticker__content">{text}</div>
        </div>
    );
}

Sticker.propTypes = {
    date: PropTypes.string.isRequired,
    dragHandle: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    removeSticker: PropTypes.func.isRequired,
};
