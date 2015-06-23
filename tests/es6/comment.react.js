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

    getStoreState() {
        return {
            foo: 'bla'
        }
    }

    componentDidUpdate() {
        var state = {
            foo: 'blub'
        };
        this.props.spy(state);
    }

    render() {
        return null;
    }
}

module.exports = Comment;