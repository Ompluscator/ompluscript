describe("Page class tests - initialization", function() {

    var firstInput;
    var secondInput;
    var thirdInput;
    var page;

    var Page = Ompluscript.View.Container.Page;
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
        page = new Page("firstPage");
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
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

    it("components with null layout", function() {
        page = new Page("firstPage");
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout null-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with null layout - removal", function() {
        page = new Page("firstPage");
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.removeChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(2);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout null-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with null layout - switch position", function() {
        page = new Page("firstPage");
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.addChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout null-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with null layout - clearing", function() {
        page = new Page("firstPage");
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.clearChildren();
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
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

    it("empty with relative layout", function() {
        page = new Page("firstPage", new RelativeLayout());
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
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
    });

    it("components with relative layout", function() {
        page = new Page("firstPage", new RelativeLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout relative-layout">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with relative layout - removal", function() {
        page = new Page("firstPage", new RelativeLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.removeChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(2);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout relative-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with relative layout - switch position", function() {
        page = new Page("firstPage", new RelativeLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.addChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout relative-layout">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with relative layout - clearing", function() {
        page = new Page("firstPage", new RelativeLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.clearChildren();
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
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
    });

    it("empty with linear layout", function() {
        page = new Page("firstPage", new LinearLayout());
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage"><div class="layout linear-layout flex-horizontal flex-start"></div></div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
            active: false
        });
    });

    it("components with linear layout", function() {
        page = new Page("firstPage", new LinearLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with linear layout - removal", function() {
        page = new Page("firstPage", new LinearLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.removeChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(2);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with linear layout - switch position", function() {
        page = new Page("firstPage", new LinearLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.addChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-horizontal flex-start">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
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
            active: false
        });
    });

    it("components with linear layout - clearing", function() {
        page = new Page("firstPage", new LinearLayout());
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.clearChildren();
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage"><div class="layout linear-layout flex-horizontal flex-start"></div></div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [],
            layout: {
                html: '<div class="layout linear-layout flex-horizontal flex-start"></div>',
                name: "LinearLayout",
                children: [],
                align: LinearLayout.ALIGN_START,
                direction: LinearLayout.DIRECTION_HORIZONTAL,
                reverse: false
            },
            active: false
        });
    });

    it("empty with linear layout", function() {
        page = new Page("firstPage", new TableLayout(2, 2));
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>'+
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
                    },
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

    it("components with linear layout", function() {
        page = new Page("firstPage", new TableLayout(2, 2));
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>'+
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [
                firstInput.getStackTrace(),
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            firstInput.getStackTrace(),
                            secondInput.getStackTrace(),
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            thirdInput.getStackTrace()
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
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

    it("components with linear layout - removal", function() {
        page = new Page("firstPage", new TableLayout(2, 2));
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.removeChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(2);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>'+
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            secondInput.getStackTrace(),
                            thirdInput.getStackTrace()
                        ],
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
                    },
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

    it("components with linear layout - switch position", function() {
        page = new Page("firstPage", new TableLayout(2, 2));
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.addChild(firstInput);
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(3);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="second" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '</div>' +
            '</div>'+
            '</div>');
        expect(page.getStackTrace()).toEqual({
            html: '<div class="page firstPage"></div>',
            name: "firstPage",
            children: [
                secondInput.getStackTrace(),
                thirdInput.getStackTrace(),
                firstInput.getStackTrace()
            ],
            layout: {
                html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
                name: "TableLayout",
                children: [
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            secondInput.getStackTrace(),
                            thirdInput.getStackTrace()
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
                    {
                        html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                        name: "TableLayout",
                        children: [
                            firstInput.getStackTrace()
                        ],
                        align: TableLayout.ALIGN_CENTER,
                        direction: TableLayout.DIRECTION_HORIZONTAL,
                        reverse: false
                    },
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

    it("components with linear layout - clearing", function() {
        page = new Page("firstPage", new TableLayout(2, 2));
        page.addChild(firstInput);
        page.addChild(secondInput);
        page.addChild(thirdInput);
        page.clearChildren();
        expect(page.hasClass(Page.CLASS_PAGE)).toBeTruthy();
        expect(page.getChildrenCount()).toBe(0);
        expect(page.isActive()).toBeFalsy();
        expect(page.render().outerHTML).toBe('<div class="page firstPage">' +
            '<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>'+
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
                    },
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

describe("Page class tests - events", function() {

    var page;
    var Page = Ompluscript.View.Container.Page;

    var OnPageClose = Ompluscript.View.Event.OnPageClose;
    var OnPageLoad = Ompluscript.View.Event.OnPageLoad;

    it("simulate page load and close - unit test", function() {
        page = new Page("firstPage");

        spyOn(page, 'notifyObservers');

        var onPageClose = new OnPageClose(page);
        var onPageLoad = new OnPageLoad(page);

        page.setActive(false);

        expect(page.notifyObservers.calls.count()).toBe(0);

        page.notifyObservers.calls.reset();

        page.setActive(true);

        expect(page.notifyObservers.calls.argsFor(0)).toEqual([onPageLoad]);
        expect(page.notifyObservers.calls.count()).toBe(1);

        page.notifyObservers.calls.reset();

        page.setActive(true);

        expect(page.notifyObservers.calls.count()).toBe(0);

        page.notifyObservers.calls.reset();

        page.setActive(false);

        expect(page.notifyObservers.calls.argsFor(0)).toEqual([onPageClose]);
        expect(page.notifyObservers.calls.count()).toBe(1);
    });
});