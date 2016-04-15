describe("Unit class tests - initialization", function() {

    var undefined;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    var General = Ompluscript.Core.Utils.General;

    it("validate invalid type configuration", function() {
        var type = 1;

        var parameters = {
            classType: UnitClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                type: type
            }
        };

        expect(function () {
            new Ompluscript.Model.Attribute.Unit(type, "param");
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate invalid name configuration", function() {
        var name = 1;

        var parameters = {
            classType: UnitClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                name: name
            }
        };

        expect(function () {
            new Ompluscript.Model.Attribute.Unit("string", name);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate invalid required configuration", function() {
        var required = 1;

        var parameters = {
            classType: UnitClass.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                required: required
            }
        };

        expect(function () {
            new Ompluscript.Model.Attribute.Unit("string", "param", undefined, required);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate valid configuration", function() {
        expect(function () {
            new Ompluscript.Model.Attribute.Unit("boolean", "param", undefined, true);
        }).not.toThrow();

        expect(function () {
            new Ompluscript.Model.Attribute.Unit("boolean", "param");
        }).not.toThrow();
    });
});

describe("Unit class tests - not required", function() {

    var unitObject;

    var name = "param";

    var type = "boolean";

    var undefined;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        unitObject = new Ompluscript.Model.Attribute.Unit(type, name);
    });

    it("get configuration", function() {

        expect(unitObject.isRequired()).toBeFalsy();

        expect(unitObject.getName()).toBe(name);

        expect(unitObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
        });

    });

    it("validate undefined value", function() {
        unitObject.resetValue();

        expect(unitObject.getValue()).toBeUndefined();

        expect(function () {
            unitObject.validate();
        }).not.toThrow();
    });

    it("validate boolean value", function() {
        var value = true;

        unitObject.setValue(value);

        expect(unitObject.getValue()).toBe(value);

        expect(function () {
            unitObject.validate();
        }).not.toThrow();
    });

    it("validate number value", function() {
        var value = 1;

        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_WRONG_TYPE,
            objectName: unitObject.getName(),
        };

        unitObject.setValue(value);

        expect(unitObject.getValue()).toBe(value);

        expect(function () {
            unitObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });
});

describe("Unit class tests - required", function() {

    var unitObject;

    var value = true;

    var name = "param";

    var type = "boolean";

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        unitObject = new Ompluscript.Model.Attribute.Unit(type, name, value, true);
    });

    it("get configuration", function() {

        expect(unitObject.isRequired()).toBeTruthy();

        expect(unitObject.getName()).toBe(name);

        expect(unitObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: true,
            value: value,
        });

    });

    it("validate undefined value", function() {
        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_IS_REQUIRED,
            objectName: unitObject.getName(),
        };

        unitObject.resetValue();

        expect(unitObject.getValue()).toBeUndefined();

        expect(function () {
            unitObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });

    it("validate boolean value", function() {
        unitObject.setValue(value);

        expect(unitObject.getValue()).toBe(value);

        expect(function () {
            unitObject.validate();
        }).not.toThrow();
    });
});