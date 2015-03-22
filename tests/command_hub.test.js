var FlexFlux = require('../');

var expect = require('expect.js');
describe('CommandHub', function () {

    it('should be able to register new command collections', function () {
        //Given
        var flexFlux = new FlexFlux();
        var commandHub = flexFlux.CommandHub;

        //When
        var CommandCollection = function () {
        };
        var commandCollection = new CommandCollection();
        commandHub.register('User', commandCollection);

        //Then
        expect(commandCollection.namespace).to.be('User');
    });

});