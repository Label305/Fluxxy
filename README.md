FlexFlux
====

More beautiful and scalable implementation of the 
[Flux architecture](http://facebook.github.io/flux/docs/overview.html) for 
[React](http://facebook.github.io/react/) applications.

Installation
----
Will be available here in the near future.

Usage
----

So, you've read about the Flux architecture. That means, you know about the corner 
stones: Actions, Dispatching, Stores and Views. FlexFlux also has those, however to make life easier and more scaleable
we have mulitple collections of commands instead of a mind bogglingly long list of actions. 
Which are tied to stores using a namespace.

Example!

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

FlexFlux!
```
var FlexFlux = require('../../../index');
window.Flux = new FlexFlux();
Flux.command('Todo', TodoCommands);
Flux.store('Todo', TodoStore);
```

So we have a collection of commands called `TodoCommands`, in this case `add`, which can dispatch an `add` event within the namespace it
is registered in (i.e. `Todo`, but don't worry there are overrides). Now you have the `TodoStore`, which, after it is constructed,
listens to these events. 

So now data pours into your store, so now you have to manage state there, you get a default `store` object for free 
where you can dump your state, since you'll always will implement methods such as `all`, or `add`. 

Only thing left is to get data into you (React) views, by including the a watching Mixin, where you can specify on which
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