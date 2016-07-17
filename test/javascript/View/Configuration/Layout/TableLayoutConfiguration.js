describe("TableLayoutConfiguration class tests - valid TableLayout", function() {

    var tableLayoutConfiguration;

    var TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
    var TableLayout = Ompluscript.View.Layout.TableLayout;

    beforeAll(function() {
        tableLayoutConfiguration = new TableLayoutConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "TableLayout"
        };
        expect(tableLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableLayoutConfiguration.getErrors(definition)).toEqual([]);
        var tableLayout = tableLayoutConfiguration.create(definition);
        expect(tableLayout instanceof TableLayout).toBeTruthy();
        expect(tableLayout.getName()).toBe("TableLayout");
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
                }
            ],
            align: TableLayout.ALIGN_CENTER,
            direction: TableLayout.DIRECTION_VERTICAL,
            reverse: false,
            rows: 1,
            cells: 1
        });
    });

    it("invalid - first", function() {
        var definition = {
            type: "TableLayout",
            rows: 2,
            cells: 3
        };
        expect(tableLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableLayoutConfiguration.getErrors(definition)).toEqual([]);
        var tableLayout = tableLayoutConfiguration.create(definition);
        expect(tableLayout instanceof TableLayout).toBeTruthy();
        expect(tableLayout.getName()).toBe("TableLayout");
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
                }
            ],
            align: TableLayout.ALIGN_CENTER,
            direction: TableLayout.DIRECTION_VERTICAL,
            reverse: false,
            rows: 2,
            cells: 3
        });
    });
});

describe("TableLayoutConfiguration class tests - invalid TableLayout", function() {

    var tableLayoutConfiguration;

    var TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
    var TableLayout = Ompluscript.View.Layout.TableLayout;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        tableLayoutConfiguration = new TableLayoutConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "TableLayout",
            rows: "not",
            cells: false
        };
        expect(tableLayoutConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableLayoutConfiguration.getErrors(definition)).toEqual([
            "TableLayout." + TableLayout.PARAMETER_ROWS + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "TableLayout." + TableLayout.PARAMETER_CELLS + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
        ]);
    });
});