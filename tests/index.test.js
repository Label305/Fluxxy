var FlexFlux = require('../');

var expect = require('expect.js');
describe('FlexFlux accessor', function () {

    it('be able to register command collections', function () {
        //Given
        var flexFlux = new FlexFlux();

        //When
        var CommandCollection = function () {
        };
        var commandCollection = new CommandCollection();
        flexFlux.add('User', commandCollection);

        //Then
        expect(commandCollection.namespace).to.be('User');
    });

});