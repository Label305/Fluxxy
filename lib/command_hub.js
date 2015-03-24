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
    };

    /**
     * Find a command collection
     * @param namespace
     * @return CommandCollection
     * @throws error when command collection is not found
     */
    this.find = function (namespace) {
        //TODO implement
    }
};

module.exports = CommandHub;