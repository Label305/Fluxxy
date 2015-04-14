Fluxxy
====

More beautiful and scalable implementation of the 
[Flux architecture](http://facebook.github.io/flux/docs/overview.html) for 
[React](http://facebook.github.io/react/) applications.

Installation
----

Fluxxy can be downloaded as standalone browser build from
[the GitHub releases page](https://github.com/Label305/Fluxxy/releases) or installed via
Bower:

    bower install fluxxy
    
Usage
----

So, you've read about the Flux architecture. That means you know about its corner 
stones: Actions, Dispatching, Stores and Views. Fluxxy also has those, but we've made things more scaleable by using multiple collections of commands which are tied to stores using a namespace.

Time for an example:

Commands:
```
var TodoCommands = function (events) {
    this.add = function (newTodo) {
        events.dispatch('add', newTodo);
    }
};
```

Store:
```
var TodoStore = function (store) {
    this.construct = function (events) {
        events.on('Todo', 'add', this.add);
    };
    this.add = function (newTodo) {
        store.add(newTodo);
        store.changed();
    };
    this.all = function () {
        return store.all();
    }
};
```

React:
```
var TodoApp = React.createClass({
    mixins: [Flux.watch(['Todo'])],
    getStoreState: function () {
        return {
            todos: this.props.flux.store('Todo').all()
        };
    },
    handleSomething: function() {
        this.props.flux.commands('Todo').add({
            content: 'Dummy todo'
        });
    },
    render: function () {
        var todos = this.state.todos.map(function (todo) {
            return <li onClick={this.handleSomething}>{todo.content}</li>;
        }.bind(this);
        return <div>
            <ul>{todos}</ul>
        </div>;
    }
});
```

Fluxxy!
```
var Fluxxy = require('fluxxy');
window.Flux = new Fluxxy();
Flux.command('Todo', TodoCommands);
Flux.store('Todo', TodoStore);
```

We have a collection of commands called `TodoCommands`, in this case `add`, which can dispatch an `add` event within the namespace it
is registered to (i.e. `Todo`, but don't worry, there are overrides). Now you have the `TodoStore`, which, after it is constructed,
listens to these events. 

Now data pours into your store, so you have to manage the state there. We've thrown in a default `store` object for free 
where you can dump your state, since you'll always implement methods such as `all`, or `add`. 

Only thing left is to get data into your (React) views, by including a watching Mixin, where you can specify which
stores it should watch.

License
---------
Copyright 2015 Label305 B.V.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
