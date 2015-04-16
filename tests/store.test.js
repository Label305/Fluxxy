var Fluxxy = require('../'),
    Store = require('../lib/store');

var expect = require('expect.js');
describe('Helper store', function () {

    it('should be able to add and fetch all objects', function () {
        //Given
        var obj = {
            foo: 'bar'
        };
        var fluxxy = new Fluxxy();

        //When
        var store = new Store('MyNamespace', fluxxy.flux());
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

    it('should be able to find records based on the index key', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2
        });
        var obj = {
            id: 3
        };
        store.add(obj);

        //When
        var found = store.find(3);

        //Then
        expect(found).to.be(obj);
    });

    it('should honor the index key while searching for records', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });
        var obj = {
            id: 3,
            index: 2
        };
        store.add(obj);

        //When
        store.setIndexKey('index');
        var found = store.find(2);

        //Then
        expect(found).to.be(obj);
    });

    it('should be able to find records using a specified key', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });
        var obj = {
            id: 3,
            index: 2
        };
        store.add(obj);

        //When
        var found = store.findByKey('index', 2);

        //Then
        expect(found).to.be(obj);
    });

    it('should be able to count objects in store', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });
        store.add({
            id: 3,
            index: 2
        });

        //When
        var size = store.size();

        //Then
        expect(size).to.be(2);
    });

    it('should be able to update objects', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });
        var obj = {
            id: 3,
            index: 2
        };
        store.add(obj);

        //When
        var updatedObj = {
            id: 3,
            index: 7
        };
        var updated = store.update(updatedObj);
        var found = store.find(3);
        var size = store.size();

        //Then
        expect(updated).to.be(true);
        expect(found.index).to.be(updatedObj.index);
        expect(size).to.be(2);
    });

    it('should leave the store untouched while trying to update a not yet added object', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });

        //When
        var updatedObj = {
            id: 3,
            index: 7
        };
        var updated = store.update(updatedObj);
        var size = store.size();

        //Then
        expect(size).to.be(1);
        expect(updated).to.be(false);
    });

    it('should be able to add an object while querying addOrUpdate', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });

        //When
        var newObj = {
            id: 3,
            index: 7
        };
        store.addOrUpdate(newObj);
        var found = store.find(3);
        var size = store.size();

        //Then
        expect(found.index).to.be(newObj.index);
        expect(size).to.be(2);
    });

    it('should be able to update an object while querying addOrUpdate', function () {
        //Given
        var fluxxy = new Fluxxy();
        var store = new Store('MyNamespace', fluxxy.flux());
        store.add({
            id: 2,
            index: 3
        });
        store.add({
            id: 3,
            index: 4
        });

        //When
        var updatedObj = {
            id: 3,
            index: 7
        };
        store.addOrUpdate(updatedObj);
        var found = store.find(3);
        var size = store.size();

        //Then
        expect(found.index).to.be(updatedObj.index);
        expect(size).to.be(2);
    });


});