var Store = require('./store');

var StoreHub = function (flux) {

    var stores = {};

    function initializeStore(namespace, toBeAddedStore) {
        var store = new Store(namespace, flux);
        return new toBeAddedStore(store);
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