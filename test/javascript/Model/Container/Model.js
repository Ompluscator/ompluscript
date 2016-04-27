describe("Model class tests - add string", function() {

    var modelObject;
    var name = "model";
    var type = "string";
    var paramName = "param";
    var value = "value";
    var minimumLength = 2;
    var maximumLength = 6;
    var pattern = /value/;
    var required = true;
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        definition = [
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
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof String).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
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
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.validate()).toBeFalsy();
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
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        definition = [
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
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof Number).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
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
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.validate()).toBeFalsy();
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
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var Datetime = Ompluscript.Model.Attribute.Datetime;

    beforeAll(function() {
        definition = [
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
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof Datetime).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
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
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.validate()).toBeFalsy();
    });
});

describe("Model class tests - add boolean", function() {

    var modelObject;
    var name = "model";
    var type = "boolean";
    var paramName = "param";
    var value = true;
    var required = true;
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var Boolean = Ompluscript.Model.Attribute.Boolean;

    beforeAll(function() {
        definition = [
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
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof Boolean).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: type,
                    value: value,
                }
            },
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.validate()).toBeFalsy();
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
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        definition = [
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
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof SingleChoice).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    choices: choices,
                }
            },
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.validate()).toBeFalsy();
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
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    beforeAll(function() {
        definition = [
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
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof MultipleChoice).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            definition: definition,
            name: name,
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    choices: choices,
                }
            },
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.validate()).toBeFalsy();
    });
});