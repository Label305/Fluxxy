var Fluxxy = require('../');

var expect = require('expect.js');
describe('Fluxxy accessor', function () {

    it('be able to register command collections', function () {
        //Given
        var fluxxy = new Fluxxy();

        //When
        var CommandCollection = function (events) {
            this.foo = 'bar';
        };
        var commandCollection = fluxxy.command('User', CommandCollection);

        //Then
        expect(commandCollection.foo).to.be('bar');
    });

    it('be able to find command collections', function () {
        //Given
        var fluxxy = new Fluxxy();

        //When
        var CommandCollection = function (events) {
            this.foo = 'bar';
        };
        fluxxy.command('User', CommandCollection);
        var commandCollection = fluxxy.command('User');

        //Then
        expect(commandCollection.foo).to.be('bar');
    });

});