var Mixin = require('./mixin');

var Flux = function (fluxxy) {

    /**
     * Callbacks that listen to changes in stores
     * @type {Array}
     */
    var storeCallbacks = [];

    /**
     * Register a new listener on a store
     * @param store
     * @param callback
     * @param context
     */
    this.onStoreChange = function (store, callback, context) {
        storeCallbacks.push({
            store: store,
            callback: callback,
            context: context
        });
    };

    /**
     * Returns the Mixin that allows for watching
     * @param stores
     */
    this.watch = function (stores) {
        var mixin = new Mixin(fluxxy.flux(), stores);
        mixin.stores = stores;
        return mixin;
    };

    /**
     * A notification about which store changed
     * @param store
     */
    this._changed = function (store) {
        for (var i in storeCallbacks) {
            if (storeCallbacks[i].store == store) {
                storeCallbacks[i].callback.apply(storeCallbacks[i].context);
            }
        }
    };

    /**
     * Alias for fluxxy.store
     */
    this.store = function () {
        return fluxxy.store(arguments[0], arguments[1]);
    };

    /**
     * Alias for fluxxy.command
     */
    this.command = function () {
        return fluxxy.command(arguments[0], arguments[1]);
    };
};

module.exports = Flux;