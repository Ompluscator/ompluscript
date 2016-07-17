describe("ViewportConfiguration class tests - valid Viewport", function() {

    var viewportConfiguration;

    var ViewportConfiguration = Ompluscript.View.Configuration.Viewport.ViewportConfiguration;
    var Viewport = Ompluscript.View.Viewport.Viewport;
    var Page = Ompluscript.View.Container.Page;
    var Creator = Ompluscript.View.Creator;

    beforeAll(function() {
        viewportConfiguration = new ViewportConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Viewport"
        };
        expect(viewportConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(viewportConfiguration.getErrors(definition)).toEqual([]);
        var viewport = viewportConfiguration.create(definition);
        expect(viewport instanceof Viewport).toBeTruthy();
        expect(viewport.getName()).toBe("Viewport");
        expect(viewport.getStackTrace()).toEqual({
            html: '<body class="viewport"></body>',
            name: "Viewport",
            activePageIndex: void(0),
            pages: []
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Viewport",
            pages: [
                {
                    type: "Page",
                    name: "firstPage"
                }
            ]
        };
        expect(viewportConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(viewportConfiguration.getErrors(definition)).toEqual([]);
        var viewport = viewportConfiguration.create(definition);
        expect(viewport instanceof Viewport).toBeTruthy();
        expect(viewport.getName()).toBe("Viewport");
        expect(viewport.getStackTrace()).toEqual({
            html: '<body class="viewport"></body>',
            name: "Viewport",
            activePageIndex: 0,
            pages: [
                {
                    html: '<div class="page firstPage"></div>',
                    name: "firstPage",
                    children: [],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: []
                    },
                    active: true
                }
            ]
        });
    });

    it("valid - third", function() {
        var definition = {
            type: "Viewport"
        };
        expect(viewportConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(viewportConfiguration.getErrors(definition)).toEqual([]);
        var viewport = viewportConfiguration.create(definition, [new Page("firstPage")]);
        expect(viewport instanceof Viewport).toBeTruthy();
        expect(viewport.getName()).toBe("Viewport");
        expect(viewport.getStackTrace()).toEqual({
            html: '<body class="viewport"></body>',
            name: "Viewport",
            activePageIndex: 0,
            pages: [
                {
                    html: '<div class="page firstPage"></div>',
                    name: "firstPage",
                    children: [],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: []
                    },
                    active: true
                }
            ]
        });
    });

    it("valid - fourth", function() {
        Creator.getInstance().define({
            type: "Page",
            name: "firstPage"
        });
        var definition = {
            type: "Viewport",
            pages: [
                "firstPage"
            ]
        };
        expect(viewportConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(viewportConfiguration.getErrors(definition)).toEqual([]);
        var viewport = viewportConfiguration.create(definition);
        expect(viewport instanceof Viewport).toBeTruthy();
        expect(viewport.getName()).toBe("Viewport");
        expect(viewport.getStackTrace()).toEqual({
            html: '<body class="viewport"></body>',
            name: "Viewport",
            activePageIndex: 0,
            pages: [
                {
                    html: '<div class="page firstPage"></div>',
                    name: "firstPage",
                    children: [],
                    layout: {
                        html: '<div class="layout null-layout"></div>',
                        name: "NullLayout",
                        children: []
                    },
                    active: true
                }
            ]
        });
    });
});

describe("ViewportConfiguration class tests - invalid ViewportConfiguration", function() {

    var viewportConfiguration;

    var ViewportConfiguration = Ompluscript.View.Configuration.Viewport.ViewportConfiguration;
    var Viewport = Ompluscript.View.Viewport.Viewport;

    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        viewportConfiguration = new ViewportConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Viewport",
            pages: "firstPage",
        };
        expect(viewportConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(viewportConfiguration.getErrors(definition)).toEqual([
            "Viewport." + Viewport.PARAMETER_PAGES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });

    it("invalid children configuration", function() {
        var definition = {
            type: "Viewport",
            pages: [
                false,
                "not"
            ]
        };
        expect(viewportConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(viewportConfiguration.getErrors(definition)).toEqual([
            Configuration.IS_WRONG_CONFIGURATION,
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });
});