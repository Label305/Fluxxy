var Fluxxy = require('../');

var expect = require('expect.js');
describe('Flux', function () {

    it('should set the stores', function () {
        //Given
        var fluxxy = new Fluxxy();
        var flux = fluxxy.Flux;

        //When
        var m = flux.watch(['User']);

        //Then
        expect(m.stores.length).to.be(1);
        expect(m.stores[0]).to.be('User');
    });

    it('should not pass the mixin by reference', function () {
        //Given
        var fluxxy = new Fluxxy();
        var flux = fluxxy.Flux;

        //When
        var firstMixin = flux.watch(['User']);
        var secondMixin = flux.watch(['Team']);

        //Then
        expect(firstMixin.stores.length).to.be(1);
        expect(firstMixin.stores[0]).to.be('User');
        expect(secondMixin.stores.length).to.be(1);
        expect(secondMixin.stores[0]).to.be('Team');
    });

    it('should set the state fetched from `getStoreState`', function () {
        //Given
        var fluxxy = new Fluxxy();

        //Register a store that will tell us it has changed
        var UserStore = function (store) {
            this.construct = function () {
            };
            this.add = function () {
                store.changed();
            }
        };
        fluxxy.store('User', UserStore);

        //Mock the methods that are part of the flux state
        var dataInState = {
            foo: 'bar'
        };
        var mixin = fluxxy.Flux.watch(['User']);
        mixin.componentDidMount();
        mixin.getStoreState = function () {
            return {
                foo: 'blub'
            };
        };
        mixin.setState = function (data) {
            dataInState = data;
        };

        //When
        fluxxy.store('User').add();

        //Then
        expect(dataInState.foo).to.be('blub');
    });

});