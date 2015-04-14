var EventHub = function () {

    /**
     * All callbacks
     * @type {Array}
     */
    var callbacks = [];

    /**
     * Notify about an event
     * @param namespace
     * @param eventName
     * @param data
     */
    this.dispatch = function (namespace, eventName, data) {
        for (var i in callbacks) {
            if (
                callbacks[i].namespace == namespace
                && callbacks[i].eventName == eventName
            ) {
                callbacks[i].callback.apply(callbacks[i].context, [data]);
            }
        }
    };

    /**
     * Register a new callback
     * @param namespace
     * @param eventName
     * @param callback
     * @param context
     */
    this.on = function (namespace, eventName, callback, context) {
        callbacks.push({
            namespace: namespace,
            eventName: eventName,
            callback: callback,
            context: context
        });
    }

};

module.exports = EventHub;