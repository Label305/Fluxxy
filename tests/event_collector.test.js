var Fluxxy = require('../'),
    EventCollector = require('../lib/event_collector');

var expect = require('expect.js');
describe('EventCollector', function () {

    it('should be able to dispatch events with passed namespace', function () {
        //Given
        var DummyEventHub = function () {
            this.calledNamespace = '';
            this.calledEventName = '';

            this.dispatch = function (namespace, eventName, data) {
                this.calledNamespace = namespace;
                this.calledEventName = eventName;
            }
        };
        var spyEventHub = new DummyEventHub();

        //When
        var eventCollector = new EventCollector('User', spyEventHub);
        eventCollector.dispatch('add', {});

        //Then
        expect(spyEventHub.calledNamespace).to.be('User');
        expect(spyEventHub.calledEventName).to.be('add');
    });
    
    it('should be able to dispatch events with defined namespace', function() {
        //Given
        var DummyEventHub = function () {
            this.calledNamespace = '';
            this.calledEventName = '';

            this.dispatch = function (namespace, eventName, data) {
                this.calledNamespace = namespace;
                this.calledEventName = eventName;
            }
        };
        var spyEventHub = new DummyEventHub();

        //When
        var eventCollector = new EventCollector('User', spyEventHub);
        eventCollector.dispatchForNamespace('Team', 'update', {});

        //Then
        expect(spyEventHub.calledNamespace).to.be('Team');
        expect(spyEventHub.calledEventName).to.be('update');
    })

});