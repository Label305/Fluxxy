var Flux = require('./lib/flux'),
    CommandHub = require('./lib/command_hub'),
    EventHub = require('./lib/event_hub'),
    StoreHub = require('./lib/store_hub'),
    Mixin = require('./lib/mixin');

var Fluxxy = function () {

    /**
     * Here all Fluxxy logic happens, to couple Stores with React
     * @type Flux
     */
    this.Flux = new Flux(this);

    /**
     * Place for events
     * @type EventHub
     */
    this.EventHub = new EventHub();

    /**
     * Place for command collections
     * @type CommandHub
     */
    this.CommandHub = new CommandHub(this.EventHub);

    /**
     * Place for stores
     * @type {StoreHub}
     */
    this.StoreHub = new StoreHub(this.Flux, this.EventHub);

    /**
     * Set/get a commmand collection
     * @param namespace
     * @returns CommandCollection
     */
    this.command = function (namespace) {
        if (typeof arguments[1] != 'undefined') {
            this.CommandHub.register(namespace, arguments[1]);
        }
        return this.CommandHub.find(namespace);
    };

    /**
     * Set/get a store
     * @param namespace
     * @returns Store
     */
    this.store = function (namespace) {
        if (typeof arguments[1] != 'undefined') {
            this.StoreHub.register(namespace, arguments[1]);
        }
        return this.StoreHub.find(namespace);
    };

    /**
     * Get Fluxxy mixin
     * @return FluxxyMixin
     */
    this.flux = function () {
        return this.Flux;
    };

};


/**
 * Get mixin for watching a store
 * @param stores
 * @returns Mixin
 */
Fluxxy.watch = function (stores) {
    var component = typeof arguments[1] != 'undefined' ? arguments[1] : null;
    var mixin = new Mixin(stores, component);
    mixin.construct();
    return mixin;
};

/**
 * When implementing loading logic this is a helper string
 * @type string
 */
Fluxxy.LOADING = '*fluxxy-loading-tag*';

module.exports = Fluxxy;