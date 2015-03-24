var FlexFlux = require('../');

var expect = require('expect.js');
describe('FlexFlux accessor', function () {

    it('be able to register command collections', function () {
        //Given
        var flexFlux = new FlexFlux();

        //When
        var CommandCollection = function (events) {
            this.foo = 'bar';
        };
        var commandCollection = flexFlux.command('User', CommandCollection);

        //Then
        expect(commandCollection.foo).to.be('bar');
    });

});