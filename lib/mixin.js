var Mixin = function () {
    return {

        /**
         * The stores this Mixin listens to
         */
        stores: [],

        /**
         * Force updating state with flux
         */
        updateStateUsingFlux: function () {
            this.setState(this.getStoreState());
        }
    }
};

module.exports = Mixin;