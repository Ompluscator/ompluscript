describe("TableLayout class tests", function() {

    var firstInput;
    var secondInput;
    var thirdInput;
    var tableLayout;

    var TableLayout = Ompluscript.View.Layout.TableLayout;
    var TextInput = Ompluscript.View.Field.TextInput;

    beforeAll(function() {
        firstInput = new TextInput("first");
        secondInput = new TextInput("second");
        thirdInput = new TextInput("third");
    });

    it("get configuration", function() {
        tableLayout = new TableLayout(3, 1);
        expect(tableLayout.hasClass(TableLayout.CLASS_LINEAR_LAYOUT)).toBeTruthy();
        expect(tableLayout.hasClass(TableLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(tableLayout.getChildrenCount()).toBe(0);
        expect(tableLayout.render().outerHTML).toBe('<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>');
        expect(tableLayout.getStackTrace()).toEqual({
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
            rows: 3,
            cells: 1
        });
    });

    it("with children - first", function() {
        tableLayout = new TableLayout(2, 2);
        tableLayout.addChild(firstInput);
        tableLayout.addChild(secondInput);
        tableLayout.addChild(thirdInput);
        expect(tableLayout.hasClass(TableLayout.CLASS_LINEAR_LAYOUT)).toBeTruthy();
        expect(tableLayout.hasClass(TableLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(tableLayout.getChildrenCount()).toBe(3);
        expect(tableLayout.render().outerHTML).toBe('<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="second" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '</div>');
        expect(tableLayout.getStackTrace()).toEqual({
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
        });
    });

    it("with children - second", function() {
        tableLayout = new TableLayout(2, 2);
        tableLayout.addChild(firstInput);
        tableLayout.addChild(secondInput);
        tableLayout.addChild(thirdInput);
        tableLayout.removeChild(secondInput);
        expect(tableLayout.hasClass(TableLayout.CLASS_LINEAR_LAYOUT)).toBeTruthy();
        expect(tableLayout.hasClass(TableLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(tableLayout.getChildrenCount()).toBe(2);
        expect(tableLayout.render().outerHTML).toBe('<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center">' +
            '<input type="text" name="first" class="input">' +
            '<input type="text" name="third" class="input">' +
            '</div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>');
        expect(tableLayout.getStackTrace()).toEqual({
            html: '<div class="layout linear-layout flex-vertical flex-center"></div>',
            name: "TableLayout",
            children: [
                {
                    html: '<div class="layout linear-layout flex-horizontal flex-center"></div>',
                    name: "TableLayout",
                    children: [
                        firstInput.getStackTrace(),
                        thirdInput.getStackTrace(),
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
        });
    });

    it("with children - second", function() {
        tableLayout = new TableLayout(2, 2);
        tableLayout.addChild(firstInput);
        tableLayout.addChild(secondInput);
        tableLayout.addChild(thirdInput);
        tableLayout.clearChildren();
        expect(tableLayout.hasClass(TableLayout.CLASS_LINEAR_LAYOUT)).toBeTruthy();
        expect(tableLayout.hasClass(TableLayout.CLASS_LAYOUT)).toBeTruthy();
        expect(tableLayout.getChildrenCount()).toBe(0);
        expect(tableLayout.render().outerHTML).toBe('<div class="layout linear-layout flex-vertical flex-center">' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '<div class="layout linear-layout flex-horizontal flex-center"></div>' +
            '</div>');
        expect(tableLayout.getStackTrace()).toEqual({
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
        });
    });
});