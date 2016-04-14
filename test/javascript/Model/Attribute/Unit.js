describe("Unit class tests - not required", function() {

    var unitObject;

    var name = "param";

    var type = "boolean";

    var undefined;

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

        unitObject.setValue(value);

        expect(unitObject.getValue()).toBe(value);

        expect(function () {
            unitObject.validate();
        }).toThrowError(TypeError);
    });
});

describe("Unit class tests - required", function() {

    var unitObject;

    var value = true;

    var name = "param";

    var type = "boolean";

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
        unitObject.resetValue();

        expect(unitObject.getValue()).toBeUndefined();

        expect(function () {
            unitObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate boolean value", function() {
        unitObject.setValue(value);

        expect(unitObject.getValue()).toBe(value);

        expect(function () {
            unitObject.validate();
        }).not.toThrow();
    });
});