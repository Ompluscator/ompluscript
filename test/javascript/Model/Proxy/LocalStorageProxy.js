describe("LocalStorageProxy class tests", function() {

    var proxyObject;
    var modelObject;
    var proxies;

    var Model = Ompluscript.Model.Container.Model;
    var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;

    beforeAll(function() {
        proxies = [
            {
                type: "LocalStorageProxy",
            },
        ];
        modelObject = new Model("model", [], proxies);
        proxyObject = modelObject.getProxy("LocalStorageProxy");
    });

    beforeEach(function() {
        spyOn(window.localStorage, 'setItem');
        spyOn(window.localStorage, 'getItem').and.callFake(function(key) {
            return "{ \"a\": \"a\" }";
        });
        spyOn(window.localStorage, 'removeItem');
        spyOn(modelObject, 'notifyObservers');
        spyOn(modelObject, 'setValues');
    });

    it("get configuration", function() {
        expect(proxyObject.getName()).toBe("LocalStorageProxy");
        expect(proxyObject.getStackTrace()).toEqual({
            type: "LocalStorageProxy",
        });
    });

    it("save functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_SAVED, modelObject.getValues());

        proxyObject.save();

        expect(window.localStorage.setItem.calls.argsFor(0)).toEqual([modelObject.getName(), JSON.stringify(modelObject.getValues())]);
        expect(window.localStorage.setItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("update functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_UPDATED, modelObject.getValues());

        proxyObject.update();

        expect(window.localStorage.setItem.calls.argsFor(0)).toEqual([modelObject.getName(), JSON.stringify(modelObject.getValues())]);
        expect(window.localStorage.setItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("delete functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_DELETED, modelObject.getValues());

        proxyObject.delete();

        expect(window.localStorage.removeItem.calls.argsFor(0)).toEqual([modelObject.getName()]);
        expect(window.localStorage.removeItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("select functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_SELECTED, {
            a: "a"
        });

        proxyObject.select();

        expect(window.localStorage.getItem.calls.argsFor(0)).toEqual([modelObject.getName()]);
        expect(window.localStorage.getItem.calls.count()).toBe(1);
        expect(modelObject.setValues.calls.argsFor(0)).toEqual([{
            a: "a"
        }]);
        expect(modelObject.setValues.calls.count()).toBe(1);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });
});