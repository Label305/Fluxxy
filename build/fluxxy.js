(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["Fluxxy"] = factory();
	else
		root["Fluxxy"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Flux = __webpack_require__(1),
	    CommandHub = __webpack_require__(2),
	    EventHub = __webpack_require__(3),
	    StoreHub = __webpack_require__(4);
	
	var Fluxxy = function () {
	
	    /**
	     * Here all Fluxy logic happens, to couple Stores with React
	     * @type Flux
	     */
	    this.Flux = new Flux(this);
	
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
	     * Place for stores
	     * @type {StoreHub}
	     */
	    this.StoreHub = new StoreHub(this.Flux, this.EventHub);
	
	    /**
	     * Set/get a commmand collection
	     * @param namespace
	     * @returns CommandCollection
	     */
	    this.command = function (namespace) {
	        if (typeof arguments[1] != 'undefined') {
	            this.CommandHub.register(namespace, arguments[1]);
	        }
	        return this.CommandHub.find(namespace);
	    };
	
	    /**
	     * Set/get a store
	     * @param namespace
	     * @returns Store
	     */
	    this.store = function (namespace) {
	        if (typeof arguments[1] != 'undefined') {
	            this.StoreHub.register(namespace, arguments[1]);
	        }
	        return this.StoreHub.find(namespace);
	    };
	
	    /**
	     * Get Fluxxy mixin
	     * @return FluxxyMixin
	     */
	    this.flux = function () {
	        return this.Flux;
	    };
	
	    /**
	     * Get mixin for watching a store
	     * @param stores
	     * @returns {*}
	     */
	    this.watch = function (stores) {
	        return this.Flux.watch(stores);
	    }
	};
	
	module.exports = Fluxxy;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Mixin = __webpack_require__(5);
	
	var Flux = function (fluxxy) {
	
	    /**
	     * Callbacks that listen to changes in stores
	     * @type {Array}
	     */
	    var storeCallbacks = [];
	
	    /**
	     * Register a new listener on a store
	     * @param store
	     * @param callback
	     * @param context
	     */
	    this.onStoreChange = function (store, callback, context) {
	        storeCallbacks.push({
	            store: store,
	            callback: callback,
	            context: context
	        });
	    };
	
	    /**
	     * Returns the Mixin that allows for watching
	     * @param stores
	     */
	    this.watch = function (stores) {
	        var mixin = new Mixin(fluxxy.flux(), stores);
	        mixin.stores = stores;
	        return mixin;
	    };
	
	    /**
	     * A notification about which store changed
	     * @param store
	     */
	    this._changed = function (store) {
	        for (var i in storeCallbacks) {
	            if (storeCallbacks[i].store == store) {
	                storeCallbacks[i].callback.apply(storeCallbacks[i].context);
	            }
	        }
	    };
	
	    /**
	     * Alias for fluxxy.store
	     */
	    this.store = function () {
	        return fluxxy.store(arguments[0], arguments[1]);
	    };
	
	    /**
	     * Alias for fluxxy.command
	     */
	    this.command = function () {
	        return fluxxy.command(arguments[0], arguments[1]);
	    };
	};
	
	module.exports = Flux;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var EventCollector = __webpack_require__(6);
	
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
	     * Initialize the passed command collection
	     * @param namespace
	     * @param commandCollection
	     * @returns CommandCollection
	     */
	    function initializeCommandCollection(namespace, commandCollection) {
	        var eventCollectorForNamespace = getEventCollectorForNamespace(namespace);
	        return new commandCollection(eventCollectorForNamespace);
	    }
	
	    /**
	     * Register a new command collection
	     * @param namespace
	     * @param commandCollection
	     */
	    this.register = function (namespace, commandCollection) {
	        commandCollections[namespace] = initializeCommandCollection(namespace, commandCollection);
	    };
	
	    /**
	     * Find a command collection
	     * @param namespace
	     * @return CommandCollection
	     * @throws error when command collection is not found
	     */
	    this.find = function (namespace) {
	        return commandCollections[namespace];
	    }
	};
	
	module.exports = CommandHub;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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
	     * @param context (optional)
	     */
	    this.on = function (namespace, eventName, callback) {
	        callbacks.push({
	            namespace: namespace,
	            eventName: eventName,
	            callback: callback,
	            context: typeof arguments[3] == 'undefined' ? callback : arguments[3]
	        });
	    }
	
	};
	
	module.exports = EventHub;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(7);
	
	var StoreHub = function (flux, eventHub) {
	
	    var stores = {};
	
	    function initializeStore(namespace, toBeAddedStore) {
	        var store = new Store(namespace, flux);
	        var initializedStore = new toBeAddedStore(store);
	        initializedStore.construct(eventHub);
	        return initializedStore;
	    }
	
	    /**
	     * Register a new store
	     * @param namespace
	     * @param store
	     */
	    this.register = function (namespace, store) {
	        stores[namespace] = initializeStore(namespace, store);
	    };
	
	    /**
	     * Find a store
	     * @param namespace
	     * @return Store
	     * @throws error when command collection is not found
	     */
	    this.find = function (namespace) {
	        return stores[namespace];
	    }
	
	};
	
	module.exports = StoreHub;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Mixin = function (flux, stores) {
	    return {
	
	        /**
	         * Initial state from the store
	         * @returns {*}
	         */
	        getInitialState: function () {
	            return this.getStoreState(this.props);
	        },
	
	        /**
	         * When a component is mounted register
	         */
	        componentDidMount: function () {
	            for (var i in stores) {
	                flux.onStoreChange(stores[i], function () {
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var EventCollector = function (namespace, eventHub) {
	
	    /**
	     * Notify the event collector something happened
	     * @param eventName
	     * @param data
	     */
	    this.dispatch = function (eventName, data) {
	        eventHub.dispatch(namespace, eventName, data);
	    };
	
	    /**
	     * Dispatch for a certain namespace, only for advanced implementations, normally your event collector
	     * is chosen specifically for you command collection
	     * @param namespace
	     * @param eventName
	     * @param data
	     */
	    this.dispatchForNamespace = function (namespace, eventName, data) {
	        eventHub.dispatch(namespace, eventName, data);
	    }
	};
	
	module.exports = EventCollector;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Store = function (namespace, flux) {
	
	    /**
	     * Index of objects
	     * @type {Array}
	     */
	    var objects = [];
	
	    /**
	     * Add an object to the store
	     * @param obj
	     */
	    this.add = function (obj) {
	        objects.push(obj);
	    };
	
	    /**
	     * Fetch all objects in store
	     * @returns []
	     */
	    this.all = function () {
	        return objects;
	    };
	
	    /**
	     * Notify about change
	     */
	    this.changed = function () {
	        flux._changed(namespace);
	    }
	};
	
	module.exports = Store;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fluxxy.js.map