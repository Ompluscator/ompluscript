describe("Model class tests - add string", function() {

    var modelObject;
    var name = "model";
    var type = "string";
    var paramName = "param";
    var value = "value";
    var minimumLength = 2;
    var maximumLength = 4;
    var pattern = new RegExp("value", "g");
    var required = true;

    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
                minimumLength: minimumLength,
                maximumLength: maximumLength,
                pattern: pattern,
            }
        ];

        modelObject = new Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: required,
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
    var required = true;

    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
                minimum: minimum,
                maximum: maximum,
                includeMinimum: included,
                includeMaximum: included
            }
        ];
        modelObject = new Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: required,
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
    var required = true;

    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
                minimum: minimum,
                maximum: maximum,
            }
        ];

        modelObject = new Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: required,
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
    var required = true;

    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
            }
        ];

        modelObject = new Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: required,
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
    var choices = [2, 3];
    var required = true;

    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
                choices: choices,
            }
        ];

        modelObject = new Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);

        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    choices: choices,
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
    var choices = [2, 3];
    var required = true;

    var Model = Ompluscript.Model.Container.Model;

    beforeAll(function() {
        var definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
                choices: choices,
            }
        ];

        modelObject = new Model(name, definition);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.getStackTrace()).toEqual({
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    choices: choices,
                }
            },
            name: name,
        });
    });
});