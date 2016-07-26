describe("Box class tests - initialization", function() {

    var firstInput;
    var secondInput;
    var thirdInput;
    var box;

    var Box = Ompluscript.View.Container.Box;
    var TextInput = Ompluscript.View.Field.TextInput;
    var RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
    var LinearLayout = Ompluscript.View.Layout.LinearLayout;
    var TableLayout = Ompluscript.View.Layout.TableLayout;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        thirdInput = new TextInput("third");
    });

    it("empty with null layout", function() {
        box = new Box("firstBox");
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
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

    it("components with null layout", function() {
        box = new Box("firstBox");
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout null-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    firstInput.getStackTrace(),
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace()
                ]
            },
        });
    });

    it("components with null layout - removal", function() {
        box = new Box("firstBox");
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.removeChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(2);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout null-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace()
                ]
            },
        });
    });

    it("components with null layout - switch position", function() {
        box = new Box("firstBox");
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.addChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout null-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace(),
                firstInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout null-layout"></div>',
                name: "NullLayout",
                children: [
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace(),
                    firstInput.getStackTrace()
                ]
            },
        });
    });

    it("components with null layout - clearing", function() {
        box = new Box("firstBox");
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.clearChildren();
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
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

    it("empty with relative layout", function() {
        box = new Box("firstBox", new RelativeLayout());
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
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
    });

    it("components with relative layout", function() {
        box = new Box("firstBox", new RelativeLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout relative-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout relative-layout"></div>',
                name: "RelativeLayout",
                children: [
                    firstInput.getStackTrace(),
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace()
                ]
            },
        });
    });

    it("components with relative layout - removal", function() {
        box = new Box("firstBox", new RelativeLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.removeChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(2);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout relative-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout relative-layout"></div>',
                name: "RelativeLayout",
                children: [
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace()
                ]
            },
        });
    });

    it("components with relative layout - switch position", function() {
        box = new Box("firstBox", new RelativeLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.addChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout relative-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace(),
                firstInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout relative-layout"></div>',
                name: "RelativeLayout",
                children: [
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace(),
                    firstInput.getStackTrace()
                ]
            },
        });
    });

    it("components with relative layout - clearing", function() {
        box = new Box("firstBox", new RelativeLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.clearChildren();
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
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
    });

    it("empty with linear layout", function() {
        box = new Box("firstBox", new LinearLayout());
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
        expect(box.render().outerHTML).toBe('<div class="box"><div class="layout linear-layout flex-horizontal flex-start"></div></div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
        });
    });

    it("components with linear layout", function() {
        box = new Box("firstBox", new LinearLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [
                    firstInput.getStackTrace(),
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace()
                ],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
        });
    });

    it("components with linear layout - removal", function() {
        box = new Box("firstBox", new LinearLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.removeChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(2);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace()
                ],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
        });
    });

    it("components with linear layout - switch position", function() {
        box = new Box("firstBox", new LinearLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.addChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace(),
                firstInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [
                    secondInput.getStackTrace(),
                    thirdInput.getStackTrace(),
                    firstInput.getStackTrace()
                ],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
        });
    });

    it("components with linear layout - clearing", function() {
        box = new Box("firstBox", new LinearLayout());
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.clearChildren();
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
        expect(box.render().outerHTML).toBe('<div class="box"><div class="layout linear-layout flex-horizontal flex-start"></div></div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
        });
    });

    it("empty with table layout", function() {
        box = new Box("firstBox", new TableLayout(2, 2));
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '</div>'+
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
                    },
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
        });
    });

    it("components with table layout", function() {
        box = new Box("firstBox", new TableLayout(2, 2));
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input" style="width: calc(100% / 2);">' +
            '<input type="text" name="second" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="third" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '</div>'+
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            firstInput.getStackTrace(),
                            secondInput.getStackTrace(),
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            thirdInput.getStackTrace()
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
        });
    });

    it("components with table layout - removal", function() {
        box = new Box("firstBox", new TableLayout(2, 2));
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.removeChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(2);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="second" class="input" style="width: calc(100% / 2);">' +
            '<input type="text" name="third" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '</div>'+
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            secondInput.getStackTrace(),
                            thirdInput.getStackTrace()
                        ],
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
                    },
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
        });
    });

    it("components with table layout - switch position", function() {
        box = new Box("firstBox", new TableLayout(2, 2));
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.addChild(firstInput);
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(3);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="second" class="input" style="width: calc(100% / 2);">' +
            '<input type="text" name="third" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input" style="width: calc(100% / 2);">' +
            '</div>' +
            '</div>'+
            '</div>');
        expect(box.getStackTrace()).toEqual({
            html: '<div class="box"></div>',
            name: "firstBox",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace(),
                firstInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-start"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            secondInput.getStackTrace(),
                            thirdInput.getStackTrace()
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                        name: "TableLayout",
                        children: [
                            firstInput.getStackTrace()
                        ],
                        align: TableLayout.ALIGN_START,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                ],
                align: TableLayout.ALIGN_START,
                direction: TableLayout.DIRECTION_VERTICAL,
                reverse: false,
                rows: 2,
                cells: 2
            },
        });
    });

    it("components with table layout - clearing", function() {
        box = new Box("firstBox", new TableLayout(2, 2));
        box.addChild(firstInput);
        box.addChild(secondInput);
        box.addChild(thirdInput);
        box.clearChildren();
        expect(box.hasClass(Box.CLASS_BOX)).toBeTruthy();
        expect(box.getChildrenCount()).toBe(0);
        expect(box.render().outerHTML).toBe('<div class="box">' +
            '<div class="layout linear-layout flex-vertical flex-start">' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-start"></div>' +
            '</div>'+
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
                    },
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