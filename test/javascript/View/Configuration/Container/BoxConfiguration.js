describe("BoxConfiguration class tests - valid Box", function() {

    var boxConfiguration;

    var BoxConfiguration = Ompluscript.View.Configuration.Container.BoxConfiguration;
    var Box = Ompluscript.View.Container.Box;
    var LinearLayout = Ompluscript.View.Layout.LinearLayout;
    var TableLayout = Ompluscript.View.Layout.TableLayout;
    var TextInput = Ompluscript.View.Field.TextInput;
    var Creator = Ompluscript.View.Creator;

    beforeAll(function() {
        boxConfiguration = new BoxConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Box",
            name: "firstBox"
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box"><div class="layout null-layout"></div></div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: []
            },
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            layout: {
                type: "NullLayout"
            }
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box"><div class="layout null-layout"></div></div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: []
            },
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            layout: {
                type: "RelativeLayout"
            }
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box"><div class="layout relative-layout"></div></div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout relative-layout"></div>',
                name: "RelativeLayout",
                children: []
            },
        });
    });;

    it("valid - third", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            layout: {
                type: "LinearLayout",
                align: LinearLayout.ALIGN_END,
                direction: LinearLayout.DIRECTION_VERTICAL,
                reverse: true
            }
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-end flex-reverse"></div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-end flex-reverse"></div>',
                name: "LinearLayout",
                children: [],
                align: LinearLayout.ALIGN_END,
                direction: LinearLayout.DIRECTION_VERTICAL,
                reverse: true
            },
        });
    });

    it("valid - fourth", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            layout: {
                type: "TableLayout",
                rows: 2,
                cells: 3
            }
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 3
            },
        });
    });

    it("valid - fifth", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
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
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input" style="width: calc(100% / 2);">' +
            '<input type="text" name="second" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="third" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                {
                    html: '<input type="text" name="first" class="input" style="width: calc(100% / 2);">',
                    name: "first",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="second" class="input" style="width: calc(100% / 2);">',
                    name: "second",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="third" class="input" style="width: calc(100% / 2);">',
                    name: "third",
                    attribute: void(0),
                }
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="first" class="input" style="width: calc(100% / 2);">',
                                name: "first",
                                attribute: void(0),
                            },
                            {
                                html: '<input type="text" name="second" class="input" style="width: calc(100% / 2);">',
                                name: "second",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="third" class="input" style="width: calc(100% / 2);">',
                                name: "third",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
        });
    });

    it("valid - sixth", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            layout: {
                type: "TableLayout",
                rows: 2,
                cells: 2
            }
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition, [new TextInput("first"), new TextInput("second"), new TextInput("third")]);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input" style="width: calc(100% / 2);">' +
            '<input type="text" name="second" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="third" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                {
                    html: '<input type="text" name="first" class="input" style="width: calc(100% / 2);">',
                    name: "first",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="second" class="input" style="width: calc(100% / 2);">',
                    name: "second",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="third" class="input" style="width: calc(100% / 2);">',
                    name: "third",
                    attribute: void(0),
                }
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="first" class="input" style="width: calc(100% / 2);">',
                                name: "first",
                                attribute: void(0),
                            },
                            {
                                html: '<input type="text" name="second" class="input" style="width: calc(100% / 2);">',
                                name: "second",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="third" class="input" style="width: calc(100% / 2);">',
                                name: "third",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
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
            type: "Box",
            name: "firstBox",
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
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([]);
        var box = boxConfiguration.create(definition);
        expect(box instanceof Box).toBeTruthy();
        expect(box.getName()).toBe("firstBox");
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input" style="width: calc(100% / 2);">' +
            '<input type="text" name="second" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="third" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                {
                    html: '<input type="text" name="first" class="input" style="width: calc(100% / 2);">',
                    name: "first",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="second" class="input" style="width: calc(100% / 2);">',
                    name: "second",
                    attribute: void(0),
                },
                {
                    html: '<input type="text" name="third" class="input" style="width: calc(100% / 2);">',
                    name: "third",
                    attribute: void(0),
                }
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="first" class="input" style="width: calc(100% / 2);">',
                                name: "first",
                                attribute: void(0),
                            },
                            {
                                html: '<input type="text" name="second" class="input" style="width: calc(100% / 2);">',
                                name: "second",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            {
                                html: '<input type="text" name="third" class="input" style="width: calc(100% / 2);">',
                                name: "third",
                                attribute: void(0),
                            }
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    }
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
        });
    });
});

describe("BoxConfiguration class tests - invalid BoxConfiguration", function() {

    var boxConfiguration;

    var BoxConfiguration = Ompluscript.View.Configuration.Container.BoxConfiguration;
    var Box = Ompluscript.View.Container.Box;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        boxConfiguration = new BoxConfiguration();
    });

    it("invalid configuration - name", function() {
        var definition = {
            type: "Box",
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            layout: false,
            children: "not"
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([
            "firstBox." + Box.PARAMETER_CHILDREN + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
            "firstBox." + Box.PARAMETER_LAYOUT + Configuration.MUST_BE_OBJECT_OR_UNDEFINED,
        ]);
    });

    it("invalid children configuration", function() {
        var definition = {
            type: "Box",
            name: "firstBox",
            children: [
                false,
                "not"
            ]
        };
        expect(boxConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(boxConfiguration.getErrors(definition)).toEqual([
            Configuration.IS_WRONG_CONFIGURATION,
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });
});