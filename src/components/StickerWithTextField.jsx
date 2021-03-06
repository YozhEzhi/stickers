import PropTypes from 'prop-types';
import React from 'react';

export default class StickerWithTextField extends React.Component {
    constructor(props) {
        super(props);
        this.textareaValue = '';
    }

    componentDidMount() {
        this.textareaRef.focus();
    }

    handleAddSticker = () => {
        if (!this.textareaValue) return;
        const { addSticker, resetState, selectedColor } = this.props;
        addSticker(this.textareaValue, selectedColor);
        resetState();
    };

    handleChange = ({ target: { value } }) => {
        const saveBtn = document.querySelector('.js-save-sticker');
        this.textareaValue = value;

        if (value) {
            saveBtn.classList.remove('disabled');
        } else {
            saveBtn.classList.add('disabled');
        }
    };

    render() {
        return (
            <div className="sticker sticker_new">
                <div
                    className="sticker__inner sticker__inner_new js-sticker-new"
                    style={{ backgroundColor: this.props.selectedColor }}
                >
                    <textarea
                        className="sticker__content sticker__content_textarea"
                        onChange={this.handleChange}
                        placeholder="О чем вы хотели не забыть..."
                        ref={node => { this.textareaRef = node }}
                    />

                    <div className="sticker__footer">
                        <div
                            className="sticker__footer-item sticker__footer_left"
                            onClick={() => this.props.backToColor(this.props.selectedColor)}
                        >Назад</div>

                        <div
                            className="sticker__footer-item sticker__footer_right disabled js-save-sticker"
                            onClick={this.handleAddSticker}
                        >Сохранить</div>
                    </div>
                </div>
            </div>
        );
    }
}

StickerWithTextField.propTypes = {
    addSticker: PropTypes.func.isRequired,
    backToColor: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    selectedColor: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]).isRequired,
};
