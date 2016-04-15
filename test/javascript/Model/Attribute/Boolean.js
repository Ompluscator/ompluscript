describe("Boolean class tests - initialization", function() {

    var undefined;

    var BooleanClass = Ompluscript.Model.Attribute.Boolean;

    it("validate valid configuration", function() {
        expect(function () {
            new BooleanClass("param");
        }).not.toThrow();

        expect(function () {
            new BooleanClass("param", true);
        }).not.toThrow();

        expect(function () {
            new BooleanClass("param", true, true);
        }).not.toThrow();
    });
});

describe("Boolean class tests - not required", function() {

    var booleanObject;

    var name = "param";

    var type = "boolean";
    
    var undefined;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        booleanObject = new Ompluscript.Model.Attribute.Boolean(name);
    });

    it("get configuration", function() {

        expect(booleanObject.isRequired()).toBeFalsy();

        expect(booleanObject.getName()).toBe(name);

        expect(booleanObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
        });

    });

    it("validate undefined value", function() {
        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();

        expect(function () {
            booleanObject.validate();
        }).not.toThrow();
    });

    it("validate boolean value", function() {
        var value = true;

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);

        expect(function () {
            booleanObject.validate();
        }).not.toThrow();
    });

    it("validate number value", function() {
        var value = 1;

        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_WRONG_TYPE,
            objectName: booleanObject.getName(),
        };

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);

        expect(function () {
            booleanObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });
});

describe("Boolean class tests - required", function() {

    var booleanObject;

    var value = true;
    
    var name = "param";
    
    var type = "boolean";

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        booleanObject = new Ompluscript.Model.Attribute.Boolean(name, value, true);
    });

    it("get configuration", function() {

        expect(booleanObject.isRequired()).toBeTruthy();

        expect(booleanObject.getName()).toBe(name);

        expect(booleanObject.getStackTrace()).toEqual({
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
            objectName: booleanObject.getName(),
        };

        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();

        expect(function () {
            booleanObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });

    it("validate boolean value", function() {
        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);

        expect(function () {
            booleanObject.validate();
        }).not.toThrow();
    });
});