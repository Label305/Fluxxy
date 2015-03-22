var EventCollector = require('./event_collector');

var CommandHub = function (eventHub) {

    /**
     * List of all command collections
     * @type Object
     */
    var commandCollections = {};

    /**
     * Create new event collector for a certain namespace
     * @returns {EventCollector}
     */
    function getEventCollectorForNamespace(namespace) {
        return new EventCollector(namespace, eventHub);
    }

    /**
     * Register a new command collection
     * @param namespace
     * @param commandCollection
     */
    this.register = function (namespace, commandCollection) {
        commandCollection.namespace = namespace;
        commandCollection.event_collector = getEventCollectorForNamespace(namespace);
        commandCollections[namespace] = commandCollection;
    }

};

module.exports = CommandHub;