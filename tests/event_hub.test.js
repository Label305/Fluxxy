var Fluxxy = require('../');

var expect = require('expect.js');
describe('EventHub', function () {

    it('should allow for registering callbacks', function () {
        //Given
        var fluxxy = new Fluxxy();
        var eventHub = fluxxy.EventHub;

        //When
        eventHub.on('User', 'update', function (data) {
            //This is the callback
        });

        //Then
        //.. do not crash
    });

    it('should dispatch to registered callbacks', function () {

        //Given
        var fluxxy = new Fluxxy();
        var eventHub = fluxxy.EventHub;

        var foo = '';
        eventHub.on('User', 'update', function (data) {
            foo = data.newVal;
        });

        //When
        eventHub.dispatch('User', 'update', {
            newVal: 'bar'
        });

        //Then
        expect(foo).to.be('bar');
    });

    it('should not dispatch to other callbacks', function () {

        //Given
        var fluxxy = new Fluxxy();
        var eventHub = fluxxy.EventHub;

        var foo = 'meh';
        eventHub.on('User', 'add', function (data) {
            foo = data.newVal;
        });

        //When
        eventHub.dispatch('User', 'update', {
            newVal: 'bar'
        });

        //Then
        expect(foo).to.be('meh');
    });

    it('should not dispatch while another is dispatching', function () {

        //Given
        var fluxxy = new Fluxxy();
        var eventHub = fluxxy.EventHub;

        var foo = 'meh';
        eventHub.on('User', 'add', function (data) {
            foo = 'A';
            //Dispatch inside another
            eventHub.dispatch('User', 'update', {});
        });
        eventHub.on('User', 'update', function (data) {
            foo = 'B';
        });

        //When
        eventHub.dispatch('User', 'add', {});

        //Then
        expect(foo).to.be('A');
    });

    it('should reset dispatching state when eventually finished', function () {

        //Given
        var fluxxy = new Fluxxy();
        var eventHub = fluxxy.EventHub;

        var foo = 'meh';
        eventHub.on('User', 'add', function (data) {
            foo = 'A';
            //Dispatch inside another
            eventHub.dispatch('User', 'update', {});
        });
        eventHub.on('User', 'update', function (data) {
            foo = 'B';
        });

        //When
        eventHub.dispatch('User', 'add', {});
        eventHub.dispatch('User', 'update', {});

        //Then
        expect(foo).to.be('B');
    });

    it('should maintain context when dispatching to a store', function () {
        //Given
        var fluxxy = new Fluxxy();
        var eventHub = fluxxy.EventHub;
        var storeHub = fluxxy.StoreHub;

        var UserStore = function (store) {
            this.construct = function (events) {
                events.on('User', 'add', this.setFoo);
            };
            this.setFoo = function (data) {
                this.propagateVal(data.val);
            };
            this.propagateVal = function (val) {
                this.foo = val;
            };
            this.foo = 'bar';
        };

        //When
        storeHub.register('User', UserStore);
        eventHub.dispatch('User', 'add', {
            val: 'foo'
        });

        //Then
        expect(storeHub.find('User').foo).to.be('foo');
    });
});