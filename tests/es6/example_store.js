"use strict";

var Fluxxy = require('../../');

class UserStore {

    constructor(store, events) {
        this.store = store;
        events.on('User', 'add', this.add);
    }

    add() {
        //..
    }
}

module.exports = UserStore;
