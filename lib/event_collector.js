var EventCollector = function (namespace, eventHub) {

    /**
     * Notify the event collector something happened
     * @param eventName
     * @param data
     */
    this.notify = function (eventName, data) {
        eventHub.notify(namespace, eventName, data);
    }

};

module.exports = EventCollector;