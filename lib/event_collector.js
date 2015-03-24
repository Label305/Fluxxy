var EventCollector = function (namespace, eventHub) {

    /**
     * Notify the event collector something happened
     * @param eventName
     * @param data
     */
    this.dispatch = function (eventName, data) {
        eventHub.dispatch(namespace, eventName, data);
    };

    /**
     * Dispatch for a certain namespace, only for advanced implementations, normally your event collector
     * is chosen specifically for you command collection
     * @param namespace
     * @param eventName
     * @param data
     */
    this.dispatchForNamespace = function (namespace, eventName, data) {
        eventHub.dispatch(namespace, eventName, data);
    }
};

module.exports = EventCollector;