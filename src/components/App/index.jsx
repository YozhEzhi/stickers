import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Stickers from 'components/Stickers';
import Icons from 'components/Icons';

class App extends React.Component {
  render() {
    return (
      <main>
        <Icons />
        <Stickers />
        <section className="content" id="content">
          {this.props.children}
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
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

const Connected = connect(mapStateToProps, mapDispatchToProps)(App);
export {Connected as App};
