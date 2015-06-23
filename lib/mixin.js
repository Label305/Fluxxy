var Mixin = function (stores, component) {

    return {

        construct: function () {
            if (component != null) {
                component.state = this.getInitialState();
                this._registerListenerWithComponent();
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
         * Touch the state
         * @private
         */
        _touch: function () {
            var props = this.getContext().props;
            var state = this._getStoreState(props);
            this.getContext().setState(state);
        },

        /**
         * Will make sure that the component is listening on the store
         * @private
         */
        _registerListenerWithComponent: function () {
            this.getWatchedStores().forEach(function (store) {
                this.getFlux().onStoreChange(store, this._touch.bind(this));
            }.bind(this));
        },

        /**
         * When a component is mounted register
         */
        componentDidMount: function () {
            this._registerListenerWithComponent();
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