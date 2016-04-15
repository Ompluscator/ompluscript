describe("Number class tests - initialization", function() {

    var undefined;

    var NumberClass = Ompluscript.Model.Attribute.Number;

    var General = Ompluscript.Core.Utils.General;

    it("validate invalid minimum and maximum configuration", function() {
        var minimum = 1.01;
        var maximum = 1;

        var parameters = {
            classType: NumberClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                maximum: maximum,
                minimum: minimum
            }
        };

        expect(function () {
            new NumberClass("param", undefined, true, minimum, true, maximum, true);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));

        expect(function () {
            new NumberClass("param", undefined, true, minimum, false, maximum, true);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate invalid minimum and maximum configuration", function() {
        var minimum = 1;
        var maximum = 1;

        var parameters = {
            classType: NumberClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                maximum: maximum,
                minimum: minimum
            }
        };

        expect(function () {
            new NumberClass("param", undefined, true, minimum, false, maximum, true);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));

        expect(function () {
            new NumberClass("param", undefined, true, minimum, true, maximum, false);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));

        expect(function () {
            new NumberClass("param", undefined, true, minimum, false, maximum, false);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate valid configuration", function() {
        expect(function () {
            new NumberClass("param");
        }).not.toThrow();

        expect(function () {
            new NumberClass("param", 1);
        }).not.toThrow();

        expect(function () {
            new NumberClass("param", undefined, true);
        }).not.toThrow();

        expect(function () {
            new NumberClass("param", undefined, true, 1);
        }).not.toThrow();

        expect(function () {
            new NumberClass("param", undefined, true, 1, true);
        }).not.toThrow();

        expect(function () {
            new NumberClass("param", undefined, true, 1, true, 2);
        }).not.toThrow();

        expect(function () {
            new NumberClass("param", undefined, true, 1, true, 2, true);
        }).not.toThrow();
    });
});

describe("Number class tests - without limits and not required", function() {

    var numberObject;

    var undefined;

    var type = "number";
    
    var name = "param";

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(name);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBeUndefined();

        expect(numberObject.getMaximum()).toBeUndefined();

        expect(numberObject.getName()).toBe(name);

        expect(numberObject.isRequired()).toBeFalsy();

        expect(numberObject.getStackTrace()).toEqual({
            name: name,
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

        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_WRONG_TYPE,
            objectName: numberObject.getName(),
        };

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);

        expect(function () {
            numberObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });
});

describe("Number class tests - without limits and required", function() {

    var numberObject;

    var undefined;

    var value = 2;

    var type = "number";
    
    var name = "param";

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(name, value, true);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBeUndefined();

        expect(numberObject.getMaximum()).toBeUndefined();

        expect(numberObject.getName()).toBe(name);

        expect(numberObject.isRequired()).toBeTruthy();

        expect(numberObject.getStackTrace()).toEqual({
            name: name,
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
        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_IS_REQUIRED,
            objectName: numberObject.getName(),
        };

        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();

        expect(function () {
            numberObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
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

    var name = "param";

    var minimum = value * 2;

    var maximum = value * 4;

    var include = false;

    var NumberClass = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(name, value, true, minimum, include, maximum, include);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);

        expect(numberObject.getMaximum()).toBe(maximum);

        expect(numberObject.getName()).toBe(name);

        expect(numberObject.isRequired()).toBeTruthy();

        expect(numberObject.getStackTrace()).toEqual({
            name: name,
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
        var parameters = {
            classType: NumberClass.name,
            code: NumberClass.ERROR_BELOW_MINIMUM,
            objectName: numberObject.getName(),
        };

        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);

        expect(function () {
            numberObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });

    it("validate regular value", function() {

        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);

        expect(function () {
            numberObject.validate();
        }).not.toThrow();
    });

    it("validate maximum length", function() {
        var parameters = {
            classType: NumberClass.name,
            code: NumberClass.ERROR_OVER_MAXIMUM,
            objectName: numberObject.getName(),
        };

        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);

        expect(function () {
            numberObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});

describe("Number class tests - with included limits and required", function() {

    var numberObject;

    var value = 3;

    var type = "number";

    var name = "param";

    var minimum = value * 2;

    var maximum = value * 4;

    var include = true;

    var NumberClass = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberObject = new Ompluscript.Model.Attribute.Number(name, value, true, minimum, include, maximum, include);
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);

        expect(numberObject.getMaximum()).toBe(maximum);

        expect(numberObject.getName()).toBe(name);

        expect(numberObject.isRequired()).toBeTruthy();

        expect(numberObject.getStackTrace()).toEqual({
            name: name,
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
        var parameters = {
            classType: NumberClass.name,
            code: NumberClass.ERROR_BELOW_MINIMUM,
            objectName: numberObject.getName(),
        };

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);

        expect(function () {
            numberObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
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
        var parameters = {
            classType: NumberClass.name,
            code: NumberClass.ERROR_OVER_MAXIMUM,
            objectName: numberObject.getName(),
        };

        numberObject.setValue(value * 5);

        expect(numberObject.getValue()).toBe(value * 5);

        expect(function () {
            numberObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});