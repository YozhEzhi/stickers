import PropTypes from 'prop-types';
import React from 'react';

import Header from 'components/Header';
import Icons from 'components/Icons';

export default class App extends React.Component {
  render() {
    return (
      <main>
        <Icons />
        <Header />
        <section className="content" id="content">
          {this.props.children}
        </section>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

App.defaultProps = {
  children: null,
};
