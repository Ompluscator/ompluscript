describe("Model class tests - add string", function() {

    var modelObject;
    var name = "model";
    var type = "String";
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
                    name: name + "." + paramName,
                    required: required,
                    type: "string",
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
    var type = Number.name;

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
                    name: name + "." + paramName,
                    required: required,
                    type: "number",
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
    var paramName = "param";
    var value = "1/11/1985";
    var minimum = "1/10/1985";
    var maximum = "1/12/1985";
    var required = true;
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var type = Datetime.name;

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
                    name: name + "." + paramName,
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
    var paramName = "param";
    var value = true;
    var required = true;
    var undefined;
    var definition;
    var mustBeTrue = true;

    var Model = Ompluscript.Model.Container.Model;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var type = Boolean.name;

    beforeAll(function() {
        definition = [
            {
                name: paramName,
                required: required,
                type: type,
                value: value,
                mustBeTrue: mustBeTrue,
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
                    name: name + "." + paramName,
                    required: required,
                    type: "boolean",
                    value: value,
                    mustBeTrue: mustBeTrue,
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
    var paramName = "param";
    var value = 3;
    var choices = [2, 3];
    var required = true;
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    var type = SingleChoice.name;

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
                    name: name + "." + paramName,
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
    var paramName = "param";
    var value = [3];
    var choices = [2, 3];
    var required = true;
    var undefined;
    var definition;

    var Model = Ompluscript.Model.Container.Model;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    var type = MultipleChoice.name;

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
                    name: name + "." + paramName,
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