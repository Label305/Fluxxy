var Store = function (namespace, flux) {

    /**
     * Index of objects
     * @type {Array}
     */
    var objects = [];

    /**
     * Add an object to the store
     * @param obj
     */
    this.add = function (obj) {
        objects.push(obj);
    };

    /**
     * Fetch all objects in store
     * @returns []
     */
    this.all = function () {
        return objects;
    };

    /**
     * Notify about change
     */
    this.changed = function () {
        flux._changed(namespace);
    }
};

module.exports = Store;