describe("String class tests - initialization", function() {

    var undefined;

    var StringClass = Ompluscript.Model.Attribute.String;

    var General = Ompluscript.Core.Utils.General;

    it("validate invalid minimum configuration", function() {
        var minimumLength = "1";

        var parameters = {
            classType: StringClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                minimumLength: minimumLength
            }
        };

        expect(function () {
            new StringClass("param", undefined, false, minimumLength);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate invalid name configuration", function() {
        var maximumLength = "1";

        var parameters = {
            classType: StringClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                maximumLength: maximumLength
            }
        };

        expect(function () {
            new StringClass("param", undefined, false, 1, maximumLength);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate invalid minimum and maximum configuration", function() {
        var minimumLength = 10;
        var maximumLength = 9;

        var parameters = {
            classType: StringClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                maximumLength: maximumLength,
                minimumLength: minimumLength
            }
        };

        expect(function () {
            new StringClass("param", undefined, false, minimumLength, maximumLength);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate invalid pattern configuration", function() {
        var pattern = "1";

        var parameters = {
            classType: StringClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                pattern: pattern
            }
        };

        expect(function () {
            new StringClass("param", undefined, false, 1, 2, pattern);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate valid configuration", function() {
        expect(function () {
            new StringClass("param");
        }).not.toThrow();

        expect(function () {
            new StringClass("param", "value");
        }).not.toThrow();

        expect(function () {
            new StringClass("param", "value", true);
        }).not.toThrow();

        expect(function () {
            new StringClass("param", "value", true, 1);
        }).not.toThrow();

        expect(function () {
            new StringClass("param", "value", true, 1, 2);
        }).not.toThrow();

        expect(function () {
            new StringClass("param", "value", true, 1, 2, new RegExp("pattern", "g"));
        }).not.toThrow();
    });
});

describe("String class tests - without limits, without pattern and not required", function() {

    var stringObject;

    var undefined;

    var type = "string";

    var name = "param";

    var UnitClass = Ompluscript.Model.Attribute.Unit;

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

        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_WRONG_TYPE,
            objectName: stringObject.getName(),
        };

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });
});

describe("String class tests - without limits, without pattern and required", function() {

    var stringObject;

    var value = "value";

    var name = "param";

    var undefined;
    
    var type = "string";

    var StringClass = Ompluscript.Model.Attribute.String;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

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

        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_IS_REQUIRED,
            objectName: stringObject.getName(),
        };

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
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

    var StringClass = Ompluscript.Model.Attribute.String;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

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
        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_IS_REQUIRED,
            objectName: stringObject.getName(),
        };

        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();

        expect(function () {
            stringObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });

    it("validate minimum length", function() {
        stringObject.setValue(value);

        var parameters = {
            classType: StringClass.name,
            code: StringClass.ERROR_BELOW_MINIMUM_LENGTH,
            objectName: stringObject.getName(),
        };

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrow(RangeError(JSON.stringify(parameters)));
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

        var parameters = {
            classType: StringClass.name,
            code: StringClass.ERROR_OVER_MAXIMUM_LENGTH,
            objectName: stringObject.getName(),
        };

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
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

    var StringClass = Ompluscript.Model.Attribute.String;

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
        var parameters = {
            classType: StringClass.name,
            code: StringClass.ERROR_BELOW_MINIMUM_LENGTH,
            objectName: stringObject.getName(),
        };

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
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
        var parameters = {
            classType: StringClass.name,
            code: StringClass.ERROR_OVER_MAXIMUM_LENGTH,
            objectName: stringObject.getName(),
        };

        var helper = value + value + value + value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);

        expect(function () {
            stringObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});

describe("String class tests - without limits, with pattern and not required", function() {

    var stringObject;

    var undefined;

    var pattern = new RegExp("value", "g");

    var name = "param";

    var type = "string";

    var StringClass = Ompluscript.Model.Attribute.String;

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

        var parameters = {
            classType: StringClass.name,
            code: StringClass.ERROR_PATTERN_NOT_MATCH,
            objectName: stringObject.getName(),
        };

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);

        expect(function () {
            stringObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});