var EventCollector = function (namespace, eventHub) {

    /**
     * Notify the event collector something happened
     * @param eventName
     * @param data
     */
    this.dispatch = function (eventName, data) {
        eventHub.dispatch(namespace, eventName, data);
    }
    
};

module.exports = EventCollector;