describe("Datetime class tests - initialization", function() {
    
    var undefined;

    it("validate invalid minimum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "wrong");
        }).toThrowError(SyntaxError);
    });

    it("validate valid minimum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "1/11/1985");
        }).not.toThrow();
    });

    it("validate invalid maximum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "1/11/1985", "wrong");
        }).toThrowError(SyntaxError);
    });

    it("validate valid maximum configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Datetime("param", undefined, true, "1/11/1985", "1/10/1985");
        }).toThrowError(SyntaxError);
    });
});

describe("Datetime class tests - without limits and not required", function() {

    var datetimeObject;

    var undefined;

    var type = "string";

    var name = "param";

    beforeAll(function() {
        datetimeObject = new Ompluscript.Model.Attribute.Datetime(name);
    });

    it("get configuration", function() {
        expect(datetimeObject.getMinimum()).toBeUndefined();

        expect(datetimeObject.getMaximum()).toBeUndefined();

        expect(datetimeObject.getName()).toBe(name);

        expect(datetimeObject.isRequired()).toBeFalsy();

        expect(datetimeObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
            minimum: undefined,
            maximum: undefined,
            minimumObject: undefined,
            maximumObject: undefined
        });

    });

    it("validate undefined value", function() {
        datetimeObject.resetValue();

        expect(datetimeObject.getValue()).toBeUndefined();

        expect(function () {
            datetimeObject.validate();
        }).not.toThrow();
    });

    it("validate datetime value", function() {
        var value = "1/11/1985";

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);

        expect(function () {
            datetimeObject.validate();
        }).not.toThrow();
    });

    it("validate wrong date format value", function() {
        var value = "wrong";

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);

        expect(function () {
            datetimeObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate number value", function() {
        var value = 1.0;

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);

        expect(function () {
            datetimeObject.validate();
        }).toThrowError(TypeError);
    });
});

describe("Datetime class tests - without limits and required", function() {

    var datetimeObject;

    var undefined;

    var value = "1/11/1985";

    var type = "string";

    var name = "param";

    beforeAll(function() {
        datetimeObject = new Ompluscript.Model.Attribute.Datetime(name, value, true);
    });

    it("get configuration", function() {
        expect(datetimeObject.getMinimum()).toBeUndefined();

        expect(datetimeObject.getMaximum()).toBeUndefined();

        expect(datetimeObject.getName()).toBe(name);

        expect(datetimeObject.isRequired()).toBeTruthy();

        expect(datetimeObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: true,
            value: value,
            minimum: undefined,
            maximum: undefined,
            minimumObject: undefined,
            maximumObject: undefined
        });

    });

    it("validate undefined value", function() {
        datetimeObject.resetValue();

        expect(datetimeObject.getValue()).toBeUndefined();

        expect(function () {
            datetimeObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate number value", function() {
        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);

        expect(function () {
            datetimeObject.validate();
        }).not.toThrow();
    });
});

describe("Datetime class tests - with limits and required", function() {

    var datetimeObject;

    var value = "1/11/1985";

    var type = "string";

    var name = "param";

    var minimum = "1/10/1985";

    var maximum = "1/12/1985";

    beforeAll(function() {
        datetimeObject = new Ompluscript.Model.Attribute.Datetime(name, value, true, minimum, maximum);
    });

    it("get configuration", function() {
        expect(datetimeObject.getMinimum()).toBe(minimum);

        expect(datetimeObject.getMaximum()).toBe(maximum);

        expect(datetimeObject.getName()).toBe(name);

        expect(datetimeObject.isRequired()).toBeTruthy();

        expect(datetimeObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: true,
            value: value,
            minimum: minimum,
            maximum: maximum,
            minimumObject: new Date(minimum),
            maximumObject: new Date(maximum)
        });
    });

    it("validate minimum value", function() {
        datetimeObject.setValue("1/09/1985");

        expect(datetimeObject.getValue()).toBe("1/09/1985");

        expect(function () {
            datetimeObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate regular value", function() {

        datetimeObject.setValue(minimum);

        expect(datetimeObject.getValue()).toBe(minimum);

        expect(function () {
            datetimeObject.validate();
        }).not.toThrow();

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);

        expect(function () {
            datetimeObject.validate();
        }).not.toThrow();

        datetimeObject.setValue(maximum);

        expect(datetimeObject.getValue()).toBe(maximum);

        expect(function () {
            datetimeObject.validate();
        }).not.toThrow();
    });

    it("validate maximum length", function() {

        datetimeObject.setValue("1/13/1985");

        expect(datetimeObject.getValue()).toBe("1/13/1985");

        expect(function () {
            datetimeObject.validate();
        }).toThrowError(RangeError);
    });
});