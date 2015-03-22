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
    this.notify = function (namespace, eventName, data) {
        for (var i in callbacks) {
            if (
                callbacks[i].namespace == namespace
                && callbacks[i].eventName == eventName
            ) {
                callbacks[i].callback.apply(callbacks[i].context, data);
            }
        }
    };

    /**
     * Register a new callback
     * @param namespace
     * @param eventName
     * @param callback
     * @param context (optional)
     */
    this.on = function (namespace, eventName, callback) {
        this.callbacks.push({
            namespace: namespace,
            eventName: eventName,
            callback: callback,
            context: typeof arguments[3] == 'undefined' ? callback : arguments[3]
        });
    }

};

module.exports = EventHub;