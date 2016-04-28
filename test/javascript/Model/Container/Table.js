describe("Table class tests - creation", function() {

    var undefined;
    var tableObject;
    var name = "table";
    var type = ["string", "boolean", "number", "datetime"];
    var paramName = ["param1", "param2", "param3", "param4"];
    var values = [
        {
            param1: "first",
            param2: true,
            param3: 5,
            param4: "1/11/1985"
        },
        {
            param1: "second",
            param2: false,
            param3: 4,
            param4: "1/12/1985"
        },
    ];
    var minimum = [2, undefined, 2, "1/10/1985"];
    var maximum = [6, undefined, 6, "1/13/1985"];
    var additional = [/value/, undefined, true, undefined];
    var required = true;
    var definition;
    var dummy = {
        test: function (index, model) {}
    };

    var Model = Ompluscript.Model.Container.Model;
    var Table = Ompluscript.Model.Container.Table;

    beforeAll(function() {
        definition = [
            {
                name: paramName[0],
                required: required,
                type: type[0],
                minimumLength: minimum[0],
                maximumLength: maximum[0],
                pattern: additional[0],
            },
            {
                name: paramName[1],
                required: required,
                type: type[1],
            },
            {
                name: paramName[2],
                required: required,
                type: type[2],
                minimum: minimum[2],
                includeMinimum: additional[2],
                maximum: maximum[2],
                includeMaximum: additional[2],
            },
            {
                name: paramName[3],
                required: required,
                type: type[3],
                minimum: minimum[3],
                maximum: maximum[3],
            }
        ];

        tableObject = new Table(name, definition);
    });

    beforeEach(function() {
        tableObject.clearRows();
        spyOn(dummy, 'test');
    });

    it("get configuration", function() {
        expect(tableObject.getName()).toBe(name);
        expect(tableObject.count()).toBe(0);
        expect(tableObject.hasRowOnIndex(0)).toBeFalsy();
        expect(tableObject.getRowByIndex(0)).toBeUndefined();
        expect(tableObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            rows: [],
        });
    });

    it("add one row", function() {
        tableObject.addRow(values[0]);

        expect(tableObject.count()).toBe(1);
        expect(tableObject.hasRowOnIndex(0)).toBeTruthy();
        expect(tableObject.getRowByIndex(0) instanceof Model).toBeTruthy();
        expect(tableObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            rows: [
                {
                    definition: definition,
                    name: name,
                    attributes: {
                        param1: {
                            name: paramName[0],
                            required: required,
                            type: type[0],
                            value: values[0]["param1"],
                            minimumLength: minimum[0],
                            maximumLength: maximum[0],
                            pattern: additional[0],
                        },
                        param2: {
                            name: paramName[1],
                            required: required,
                            type: type[1],
                            value: values[0]["param2"],
                        },
                        param3: {
                            name: paramName[2],
                            required: required,
                            type: type[2],
                            value: values[0]["param3"],
                            minimum: minimum[2],
                            includeMinimum: additional[2],
                            maximum: maximum[2],
                            includeMaximum: additional[2],
                        },
                        param4: {
                            name: paramName[3],
                            required: required,
                            type: type[0],
                            value: values[0]["param4"],
                            minimum: minimum[3],
                            minimumObject: new Date(minimum[3]),
                            maximum: maximum[3],
                            maximumObject: new Date(maximum[3]),
                        }
                    },
                }
            ],
        });

        tableObject.each(dummy.test);
        expect(dummy.test.calls.argsFor(0)).toEqual([0, tableObject.getRowByIndex(0)]);
        expect(dummy.test.calls.count()).toBe(1);
    });

    it("add two rows", function() {
        tableObject.addRow(values[0]);
        tableObject.addRow(values[1]);

        expect(tableObject.count()).toBe(2);
        expect(tableObject.hasRowOnIndex(0)).toBeTruthy();
        expect(tableObject.getRowByIndex(0) instanceof Model).toBeTruthy();
        expect(tableObject.hasRowOnIndex(1)).toBeTruthy();
        expect(tableObject.getRowByIndex(1) instanceof Model).toBeTruthy();
        expect(tableObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            rows: [
                {
                    definition: definition,
                    name: name,
                    attributes: {
                        param1: {
                            name: paramName[0],
                            required: required,
                            type: type[0],
                            value: values[0]["param1"],
                            minimumLength: minimum[0],
                            maximumLength: maximum[0],
                            pattern: additional[0],
                        },
                        param2: {
                            name: paramName[1],
                            required: required,
                            type: type[1],
                            value: values[0]["param2"],
                        },
                        param3: {
                            name: paramName[2],
                            required: required,
                            type: type[2],
                            value: values[0]["param3"],
                            minimum: minimum[2],
                            includeMinimum: additional[2],
                            maximum: maximum[2],
                            includeMaximum: additional[2],
                        },
                        param4: {
                            name: paramName[3],
                            required: required,
                            type: type[0],
                            value: values[0]["param4"],
                            minimum: minimum[3],
                            minimumObject: new Date(minimum[3]),
                            maximum: maximum[3],
                            maximumObject: new Date(maximum[3]),
                        }
                    },
                },
                {
                    definition: definition,
                    name: name,
                    attributes: {
                        param1: {
                            name: paramName[0],
                            required: required,
                            type: type[0],
                            value: values[1]["param1"],
                            minimumLength: minimum[0],
                            maximumLength: maximum[0],
                            pattern: additional[0],
                        },
                        param2: {
                            name: paramName[1],
                            required: required,
                            type: type[1],
                            value: values[1]["param2"],
                        },
                        param3: {
                            name: paramName[2],
                            required: required,
                            type: type[2],
                            value: values[1]["param3"],
                            minimum: minimum[2],
                            includeMinimum: additional[2],
                            maximum: maximum[2],
                            includeMaximum: additional[2],
                        },
                        param4: {
                            name: paramName[3],
                            required: required,
                            type: type[0],
                            value: values[1]["param4"],
                            minimum: minimum[3],
                            minimumObject: new Date(minimum[3]),
                            maximum: maximum[3],
                            maximumObject: new Date(maximum[3]),
                        }
                    },
                }
            ],
        });

        tableObject.each(dummy.test);
        expect(dummy.test.calls.argsFor(0)).toEqual([0, tableObject.getRowByIndex(0)]);
        expect(dummy.test.calls.argsFor(1)).toEqual([1, tableObject.getRowByIndex(1)]);
        expect(dummy.test.calls.count()).toBe(2);
    });

    it("add two row and remove first", function() {
        tableObject.addRow(values[0]);
        tableObject.addRow(values[1]);
        tableObject.removeRowByIndex(0);

        expect(tableObject.count()).toBe(1);
        expect(tableObject.hasRowOnIndex(0)).toBeTruthy();
        expect(tableObject.getRowByIndex(0) instanceof Model).toBeTruthy();
        expect(tableObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            rows: [
                {
                    definition: definition,
                    name: name,
                    attributes: {
                        param1: {
                            name: paramName[0],
                            required: required,
                            type: type[0],
                            value: values[1]["param1"],
                            minimumLength: minimum[0],
                            maximumLength: maximum[0],
                            pattern: additional[0],
                        },
                        param2: {
                            name: paramName[1],
                            required: required,
                            type: type[1],
                            value: values[1]["param2"],
                        },
                        param3: {
                            name: paramName[2],
                            required: required,
                            type: type[2],
                            value: values[1]["param3"],
                            minimum: minimum[2],
                            includeMinimum: additional[2],
                            maximum: maximum[2],
                            includeMaximum: additional[2],
                        },
                        param4: {
                            name: paramName[3],
                            required: required,
                            type: type[0],
                            value: values[1]["param4"],
                            minimum: minimum[3],
                            minimumObject: new Date(minimum[3]),
                            maximum: maximum[3],
                            maximumObject: new Date(maximum[3]),
                        }
                    },
                }
            ],
        });

        tableObject.each(dummy.test);
        expect(dummy.test.calls.argsFor(0)).toEqual([0, tableObject.getRowByIndex(0)]);
        expect(dummy.test.calls.count()).toBe(1);
    });
});

describe("Table class tests - events", function() {

    var tableObject;
    var definition = [
        {
            name: "param",
            required: true,
            type: "string",
        }
    ];

    var Table = Ompluscript.Model.Container.Table;
    var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
    var OnClearTable = Ompluscript.Model.Event.OnClearTable;
    var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;

    beforeAll(function() {
        tableObject = new Table(name, definition);
    });

    beforeEach(function() {
        tableObject.clearRows();
        spyOn(tableObject, 'notifyObservers');
    });

    it("events", function() {
        tableObject.addRow({"param": "first"});
        tableObject.addRow({"param": "second"});

        var firstOnAddRowToTable = new OnAddRowToTable(tableObject, 0, tableObject.getRowByIndex(0));
        var secondOnAddRowToTable = new OnAddRowToTable(tableObject, 1, tableObject.getRowByIndex(1));

        expect(tableObject.notifyObservers.calls.argsFor(0)).toEqual([firstOnAddRowToTable]);
        expect(tableObject.notifyObservers.calls.argsFor(1)).toEqual([secondOnAddRowToTable]);

        tableObject.removeRowByIndex(0);

        var onRemoveRowFromTable = new OnRemoveRowFromTable(tableObject, 0);

        expect(tableObject.notifyObservers.calls.argsFor(2)).toEqual([onRemoveRowFromTable]);

        tableObject.clearRows();

        var onClearTable = new OnClearTable(tableObject);

        expect(tableObject.notifyObservers.calls.argsFor(3)).toEqual([onClearTable]);
        expect(tableObject.notifyObservers.calls.count()).toBe(4);
    });
});