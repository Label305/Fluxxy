var Fluxxy = require('../');

var expect = require('expect.js');
describe('Flux', function () {

    it('should set the stores', function () {
        //Given
        var fluxxy = new Fluxxy();

        //When
        var m = Fluxxy.watch(['User']);

        //Then
        expect(m.getWatchedStores().length).to.be(1);
        expect(m.getWatchedStores()[0]).to.be('User');
    });
    
    it('should be able to set a single store', function() {
        //Given
        var fluxxy = new Fluxxy();

        //When
        var m = Fluxxy.watch('User');

        //Then
        expect(m.getWatchedStores().length).to.be(1);
        expect(m.getWatchedStores()[0]).to.be('User');
    });

    it('should not pass the mixin by reference', function () {
        //Given
        var fluxxy = new Fluxxy();

        //When
        var firstMixin = Fluxxy.watch(['User']);
        var secondMixin = Fluxxy.watch(['Team']);

        //Then
        expect(firstMixin.getWatchedStores().length).to.be(1);
        expect(firstMixin.getWatchedStores()[0]).to.be('User');
        expect(secondMixin.getWatchedStores().length).to.be(1);
        expect(secondMixin.getWatchedStores()[0]).to.be('Team');
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
        var mixin = Fluxxy.watch(['User']);
        mixin.props = {
            flux: fluxxy.flux()
        };
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