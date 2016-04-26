describe("Boolean class tests - not required", function() {

    var booleanObject;
    var name = "param";
    var type = "boolean";
    var undefined;
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;

    beforeAll(function() {
        booleanObject = new Boolean(name);
    });

    beforeEach(function() {
        spyOn(booleanObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(booleanObject.isRequired()).toBeFalsy();
        expect(booleanObject.getName()).toBe(name);
        expect(booleanObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
        });
    });

    it("validate undefined value", function() {
        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate boolean value", function() {
        var value = true;

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate number value", function() {
        var value = 1;

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeFalsy();
        expect(booleanObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(booleanObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("Boolean class tests - required", function() {

    var booleanObject;
    var value = true;
    var name = "param";
    var type = "boolean";
    var required = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;

    beforeAll(function() {
        booleanObject = new Boolean(name, value, required);
    });

    beforeEach(function() {
        spyOn(booleanObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(booleanObject.isRequired()).toBeTruthy();
        expect(booleanObject.getName()).toBe(name);
        expect(booleanObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
        });
    });

    it("validate undefined value", function() {
        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();
        expect(booleanObject.validate()).toBeFalsy();
        expect(booleanObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(booleanObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate boolean value", function() {
        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });
});