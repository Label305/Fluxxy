var Mixin = function (stores) {
    return {

        /**
         * Get watched stores
         * @returns array
         */
        getWatchedStores: function () {
            return typeof stores == 'object' ? stores : [stores];
        },

        /**
         * Initial state from the store
         * @returns {*}
         */
        getInitialState: function () {
            return this.getStoreState(this.props);
        },

        /**
         * Get the flux instance
         * @returns Flux
         */
        getFlux: function () {
            return this.props.flux;
        },

        /**
         * When a component is mounted register
         */
        componentDidMount: function () {
            var stores = this.getWatchedStores();
            for (var i in stores) {
                this.getFlux().onStoreChange(stores[i], function () {
                    this.setState(this.getStoreState(this.props));
                }.bind(this));
            }
        },

        /**
         * When store updates we also make sure the latest state is passed
         */
        componentWillReceiveProps: function (nextProps) {
            this.setState(this.getStoreState(nextProps));
        }
    }
};

module.exports = Mixin;