describe("PageConfiguration class tests - valid Page", function() {

    var pageConfiguration;

    var PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
    var Page = Ompluscript.View.Container.Page;
    var LinearLayout = Ompluscript.View.Layout.LinearLayout;
    var TableLayout = Ompluscript.View.Layout.TableLayout;
    var TextInput = Ompluscript.View.Field.TextInput;
    var Creator = Ompluscript.View.Creator;

    beforeAll(function() {
        pageConfiguration = new PageConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Page",
            name: "firstPage"
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage"><div class="layout null-layout"></div></div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: []
            },
            active: false
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "NullLayout"
            }
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage"><div class="layout null-layout"></div></div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: []
            },
            active: false
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "RelativeLayout"
            }
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage"><div class="layout relative-layout"></div></div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout relative-layout"></div>',
                name: "RelativeLayout",
                children: []
            },
            active: false
        });
    });;

    it("valid - third", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "LinearLayout",
                align: LinearLayout.ALIGN_END,
                direction: LinearLayout.DIRECTION_VERTICAL,
                reverse: true
            }
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-end flex-reverse"></div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-end flex-reverse"></div>',
                name: "LinearLayout",
                children: [],
                align: LinearLayout.ALIGN_END,
                direction: LinearLayout.DIRECTION_VERTICAL,
                reverse: true
            },
            active: false
        });
    });

    it("valid - fourth", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "TableLayout",
                rows: 2,
                cells: 3
            }
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_CENTER,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 3
            },
            active: false
        });
    });

    it("valid - fifth", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "TableLayout",
                rows: 2,
                cells: 2
            },
            children: [
                {
                    type: "TextInput",
                    name: "first"
                },
                {
                    type: "TextInput",
                    name: "second"
                },
                {
                    type: "TextInput",
                    name: "third"
                }
            ]
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [
                {
                    html: '<input type="text" name="first" class="input">',
                    name: "first",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="second" class="input">',
                    name: "second",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="third" class="input">',
                    name: "third",
                    attribute: void(0),
                }
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="first" class="input">',
                                name: "first",
                                attribute: void(0),
                            },
                            {
                                html: '<input type="text" name="second" class="input">',
                                name: "second",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="third" class="input">',
                                name: "third",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_CENTER,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
            active: false
        });
    });

    it("valid - sixth", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "TableLayout",
                rows: 2,
                cells: 2
            }
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition, [new TextInput("first"), new TextInput("second"), new TextInput("third")]);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [
                {
                    html: '<input type="text" name="first" class="input">',
                    name: "first",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="second" class="input">',
                    name: "second",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="third" class="input">',
                    name: "third",
                    attribute: void(0),
                }
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="first" class="input">',
                                name: "first",
                                attribute: void(0),
                            },
                            {
                                html: '<input type="text" name="second" class="input">',
                                name: "second",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="third" class="input">',
                                name: "third",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_CENTER,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
            active: false
        });
    });

    it("valid - seventh", function() {
        Creator.getInstance().define({
            type: "TextInput",
            name: "first"
        });
        Creator.getInstance().define({
            type: "TextInput",
            name: "second"
        });
        Creator.getInstance().define({
            type: "TextInput",
            name: "third"
        });
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: {
                type: "TableLayout",
                rows: 2,
                cells: 2
            },
            children: [
                "first",
                "second",
                "third"
            ]
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([]);
        var page = pageConfiguration.create(definition);
        expect(page instanceof Page).toBeTruthy();
        expect(page.getName()).toBe("firstPage");
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [
                {
                    html: '<input type="text" name="first" class="input">',
                    name: "first",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="second" class="input">',
                    name: "second",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="third" class="input">',
                    name: "third",
                    attribute: void(0),
                }
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="first" class="input">',
                                name: "first",
                                attribute: void(0),
                            },
                            {
                                html: '<input type="text" name="second" class="input">',
                                name: "second",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="third" class="input">',
                                name: "third",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_CENTER,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
            active: false
        });
    });
});

describe("PageConfiguration class tests - invalid PageConfiguration", function() {

    var pageConfiguration;

    var PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
    var Page = Ompluscript.View.Container.Page;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        pageConfiguration = new PageConfiguration();
    });

    it("invalid configuration - name", function() {
        var definition = {
            type: "Page",
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            layout: false,
            children: "not"
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([
            "firstPage." + Page.PARAMETER_CHILDREN + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
            "firstPage." + Page.PARAMETER_LAYOUT + Configuration.MUST_BE_OBJECT_OR_UNDEFINED,
        ]);
    });

    it("invalid children configuration", function() {
        var definition = {
            type: "Page",
            name: "firstPage",
            children: [
                false,
                "not"
            ]
        };
        expect(pageConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(pageConfiguration.getErrors(definition)).toEqual([
            Configuration.IS_WRONG_CONFIGURATION,
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });
});