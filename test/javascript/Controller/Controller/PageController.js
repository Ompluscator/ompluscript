describe("PageController class tests - initialization", function() {

    var pageController;
    var page;
    
    var PageController = Ompluscript.Controller.Controller.PageController;
    var Page = Ompluscript.View.Container.Page;

    it("get configuration", function() {
        page = new Page("/name");
        pageController = new PageController(page);
        
        expect(pageController.getPage()).toBe(page);
        expect(pageController.getName()).toBe("/name");
        expect(pageController.isRelated("/name")).toBeTruthy();
        expect(pageController.isRelated("/name/action")).toBeFalsy();
        expect(pageController.getStackTrace()).toEqual({
            name: "/name",
            actions: [],
            page: page.getStackTrace()
        });
    });

    it("actions", function() {
        var test = {
            method: function (param) {}
        };
        spyOn(test, "method");
        page = new Page("/name");
        pageController = new PageController(page);
        pageController.addAction("test", function (param) {
            test.method(param);
        });

        expect(pageController.getPage()).toBe(page);
        expect(pageController.getName()).toBe("/name");
        expect(pageController.isRelated("/name")).toBeTruthy();
        expect(pageController.isRelated("/name/action")).toBeFalsy();
        expect(pageController.isRelated("/name/test")).toBeTruthy();
        expect(pageController.isRelated("/name/test/param")).toBeTruthy();
        expect(pageController.isRelated("/name/test/param/2")).toBeTruthy();
        expect(pageController.getStackTrace()).toEqual({
            name: "/name",
            actions: [
                "test"
            ],
            page: page.getStackTrace()
        });

        pageController.runPage("/name/test");
        pageController.runPage("/name/test/param/2");

        expect(test.method.calls.argsFor(0)).toEqual([void(0)]);
        expect(test.method.calls.argsFor(1)).toEqual(["2"]);
        expect(test.method.calls.count()).toBe(2);
    });
});