describe("Model class tests - initialization", function() {

    var Model = Ompluscript.Model.Model;

    var General = Ompluscript.Core.Utils.General;

    it("validate invalid configuration", function() {
        var definition = [
            {
                type: "wrong1"
            },
            {
                type: "number",
                name: "number"
            },
            {
                type: "wrong2"
            }
        ];

        var parameters = {
            classType: Model.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: [
                {
                    classType: Model.name,
                    code: 1,
                    variables: {
                        type: "wrong1"
                    }
                },
                {
                    classType: Model.name,
                    code: 1,
                    variables: {
                        type: "wrong2"
                    }
                }
            ]
        };

        spyOn(Model.prototype, "addNumber");

        expect(function () {
            new Model("model", definition);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));

        try {
            new Model("model", definition);
        } catch (ex) {}

        expect(Model.prototype.addNumber).toHaveBeenCalledWith({
                type: "number",
                name: "number"
            });
    });

    it("validate valid configuration", function() {
        var definition = [
            {
                type: "string",
                name: "string"
            },
            {
                type: "number",
                name: "number"
            },
            {
                type: "boolean",
                name: "boolean"
            },
            {
                type: "datetime",
                name: "datetime"
            },
            {
                type: "singleChoice",
                name: "singleChoice"
            },
            {
                type: "multipleChoice",
                name: "multipleChoice"
            }
        ];

        spyOn(Model.prototype, "addString");
        spyOn(Model.prototype, "addNumber");
        spyOn(Model.prototype, "addBoolean");
        spyOn(Model.prototype, "addDatetime");
        spyOn(Model.prototype, "addSingleChoice");
        spyOn(Model.prototype, "addMultipleChoice");

        expect(function () {
            new Model("model", definition);
        }).not.toThrow();

        new Model("model", definition);

        expect(Model.prototype.addString).toHaveBeenCalledWith({
            type: "string",
            name: "string"
        });
        expect(Model.prototype.addNumber).toHaveBeenCalledWith({
            type: "number",
            name: "number"
        });
        expect(Model.prototype.addBoolean).toHaveBeenCalledWith({
            type: "boolean",
            name: "boolean"
        });
        expect(Model.prototype.addDatetime).toHaveBeenCalledWith({
            type: "datetime",
            name: "datetime"
        });
        expect(Model.prototype.addSingleChoice).toHaveBeenCalledWith({
            type: "singleChoice",
            name: "singleChoice"
        });
        expect(Model.prototype.addMultipleChoice).toHaveBeenCalledWith({
            type: "multipleChoice",
            name: "multipleChoice"
        });
    });
});

describe("Model class tests - add string", function() {

    var modelObject;

    var name = "model";

    var type = "string";

    var paramName = "param";

    var value = "value";

    var minimumLength = 2;

    var maximumLength = 4;

    var pattern = new RegExp("value", "g");

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: true,
                type: type,
                value: value,
                minimumLength: minimumLength,
                maximumLength: maximumLength,
                pattern: pattern,
            }
        ];

        modelObject = new Ompluscript.Model.Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: true,
                    type: type,
                    value: value,
                    minimumLength: minimumLength,
                    maximumLength: maximumLength,
                    pattern: pattern,
                }
            },
            name: name,
        });

    });
});

describe("Model class tests - add number", function() {

    var modelObject;

    var name = "model";

    var type = "number";

    var paramName = "param";

    var value = 3;

    var minimum = 2;

    var maximum = 4;

    var included = true;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: true,
                type: type,
                value: value,
                minimum: minimum,
                maximum: maximum,
                includeMinimum: included,
                includeMaximum: included
            }
        ];

        modelObject = new Ompluscript.Model.Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: true,
                    type: type,
                    value: value,
                    minimum: minimum,
                    maximum: maximum,
                    includeMinimum: included,
                    includeMaximum: included
                }
            },
            name: name,
        });

    });
});

describe("Model class tests - add datetime", function() {

    var modelObject;

    var name = "model";

    var type = "datetime";

    var paramName = "param";

    var value = "1/11/1985";

    var minimum = "1/10/1985";

    var maximum = "1/12/1985";

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: true,
                type: type,
                value: value,
                minimum: minimum,
                maximum: maximum,
            }
        ];

        modelObject = new Ompluscript.Model.Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: true,
                    type: "string",
                    value: value,
                    minimum: minimum,
                    maximum: maximum,
                    minimumObject: new Date(minimum),
                    maximumObject: new Date(maximum)
                }
            },
            name: name,
        });

    });
});

describe("Model class tests - add boolean", function() {

    var modelObject;

    var name = "model";

    var type = "boolean";

    var paramName = "param";

    var value = true;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: true,
                type: type,
                value: value,
            }
        ];

        modelObject = new Ompluscript.Model.Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: true,
                    type: type,
                    value: value,
                }
            },
            name: name,
        });

    });
});

describe("Model class tests - add singleChoice", function() {

    var modelObject;

    var name = "model";

    var type = "singleChoice";

    var paramName = "param";

    var value = 3;

    var values = [2, 3];

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: true,
                type: type,
                value: value,
                values: values,
            }
        ];

        modelObject = new Ompluscript.Model.Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: true,
                    type: "number",
                    value: value,
                    values: values,
                }
            },
            name: name,
        });

    });
});

describe("Model class tests - add multipleChoice", function() {

    var modelObject;

    var name = "model";

    var type = "multipleChoice";

    var paramName = "param";

    var value = [3];

    var values = [2, 3];

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: true,
                type: type,
                value: value,
                values: values,
            }
        ];

        modelObject = new Ompluscript.Model.Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: true,
                    type: "number",
                    value: value,
                    values: values,
                }
            },
            name: name,
        });

    });
});