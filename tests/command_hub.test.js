var Fluxxy = require('../');

var expect = require('expect.js');
describe('CommandHub', function () {

    it('should be able to register new command collections', function () {
        //Given
        var fluxxy = new Fluxxy();
        var commandHub = fluxxy.CommandHub;

        //When
        var CommandCollection = function () {
        };
        commandHub.register('User', CommandCollection);

        //Then
        //... no crash
    });

    it('should be able to find a registered command collection', function () {
        //Given
        var fluxxy = new Fluxxy();
        var commandHub = fluxxy.CommandHub;

        //When
        var CommandCollection = function () {
            this.foo = 'bar';
        };
        commandHub.register('User', CommandCollection);
        var commandCollection = commandHub.find('User');

        //Then
        expect(commandCollection.foo).to.be('bar');
    });

});