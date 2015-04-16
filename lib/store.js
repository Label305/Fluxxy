var Store = function (namespace, flux) {

    /**
     * Index of objects
     * @type {Array}
     */
    var objects = [];

    /**
     * Key marking the index
     * @type {string}
     */
    var indexKey = 'id';

    /**
     * Set the key which marks the index of the objects
     * @param key
     */
    this.setIndexKey = function (key) {
        indexKey = key;
    };

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
     * Get number of objects in store
     * @returns {Number}
     */
    this.size = function () {
        return objects.length;
    };

    /**
     * Find value by default key
     * @param val
     */
    this.find = function (val) {
        return this.findByKey(indexKey, val);
    };

    /**
     *
     * @param key
     * @param val
     * @returns {*}
     */
    this.findByKey = function (key, val) {
        for (var i in objects) {
            if (objects[i][key] == val) {
                return objects[i];
            }
        }
    };

    /**
     * Add or update an object
     * @param obj
     */
    this.addOrUpdate = function (obj) {
        if (!this.update(obj)) {
            this.add(obj);
        }
    };

    /**
     * Update an object in the store
     * @param obj
     * @returns boolean true if added
     */
    this.update = function (obj) {
        var existing = this.find(obj[indexKey]);
        if (typeof existing != 'undefined') {
            objects[objects.indexOf(existing)] = obj;
            return true;
        }
        return false;
    };

    /**
     * Notify about change
     */
    this.changed = function () {
        flux._changed(namespace);
    }
};

module.exports = Store;