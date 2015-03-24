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
     * Initialize the passed command collection
     * @param namespace
     * @param commandCollection
     * @returns CommandCollection
     */
    function initializeCommandCollection(namespace, commandCollection) {
        var eventCollectorForNamespace = getEventCollectorForNamespace(namespace);
        return new commandCollection(eventCollectorForNamespace);
    }

    /**
     * Register a new command collection
     * @param namespace
     * @param commandCollection
     */
    this.register = function (namespace, commandCollection) {
        commandCollections[namespace] = initializeCommandCollection(namespace, commandCollection);
    };

    /**
     * Find a command collection
     * @param namespace
     * @return CommandCollection
     * @throws error when command collection is not found
     */
    this.find = function (namespace) {
        return commandCollections[namespace];
    }
};

module.exports = CommandHub;