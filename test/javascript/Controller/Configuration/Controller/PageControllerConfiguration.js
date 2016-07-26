describe("PageController class tests - initialization", function() {

    var pageControllerConfiguration;

    var PageController = Ompluscript.Controller.Controller.PageController;
    var PageControllerConfiguration = Ompluscript.Controller.Configuration.Controller.PageControllerConfiguration;
    var Page = Ompluscript.View.Container.Page;

    pageControllerConfiguration = new PageControllerConfiguration();

    it("get configuration", function() {
        var definition = {
            type: "PageController",
            page: {
                name: "/name",
                type: "Page"
            }
        };

        expect(pageControllerConfiguration.isRelatedTo(definition)).toBeTruthy();

        var pageController = pageControllerConfiguration.create(definition);

        expect(pageController instanceof PageController).toBeTruthy();
        expect(pageController.getPage() instanceof Page).toBeTruthy();
        expect(pageController.getName()).toBe("/name");
        expect(pageController.isRelated("/name")).toBeTruthy();
        expect(pageController.isRelated("/name/action")).toBeFalsy();
    });

    it("actions", function() {
        var definition = {
            type: "PageController",
            page: {
                name: "/name",
                type: "Page"
            },
            actions: {
                test: function (param) {}
            }
        };

        expect(pageControllerConfiguration.isRelatedTo(definition)).toBeTruthy();

        var pageController = pageControllerConfiguration.create(definition);

        expect(pageController instanceof PageController).toBeTruthy();
        expect(pageController.getPage() instanceof Page).toBeTruthy();
        expect(pageController.getName()).toBe("/name");
        expect(pageController.isRelated("/name")).toBeTruthy();
        expect(pageController.isRelated("/name/action")).toBeFalsy();
        expect(pageController.isRelated("/name/test")).toBeTruthy();
        expect(pageController.isRelated("/name/test/param")).toBeTruthy();
        expect(pageController.isRelated("/name/test/param/2")).toBeTruthy();
    });
});

describe("PageControllerConfiguration class tests - invalid PageControllerConfiguration", function() {

    var pageControllerConfiguration;

    var PageControllerConfiguration = Ompluscript.Controller.Configuration.Controller.PageControllerConfiguration;
    var PageController = Ompluscript.Controller.Controller.PageController;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        pageControllerConfiguration = new PageControllerConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "PageController",
            name: "/name",
            page: 1,
            actions: 1
        };
        expect(pageControllerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageControllerConfiguration.getErrors(definition)).toEqual([
            PageController.PARAMETER_PAGE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED,
            PageController.PARAMETER_ACTIONS + Configuration.MUST_BE_OBJECT_OR_UNDEFINED,
        ]);
    });

    it("invalid action", function() {
        var definition = {
            type: "PageController",
            name: "firstPageController",
            actions: {
                first: false,
                second: "not"
            }
        };
        expect(pageControllerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageControllerConfiguration.getErrors(definition)).toEqual([
            "first" + Configuration.MUST_BE_FUNCTION_OR_UNDEFINED,
            "second" + Configuration.MUST_BE_FUNCTION_OR_UNDEFINED,
        ]);
    });
});