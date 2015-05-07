var Mixin = function (stores) {
    return {

        /**
         * Get watched stores
         * @returns array
         */
        getWatchedStores: function () {
            return typeof stores == 'object' ? stores : [stores];
        },

        _getStoreState: function (props) {
            return typeof this.getStoreState != 'undefined' ? this.getStoreState(props) : {};
        },

        /**
         * Initial state from the store
         * @returns {*}
         */
        getInitialState: function () {
            return this._getStoreState(this.props);
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
                    this.setState(this._getStoreState(this.props));
                }.bind(this));
            }
        },

        /**
         * When store updates we also make sure the latest state is passed
         */
        componentWillReceiveProps: function (nextProps) {
            this.setState(this._getStoreState(nextProps));
        }
    }
};

module.exports = Mixin;