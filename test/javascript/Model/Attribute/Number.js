describe("Number class tests - without limits and not required", function() {

    var numberObject;

    var undefined;

    var type = "number";

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number();
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBeUndefined();

        expect(numberObject.getMaximum()).toBeUndefined();

        expect(numberObject.isRequired()).toBeFalsy();

        expect(numberObject.getStackTrace()).toEqual({
            type: type,
            required: false,
            value: undefined,
            minimum: undefined,
            maximum: undefined,
            includeMinimum: false,
            includeMaximum: false
        });

    });

    it("validate undefined value", function() {
        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();

        expect(function () {
            numberObject.validate();
        }).not.toThrow();
    });

    it("validate number value", function() {
        var value = 1.0;

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();
    });

    it("validate string value", function() {
        var value = "1";

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);

        expect(function () {
            numberObject.validate();
        }).toThrowError(TypeError);
    });
});

describe("Number class tests - without limits and required", function() {

    var numberObject;

    var undefined;

    var value = 2;

    var type = "number";

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(value, true);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBeUndefined();

        expect(numberObject.getMaximum()).toBeUndefined();

        expect(numberObject.isRequired()).toBeTruthy();

        expect(numberObject.getStackTrace()).toEqual({
            type: type,
            required: true,
            value: value,
            minimum: undefined,
            maximum: undefined,
            includeMinimum: false,
            includeMaximum: false
        });

    });

    it("validate undefined value", function() {
        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();

        expect(function () {
            numberObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate number value", function() {
        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();
    });
});

describe("Number class tests - without included limits and required", function() {

    var numberObject;

    var value = 3;

    var type = "number";

    var minimum = value * 2;

    var maximum = value * 4;

    var include = false;

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(value, true, minimum, include, maximum, include);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);

        expect(numberObject.getMaximum()).toBe(maximum);

        expect(numberObject.isRequired()).toBeTruthy();

        expect(numberObject.getStackTrace()).toEqual({
            type: type,
            required: true,
            value: value,
            minimum: minimum,
            maximum: maximum,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate minimum value", function() {
        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);

        expect(function () {
            numberObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate regular value", function() {

        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();
    });

    it("validate maximum length", function() {

        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);

        expect(function () {
            numberObject.validate();
        }).toThrowError(RangeError);
    });
});

describe("Number class tests - with included limits and required", function() {

    var numberObject;

    var value = 3;

    var type = "number";

    var minimum = value * 2;

    var maximum = value * 4;

    var include = true;

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(value, true, minimum, include, maximum, include);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);

        expect(numberObject.getMaximum()).toBe(maximum);

        expect(numberObject.isRequired()).toBeTruthy();

        expect(numberObject.getStackTrace()).toEqual({
            type: type,
            required: true,
            value: value,
            minimum: minimum,
            maximum: maximum,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate minimum value", function() {
        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);

        expect(function () {
            numberObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate regular value", function() {
        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();

        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();

        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();
    });

    it("validate maximum length", function() {
        numberObject.setValue(value * 5);

        expect(numberObject.getValue()).toBe(value * 5);

        expect(function () {
            numberObject.validate();
        }).toThrowError(RangeError);
    });
});