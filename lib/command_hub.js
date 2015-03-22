var EventCollector = require('./lib/event_collector');

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
        if (typeof commandCollection.setEventCollector == 'undefined') {
            throw 'Command collection does not implement "setEventCollector"';
        }
        commandCollection.setEventCollector(getEventCollectorForNamespace(namespace));

        commandCollections[namespace] = commandCollection;
    }

};

module.exports = CommandHub;