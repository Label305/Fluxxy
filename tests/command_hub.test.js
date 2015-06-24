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

    it('should work with an es6 class', function () {
        //Given
        if (typeof "foo".startsWith == 'undefined') {
            console.log('No ES6 environment');
            return;
        }

        var fluxxy = new Fluxxy();
        var CommandHub = require('./es6/example_command_hub.js');

        //When
        fluxxy.command('User', CommandHub);
        var commandHub = fluxxy.command('User');

        //Then
        expect(commandHub.events).not.to.be(undefined);
        expect(commandHub.events.dispatch).not.to.be(undefined);
    });

});