var FlexFlux = require('../'),
    Store = require('../lib/store');

var expect = require('expect.js');
describe('Store', function () {

    it('should be able to add and fetch all objects', function () {
        //Given
        var obj = {
            foo: 'bar'
        };
        var flexFlux = new FlexFlux();

        //When
        var store = new Store('MyNamespace', flexFlux.flux());
        store.add(obj);
        var objects = store.all();

        //Then
        expect(objects.length).to.be(1);
        expect(objects[0]).to.be(obj);
    });

    it('should notify flux that is has changed', function () {
        //Given
        var Flux = function () {
            this.changedCalled = false;
            this._changed = function () {
                this.changedCalled = true;
            }
        };
        var flux = new Flux();

        //When
        var store = new Store('MyNamespace', flux);
        store.changed();

        //Then
        expect(flux.changedCalled).to.be(true);
    });

});