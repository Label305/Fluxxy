var EventHub = function () {

    /**
     * All callbacks
     * @type {Array}
     */
    var callbacks = [];

    /**
     * If we're currently dispatching
     * @type {boolean}
     */
    var dispatching = false;

    /**
     * Notify about an event
     * @param namespace
     * @param eventName
     * @param data
     */
    this.dispatch = function (namespace, eventName, data) {
        if (dispatching) {
            console.error('You tried to dispatch ' + namespace + '.' + eventName + ' while we\'re dispatching another event, this is not allowed');
            return;
        }
        dispatching = true;
        for (var i in callbacks) {
            if (
                callbacks[i].namespace == namespace
                && callbacks[i].eventName == eventName
            ) {
                callbacks[i].callback.apply(callbacks[i].context, [data]);
            }
        }
        dispatching = false;
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