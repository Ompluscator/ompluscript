describe("AjaxProxy class tests", function() {

    var proxyObject;
    var modelObject;
    var proxies;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;

    beforeAll(function() {
        definition = [
            {
                name: "param",
                type: "String",
                value: "value",
            }
        ];
        proxies = [
            {
                type: "AjaxProxy",
                saveLink: "save",
                updateLink: "update",
                deleteLink: "delete",
                selectLink: "select"
            },
        ];
        modelObject = new Model("model", definition, proxies);
        proxyObject = modelObject.getProxy("AjaxProxy");
    });

    beforeEach(function() {
        jasmine.Ajax.install();
        spyOn(modelObject, 'notifyObservers');
        spyOn(modelObject, 'setValues');
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("get configuration", function() {
        expect(proxyObject.getName()).toBe("AjaxProxy");
        expect(proxyObject.getStackTrace()).toEqual({
            type: "AjaxProxy",
            saveLink: "save",
            updateLink: "update",
            deleteLink: "delete",
            selectLink: "select"
        });
    });

    it("save functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_SAVED, {
            a: "a"
        });

        proxyObject.save();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("save");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({"param":["value"]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("update functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_UPDATED, {
            a: "a"
        });

        proxyObject.update();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("update");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({"param":["value"]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("delete functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_DELETED, {
            a: "a"
        });

        proxyObject.delete();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("delete");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({"param":["value"]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("select functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_SELECTED, {
            a: "a"
        });

        proxyObject.select({
            b: "b"
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("select");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({"b":["b"]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(modelObject.setValues.calls.argsFor(0)).toEqual([{
            a: "a"
        }]);
        expect(modelObject.setValues.calls.count()).toBe(1);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

    it("failed functionality", function() {
        var onDoneProxy = new OnDoneProxy(modelObject, OnDoneProxy.TYPE_FAILED, {
            a: "a"
        });

        proxyObject.select({
            b: "b"
        });

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("select");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
        expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({"b":["b"]});

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 400,
            "responseText": "{ \"a\": \"a\" }"
        });

        expect(modelObject.setValues.calls.count()).toBe(0);
        expect(modelObject.notifyObservers.calls.argsFor(0)).toEqual([onDoneProxy]);
        expect(modelObject.notifyObservers.calls.count()).toBe(1);
    });

});