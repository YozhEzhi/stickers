import PropTypes from 'prop-types';
import React from 'react';
import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

import Icon from 'components/Icon';
import Sticker from './Sticker';
import StickerNew from './StickerNew';

const NOTIFICATION_DISMIS_DELAY = 5000;
const DragHandle = SortableHandle(() => (
    <div className="drag-handler">
        <Icon icon="menu" width="20" height="17" />
    </div>
));
const SortableItem = SortableElement(({ value }) => <li className="sticker">{value}</li>);
const SortableList = SortableContainer(({ items }) => (
    <ul>
        {items.map((value, index) => (
            <SortableItem
                className="sortable-item"
                index={index}
                key={index}
                value={value}
            />
        ))}
    </ul>
));

export default class Stickers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: OrderedSet(),
            stickers: props.stickers || [],
        };
        this.count = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ stickers: nextProps.stickers });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(
            { stickers: arrayMove(this.state.stickers, oldIndex, newIndex) },
            this.updateStickersOrderOnServer,
        );
    };

    /**
     * Restores last 'removed' sticker's active param.
     */
    updateStickersOrderOnServer = () => {
        const ids = this.state.stickers.map(item => item.id);
        this.props.updateStickersOrder(ids);
    };

    /**
     * Restores last 'removed' sticker's active param.
     */
    handleRestoreSticker = id => {
        const { notifications } = this.state;
        this.setState({ notifications: notifications.filter(item => item.key !== id) });
        this.props.restoreSticker(id);
    };

    notificationText = text => (
        <span>
            Стикер снят{' '}
            <span className="notification-sticker-text">{text}</span>
        </span>
    );

    /**
     * Adds new notification in notifications Set.
     * @param id - number - id of Sticker to remove
     * @param text - string - text value of sticker
     */
    addNotification = (id, text) => {
        const { notifications } = this.state;
        this.count += 1;

        return this.setState({
            notifications: notifications.add({
                action: 'Восстановить',
                dismissAfter: NOTIFICATION_DISMIS_DELAY,
                key: `notification-${this.count}`,
                message: this.notificationText(text),
                onClick: () => this.handleRestoreSticker(id),
            }),
        });
    };

    /**
     * Deletes last notification from notifications Set.
     * @param notification - object
     */
    handleNotificationDismiss = notification =>
        this.setState({ notifications: this.state.notifications.delete(notification) });

    /**
     * Set non active param for sticker.
     * Shows notification with ability to restore sticker.
     * @param id - number - ID.
     * @param text - string - Text value.
     */
    handleRemoveSticker = (id, text) => {
        this.addNotification(id, text);
        this.props.removeSticker(id);
    };

    renderStickers = () =>
        this.state.stickers
            .filter(item => item.enabled)
            .map((item, index) => (
                <Sticker
                    dragHandle={<DragHandle />}
                    key={index}
                    removeSticker={this.handleRemoveSticker}
                    {...item}
                />
            ));

    render() {
        const { addSticker } = this.props;
        const { notifications, stickers } = this.state;

        return (
            <div
                className="stickers__overlay"
                ref={node => this.stickersRef = node}
            >
                {stickers.length && (
                    <SortableList
                        axis={'xy'}
                        helperClass="sortable-helper"
                        items={this.renderStickers()}
                        onSortEnd={this.onSortEnd}
                        transitionDuration={500}
                        useDragHandle
                    />
                )}

                <StickerNew addSticker={addSticker} />

                <NotificationStack
                    notifications={notifications.toArray()}
                    onDismiss={instance => this.handleNotificationDismiss(instance)}
                />
            </div>
        );
    }
}

Stickers.propTypes = {
    addSticker: PropTypes.func.isRequired,
    updateStickersOrder: PropTypes.func.isRequired,
    removeSticker: PropTypes.func.isRequired,
    restoreSticker: PropTypes.func.isRequired,
    stickers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
