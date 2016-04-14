describe("Boolean class tests - not required", function() {

    var booleanObject;

    var name = "param";

    var type = "boolean";
    
    var undefined;

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

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);

        expect(function () {
            booleanObject.validate();
        }).toThrowError(TypeError);
    });
});

describe("Boolean class tests - required", function() {

    var booleanObject;

    var value = true;
    
    var name = "param";
    
    var type = "boolean";

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
        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();

        expect(function () {
            booleanObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate boolean value", function() {
        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);

        expect(function () {
            booleanObject.validate();
        }).not.toThrow();
    });
});