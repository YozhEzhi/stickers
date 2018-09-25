import React from 'react';
import 'react-notifications/lib/notifications.css';
import StickersContainer from './Stickers/StickersContainer';

export default function Header() {
  return (
    <header className="header js-header" id="header">
      <div className="container clear">
        <StickersContainer />
      </div>
    </header>
  );
}
