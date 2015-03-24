var Mixin = require('./mixin');

var Flux = function (flexFlux) {

    /**
     * All mixins
     * @type {Array}
     */
    var mixins = [];

    /**
     *
     * @param mixin
     * @param store
     * @return boolean
     */
    function listensOnStore(mixin, store) {
        for (var i in mixin.stores) {
            if (mixin.stores[i] == store) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the Mixin that allows for watching
     * @param stores
     */
    this.watch = function (stores) {
        var mixin = new Mixin();
        mixin.stores = stores;
        mixins.push(mixin);
        return mixin;
    };

    /**
     * A notification about which store changed
     * @param store
     */
    this._changed = function (store) {
        for (var i in mixins) {
            if (listensOnStore(mixins[i], store)) {
                mixins[i].updateStateUsingFlux();
            }
        }
    };

    /**
     * Alias for flexFlux.store
     */
    this.store = function () {
        return flexFlux.store(arguments[0], arguments[1]);
    };

    /**
     * Alias for flexFlux.command
     */
    this.command = function () {
        return flexFlux.command(arguments[0], arguments[1]);
    };
};

module.exports = Flux;