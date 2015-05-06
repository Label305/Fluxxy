/**
 * The TodoStore will receive our Fluxxy generic store as first param
 * @param store
 * @constructor
 */
var TodoStore = function (store) {

    /**
     * Index to be able to set unique key
     * @type integer
     */
    var index = 0;

    /**
     * Register to events
     * @param events
     */
    this.construct = function (events) {
        events.on('Todo', 'add', this.add);
    };

    /**
     * Add the newly created todo to the store
     * @param newTodo
     */
    this.add = function (newTodo) {
        newTodo.id = ++index;
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
 * How we initialize the Fluxxy lib
 * @type {Fluxxy}
 */
var Fluxxy = require('../../../index');
var flux = new Fluxxy();

//Register command collections for certain namespaces
flux.command('Todo', TodoCommands);

//Register store
flux.store('Todo', TodoStore);

/**
 * The component we will be rendering into the DOM
 */
var React = require('react');
var TodoApp = React.createClass({
    mixins: [Fluxxy.watch(['Todo'])],
    getStoreState: function () {
        return {
            todos: this.props.flux.store('Todo').all(),
            num: this.props.flux.store('Todo').all().length//To show we're actually using this method, not the ref.
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
    handleSubmit: function (event) {
        event.preventDefault();
        this.props.flux.command('Todo').add({
            content: this.state.content
        });
        this.setState({
            content: ''
        })
    },
    render: function () {
        var todos = this.state.todos.map(function (todo) {
            return <li key={todo.id}>{todo.content}</li>;
        });
        return <div>
            <h1>{'Todo (' + this.state.num + ')'}</h1>
            <ul>{todos}</ul>
            <br/>
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.content} onChange={this.handleContentChange} />
            </form>
        </div>;
    }
});

//Pass flux to the component
React.render(<TodoApp flux={flux.flux()} />, document.getElementById("app"));
