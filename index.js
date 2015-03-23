var CommandHub = require('./lib/command_hub'),
    EventHub = require('./lib/event_hub');

var FlexFlux = function () {

    /**
     * Place for events
     * @type EventHub
     */
    this.EventHub = new EventHub();

    /**
     * Place for command collections
     * @type CommandHub
     */
    this.CommandHub = new CommandHub(this.EventHub);

    /**
     * Add a command collection
     * @param namespace
     * @param commandCollection
     */
    this.add = function (namespace, commandCollection) {
        this.CommandHub.register(namespace, commandCollection);
    };

    /**
     * Register a new callback for an event
     * @param namespace
     * @param eventName
     * @param callback
     * @param context (optional)
     */
    this.on = function (namespace, eventName, callback) {
        this.EventHub.on(
            namespace,
            eventName,
            callback,
            typeof arguments[3] == 'undefined' ? {} : arguments[3]
        );
    }

};

module.exports = FlexFlux;