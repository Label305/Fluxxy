/**
 * @jsx React.DOM
 */
var FlexFlux = require('../../../');
var React = require('react');

/**
 * The TodoStore will receive our FlexFlux generic store as first param
 * @param store
 * @constructor
 */
var TodoStore = function (store) {

    /**
     * Register to events
     * @param events
     */
    this.construct = function (events) {
        events.on('add', this.add);
    };

    /**
     * Add the newly created todo to the store
     * @param newTodo
     */
    this.add = function (newTodo) {
        store.add(newTodo);
        store.changed();
    };

    /**
     * Fetch all todos
     * @returns []
     */
    this.all = function () {
        return store.all();
    }

};

/**
 * The TodoCommands collection will receive an EventCollector so it can broadcast it did something
 * @param events
 * @constructor
 */
var TodoCommands = function (events) {

    /**
     * Create a new todo
     * @param newTodo
     */
    this.add = function (newTodo) {
        //You might want to send it to a server first... but hey, this is just an example
        events.dispatch('add', newTodo);
    }

};

/**
 * The component we will be rendering into the DOM
 */
var TodoApp = React.createClass({
    mixins: [this.props.flux.watch(['Todo'])],
    getStateFromFlux: function () {
        return {
            todos: this.props.flux.store('Todo').all()
        };
    },
    getInitialState: function () {
        return {
            content: ''
        }
    },
    handleContentChange: function (event) {
        this.setState({
            content: event.target.value
        });
    },
    handleSubmit: function () {
        this.props.flux.command('Todo').add({
            content: this.state.content
        });
        this.setState({
            content: ''
        })
    },
    render: function () {
        var todos = this.state.todos.map(function (todo) {
            return <li>{todo.content}</li>;
        });
        return <div>
            <ul>{todos}</ul>
            <br/>
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.content} onChange={this.handleContentChange} />
            </form>
        </div>;
    }
});

/**
 * How we initialize the FlexFlux lib
 * @type {FlexFlux}
 */
var flexFlux = new FlexFlux();

//Register command collections for certain namespaces
flexFlux.command('Todo', TodoCommands);

//Register store
flexFlux.store('Todo', TodoStore);

//Pass flux to the component
React.render(<TodoApp flux={flexFlux.flux()} />, document.getElementById("app"));