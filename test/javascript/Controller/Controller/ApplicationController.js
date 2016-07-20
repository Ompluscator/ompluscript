describe("ApplicationController class tests - initialization", function() {

    var applicationController;
    
    var validDefinition = {
        type: "Page",
        name: "firstPage"
    };
    var validContent = "Ompluscript.View.define(" + JSON.stringify(validDefinition, null, 4) + ");";

    var invalidDefinition = {
        type: "Page",
        name: 1
    };
    var invalidContent = "Ompluscript.View.define(" + JSON.stringify(invalidDefinition, null, 4) + ");";
    
    var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    var OnComponentLoad = Ompluscript.Controller.Event.OnComponentLoad;
    var OnApplicationStart = Ompluscript.Controller.Event.OnApplicationStart;
    var Page = Ompluscript.View.Container.Page;
    var WrongConfigurationContainer = Ompluscript.View.Container.WrongConfigurationContainer;
    var Creator = Ompluscript.View.Creator;

    beforeAll(function() {
        applicationController = new ApplicationController(["page"]);
    });

    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("send requests - valid content", function() {
        spyOn(Ompluscript.Controller.Controller, "NavigationController");
        spyOn(applicationController, "notifyObservers");

        var onComponentLoad = new OnComponentLoad(applicationController, "page");
        var onApplicationStart = new OnApplicationStart(applicationController);
        var page = new Page("firstPage");

        applicationController.setup();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("app/page.js");

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": validContent
        });

        expect(Ompluscript.Controller.Controller.NavigationController.calls.argsFor(0)).toEqual([[page]]);
        expect(Ompluscript.Controller.Controller.NavigationController.calls.count()).toBe(1);
        expect(applicationController.notifyObservers.calls.argsFor(0)).toEqual([onComponentLoad]);
        expect(applicationController.notifyObservers.calls.argsFor(1)).toEqual([onApplicationStart]);
        expect(applicationController.notifyObservers.calls.count()).toBe(2);
    });

    it("send requests - invalid content", function() {
        spyOn(Ompluscript.Controller.Controller, "NavigationController");
        spyOn(applicationController, "notifyObservers");

        applicationController.setup();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("app/page.js");

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "responseText": invalidContent
        });

        var wrongConfigurationContainer = new WrongConfigurationContainer(Creator.getInstance().getErrors()[0]);
        var page = new Page("ApplicationController", true, void(0), [wrongConfigurationContainer]);

        expect(Ompluscript.Controller.Controller.NavigationController.calls.argsFor(0)).toEqual([[page]]);
        expect(Ompluscript.Controller.Controller.NavigationController.calls.count()).toBe(1);
        expect(applicationController.notifyObservers.calls.count()).toBe(0);
    });

    it("send requests - invalid request", function() {
        spyOn(Ompluscript.Controller.Controller, "NavigationController");
        spyOn(applicationController, "notifyObservers");

        applicationController.setup();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("app/page.js");

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 400,
            "responseText": ""
        });

        var wrongConfigurationContainer = new WrongConfigurationContainer({
            definition: {
                page: false
            },
            errors: ["app/page.js not found"],
            name: "app/page.js",
            type: "Script",
        });
        var page = new Page("ApplicationController", true, void(0), [wrongConfigurationContainer]);

        expect(Ompluscript.Controller.Controller.NavigationController.calls.argsFor(0)).toEqual([[page]]);
        expect(Ompluscript.Controller.Controller.NavigationController.calls.count()).toBe(1);
        expect(applicationController.notifyObservers.calls.count()).toBe(0);
    });
});