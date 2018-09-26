import PropTypes from 'prop-types';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Stickers from 'components/Stickers';

class App extends React.Component {
    render() {
        return <Stickers />;
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

const Connected = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
export {Connected as App};
