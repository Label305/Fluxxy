"use strict";

var React = require('react');
var Fluxxy = require('../../');

class Comment extends React.Component {

    constructor(props) {
        super(props);
        Fluxxy.watch(['User'], this);
        this.propagateStateToSpy();
    }

    propagateStateToSpy() {
        this.props.spy(this.state);
    }

    setState(state) {
        this.state = state;
        this.propagateStateToSpy();
    }

    getStoreState() {
        return this.props.flux.store('User').getSome();
    }

    render() {
        return null;
    }
}

module.exports = Comment;