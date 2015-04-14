var Fluxxy = require('../');

var expect = require('expect.js');
describe('StoreHub', function () {

    it('should be able to register and find a store', function () {
        //Given
        var fluxxy = new Fluxxy();
        var storeHub = fluxxy.StoreHub;

        var UserStore = function (store) {
            this.construct = function () {
            };
            this.foo = 'bar';
        };

        //When
        storeHub.register('User', UserStore);
        var userStore = storeHub.find('User');

        //Then
        expect(userStore.foo).to.be('bar');
    });

    it('should maintain store context in constructor', function () {
        //Given
        var fluxxy = new Fluxxy();
        var storeHub = fluxxy.StoreHub;

        var UserStore = function (store) {
            this.construct = function () {
                this.setFoo('foo');
            };
            this.setFoo = function (val) {
                this.foo = val;
            };
            this.foo = 'bar';
        };

        //When
        storeHub.register('User', UserStore);
        var userStore = storeHub.find('User');

        //Then
        expect(userStore.foo).to.be('foo');
    });

});