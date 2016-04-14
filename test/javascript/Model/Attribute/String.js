describe("String class tests - without limits, without pattern and not required", function() {

    var stringObject;

    var undefined;

    var type = "string";

    var name = "param";

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(name);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();

        expect(stringObject.getMaximumLength()).toBeUndefined();

        expect(stringObject.getPattern()).toBeUndefined();

        expect(stringObject.getName()).toBe(name);

        expect(stringObject.isRequired()).toBeFalsy();

        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
            minimumLength: undefined,
            maximumLength: undefined,
            pattern: undefined
        });

    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate string value", function() {
        var value = "value";

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate number value", function() {
        var value = 1;

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrowError(TypeError);
    });
});

describe("String class tests - without limits, without pattern and required", function() {

    var stringObject;

    var value = "value";

    var name = "param";

    var undefined;
    
    var type = "string";

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(name, value, true);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();

        expect(stringObject.getMaximumLength()).toBeUndefined();

        expect(stringObject.getPattern()).toBeUndefined();

        expect(stringObject.getName()).toBe(name);

        expect(stringObject.isRequired()).toBeTruthy();

        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: true,
            value: value,
            minimumLength: undefined,
            maximumLength: undefined,
            pattern: undefined
        });

    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate string value", function() {
        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });
});

describe("String class tests - with limits, without pattern and required", function() {

    var stringObject;

    var value = "value";

    var type = "string";

    var name = "param";

    var minimum = value.length * 2;

    var maximum = value.length * 4;

    var undefined;

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(name, value, true, minimum, maximum);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBe(minimum);

        expect(stringObject.getMaximumLength()).toBe(maximum);

        expect(stringObject.getPattern()).toBeUndefined();

        expect(stringObject.getName()).toBe(name);

        expect(stringObject.isRequired()).toBeTruthy();

        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: true,
            value: value,
            minimumLength: minimum,
            maximumLength: maximum,
            pattern: undefined
        });
    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate minimum length", function() {
        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate string value", function() {
        var helper = value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();

        helper += value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();

        helper += value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate maximum length", function() {
        var helper = value + value + value + value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).toThrowError(RangeError);
    });
});

describe("String class tests - with limits and not required", function() {

    var stringObject;

    var value = "value";

    var type = "string";

    var name = "param";

    var minimum = value.length * 2;

    var maximum = value.length * 4;

    var undefined;

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(name, value, false, minimum, maximum);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBe(minimum);

        expect(stringObject.getMaximumLength()).toBe(maximum);

        expect(stringObject.getPattern()).toBeUndefined();

        expect(stringObject.getName()).toBe(name);

        expect(stringObject.isRequired()).toBeFalsy();

        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: value,
            minimumLength: minimum,
            maximumLength: maximum,
            pattern: undefined
        });
    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate minimum length", function() {
        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate string value", function() {
        var helper = value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate maximum length", function() {
        var helper = value + value + value + value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).toThrowError(RangeError);
    });
});

describe("String class tests - without limits, with pattern and not required", function() {

    var stringObject;

    var undefined;

    var pattern = new RegExp("value", "g");

    var name = "param";

    var type = "string";

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(name, undefined, false, undefined, undefined, pattern);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();

        expect(stringObject.getMaximumLength()).toBeUndefined();

        expect(stringObject.getPattern()).toBe(pattern);

        expect(stringObject.getName()).toBe(name);

        expect(stringObject.isRequired()).toBeFalsy();

        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
            minimumLength: undefined,
            maximumLength: undefined,
            pattern: pattern
        });

    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate string value", function() {
        var value = "value";

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).not.toThrow();
    });

    it("validate invalid string value", function() {
        var value = "not";

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrowError(RangeError);
    });
});