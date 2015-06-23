var Mixin = function (stores, component) {

    return {

        construct: function () {
            if (component != null) {
                component.state = this._getStoreState(component.props);
            }
        },

        /**
         * When we're in a traditional mixin, we can access the component through `this.getContext()` however, in ES6 the
         * "mixin" is explicitly passed
         */
        getContext: function () {
            return component != null ? component : this;
        },

        /**
         * Get watched stores
         * @returns array
         */
        getWatchedStores: function () {
            return typeof stores == 'object' ? stores : [stores];
        },

        /**
         * Get store state
         * @param props
         * @returns {}
         * @private
         */
        _getStoreState: function (props) {
            return typeof this.getContext().getStoreState != 'undefined' ? this.getContext().getStoreState(props) : {};
        },

        /**
         * Initial state from the store
         * @returns {*}
         */
        getInitialState: function () {
            return this._getStoreState(this.getContext().props);
        },

        /**
         * Get the flux instance
         * @returns Flux
         */
        getFlux: function () {
            return this.getContext().props.flux;
        },

        /**
         * When a component is mounted register
         */
        componentDidMount: function () {
            var stores = this.getWatchedStores();
            for (var i in stores) {
                this.getFlux().onStoreChange(stores[i], function () {
                    this.getContext().setState(this._getStoreState(this.getContext().props));
                }.bind(this));
            }
        },

        /**
         * When store updates we also make sure the latest state is passed
         */
        componentWillReceiveProps: function (nextProps) {
            this.getContext().setState(this._getStoreState(nextProps));
        }
    }
};

module.exports = Mixin;