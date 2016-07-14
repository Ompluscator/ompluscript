describe("OnDoneProxy class tests", function() {

    var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
    var Model = Ompluscript.Model.Container.Model;

    var event;
    var attribute;
    var action = OnDoneProxy.TYPE_SAVED;
    var response = [];

    beforeAll(function() {
        attribute = new Model("param", []);
        event = new OnDoneProxy(attribute, action, response);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(attribute);
        expect(event.getType()).toBe(OnDoneProxy.ON_DONE_PROXY);
        expect(event.getAction()).toBe(action);
        expect(event.getResponse()).toEqual(response);
    });
});