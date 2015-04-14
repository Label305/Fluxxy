var Store = require('./store');

var StoreHub = function (flux, eventHub) {

    var stores = {};

    /**
     * Initialize the to be added store
     * @param namespace
     * @param toBeAddedStore
     * @returns toBeAddedStore
     */
    function initializeStore(namespace, toBeAddedStore) {

        //Initialize a helper store
        var store = new Store(namespace, flux);

        //Initiate the to be added store
        var initializedStore = new toBeAddedStore(store);

        //Push a function that implements the `on` method, however will pass the store as context to the actual eventHub
        initializedStore.construct(new function () {
            this.on = function (namespace, eventName, callback) {
                eventHub.on(namespace, eventName, callback, initializedStore);
            }
        });
        return initializedStore;
    }

    /**
     * Register a new store
     * @param namespace
     * @param store
     */
    this.register = function (namespace, store) {
        stores[namespace] = initializeStore(namespace, store);
    };

    /**
     * Find a store
     * @param namespace
     * @return Store
     * @throws error when command collection is not found
     */
    this.find = function (namespace) {
        return stores[namespace];
    }

};

module.exports = StoreHub;