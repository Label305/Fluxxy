var Mixin = require('./mixin');

var Flux = function (flexFlux) {

    /**
     * Returns the Mixin that allows for watching
     * @param stores
     */
    this.watch = function (stores) {
        var mixin = new Mixin();
        mixin.stores = stores;
        return mixin;
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