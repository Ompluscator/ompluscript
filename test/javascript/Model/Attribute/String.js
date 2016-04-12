describe("String class tests - without limits and not required", function() {

    var stringObject;

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String();
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();

        expect(stringObject.getMaximumLength()).toBeUndefined();

        expect(stringObject.isRequired()).toBeFalsy();

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

describe("String class tests - without limits and required", function() {

    var stringObject;

    var value = "value";

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(value, true);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();

        expect(stringObject.getMaximumLength()).toBeUndefined();

        expect(stringObject.isRequired()).toBeTruthy();

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

describe("String class tests - with limits and required", function() {

    var stringObject;

    var value = "value";

    var type = "string";

    var minimum = value.length * 2;

    var maximum = value.length * 4;

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(value, true, minimum, maximum);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBe(minimum);

        expect(stringObject.getMaximumLength()).toBe(maximum);

        expect(stringObject.isRequired()).toBeTruthy();

        expect(stringObject.getStackTrace()).toEqual({
            type: type,
            required: true,
            value: value,
            minimumLength: minimum,
            maximumLength: maximum,
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

    var minimum = value.length * 2;

    var maximum = value.length * 4;

    beforeAll(function() {
        stringObject = new Ompluscript.Model.Attribute.String(value, false, minimum, maximum);
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBe(minimum);

        expect(stringObject.getMaximumLength()).toBe(maximum);

        expect(stringObject.isRequired()).toBeFalsy();

        expect(stringObject.getStackTrace()).toEqual({
            type: type,
            required: false,
            value: value,
            minimumLength: minimum,
            maximumLength: maximum,
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