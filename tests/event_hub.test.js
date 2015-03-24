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
});