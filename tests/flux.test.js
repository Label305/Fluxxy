var FlexFlux = require('../');

var expect = require('expect.js');
describe('Flux', function () {

    it('should set the stores', function () {
        //Given
        var flexFlux = new FlexFlux();
        var flux = flexFlux.Flux;

        //When
        var m = flux.watch(['User']);

        //Then
        expect(m.stores.length).to.be(1);
        expect(m.stores[0]).to.be('User');
    });

    it('should not pass the mixin by reference', function () {
        //Given
        var flexFlux = new FlexFlux();
        var flux = flexFlux.Flux;

        //When
        var firstMixin = flux.watch(['User']);
        var secondMixin = flux.watch(['Team']);

        //Then
        expect(firstMixin.stores.length).to.be(1);
        expect(firstMixin.stores[0]).to.be('User');
        expect(secondMixin.stores.length).to.be(1);
        expect(secondMixin.stores[0]).to.be('Team');
    });

});