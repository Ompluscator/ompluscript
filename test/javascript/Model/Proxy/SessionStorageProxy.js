describe("SessionStorageProxy class tests", function() {

    var proxyObject;
    var modelObject;
    var proxies;

    var Model = Ompluscript.Model.Container.Model;
    var OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;

    beforeAll(function() {
        proxies = [
            {
                type: "sessionStorage",
            },
        ];
        modelObject = new Model("model", [], proxies);
        proxyObject = modelObject.getProxy("sessionStorage");
    });

    beforeEach(function() {
        spyOn(window.sessionStorage, 'setItem');
        spyOn(window.sessionStorage, 'getItem').and.callFake(function(key) {
            return "{ \"a\": \"a\" }";
        });
        spyOn(window.sessionStorage, 'removeItem');
        spyOn(modelObject, 'notifyObservers');
        spyOn(modelObject, 'setValues');
    });

    it("get configuration", function() {
        expect(proxyObject.getName()).toBe("sessionStorage");
        expect(proxyObject.getStackTrace()).toEqual({
            type: "sessionStorage",
        });
    });

    it("save functionality", function() {
        var onDoneProxyEvent = new OnDoneProxyEvent(modelObject, OnDoneProxyEvent.TYPE_SAVED, modelObject.getValues());

        proxyObject.save();

        expect(window.sessionStorage.setItem.calls.argsFor(0)).toEqual([modelObject.getName(), JSON.stringify(modelObject.getValues())]);
        expect(window.sessionStorage.setItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxyEvent]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("update functionality", function() {
        var onDoneProxyEvent = new OnDoneProxyEvent(modelObject, OnDoneProxyEvent.TYPE_UPDATED, modelObject.getValues());

        proxyObject.update();

        expect(window.sessionStorage.setItem.calls.argsFor(0)).toEqual([modelObject.getName(), JSON.stringify(modelObject.getValues())]);
        expect(window.sessionStorage.setItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxyEvent]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("delete functionality", function() {
        var onDoneProxyEvent = new OnDoneProxyEvent(modelObject, OnDoneProxyEvent.TYPE_DELETED, modelObject.getValues());

        proxyObject.delete();

        expect(window.sessionStorage.removeItem.calls.argsFor(0)).toEqual([modelObject.getName()]);
        expect(window.sessionStorage.removeItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxyEvent]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("select functionality", function() {
        var onDoneProxyEvent = new OnDoneProxyEvent(modelObject, OnDoneProxyEvent.TYPE_SELECTED, {
            a: "a"
        });

        proxyObject.select();

        expect(window.sessionStorage.getItem.calls.argsFor(0)).toEqual([modelObject.getName()]);
        expect(window.sessionStorage.getItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.argsFor(0)).toEqual([{
            a: "a"
        }]);
        expect(modelObject.setValues.calls.count()).toBe(1);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxyEvent]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });
});