describe("Boolean class tests - not required and don't need to be true", function() {

    var booleanObject;
    var name = "param";
    var type = "boolean";
    var undefined;
    var required = false;
    var mustBeTrue = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        booleanObject = new Boolean(name);
    });

    beforeEach(function() {
        booleanObject.setValue(undefined);
        spyOn(booleanObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(booleanObject.isRequired()).toBeFalsy();
        expect(booleanObject.isMustBeTrue()).toBeFalsy();
        expect(booleanObject.getName()).toBe(name);
        expect(booleanObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
            mustBeTrue: mustBeTrue,
        });
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, undefined, undefined);

        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate boolean value", function() {
        var value = true;
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, undefined, value);

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate number value", function() {
        var value = 1;
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(booleanObject, value, Attribute.ERROR_WRONG_TYPE);

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeFalsy();
        expect(booleanObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("Boolean class tests - required and don't need to be true", function() {

    var booleanObject;
    var value = true;
    var name = "param";
    var type = "boolean";
    var required = true;
    var undefined;
    var mustBeTrue = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        booleanObject = new Boolean(name, value, required);
    });

    beforeEach(function() {
        booleanObject.setValue(value);
        spyOn(booleanObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(booleanObject.isRequired()).toBeTruthy();
        expect(booleanObject.isMustBeTrue()).toBeFalsy();
        expect(booleanObject.getName()).toBe(name);
        expect(booleanObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            mustBeTrue: mustBeTrue,
        });
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, value, undefined);
        var onInvalidAttribute = new OnInvalidAttribute(booleanObject, undefined, Attribute.ERROR_IS_REQUIRED);
        
        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();
        expect(booleanObject.validate()).toBeFalsy();
        expect(booleanObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate boolean value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, value, value);
        
        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });
});

describe("Boolean class tests - required and need to be true", function() {

    var booleanObject;
    var value = true;
    var name = "param";
    var type = "boolean";
    var required = true;
    var undefined;
    var mustBeTrue = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        booleanObject = new Boolean(name, value, required, mustBeTrue);
    });

    beforeEach(function() {
        booleanObject.setValue(value);
        spyOn(booleanObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(booleanObject.isRequired()).toBeTruthy();
        expect(booleanObject.isMustBeTrue()).toBeTruthy();
        expect(booleanObject.getName()).toBe(name);
        expect(booleanObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            mustBeTrue: mustBeTrue,
        });
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, value, undefined);
        var onInvalidAttribute = new OnInvalidAttribute(booleanObject, undefined, Attribute.ERROR_IS_REQUIRED);

        booleanObject.resetValue();

        expect(booleanObject.getValue()).toBeUndefined();
        expect(booleanObject.validate()).toBeFalsy();
        expect(booleanObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate boolean value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, value, value);

        booleanObject.setValue(value);

        expect(booleanObject.getValue()).toBe(value);
        expect(booleanObject.validate()).toBeTruthy();
        expect(booleanObject.getError()).toBeUndefined();
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate must be true value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(booleanObject, value, false);
        var onInvalidAttribute = new OnInvalidAttribute(booleanObject, false, Boolean.ERROR_MUST_BE_TRUE);

        booleanObject.setValue(false);

        expect(booleanObject.getValue()).toBeFalsy();
        expect(booleanObject.validate()).toBeFalsy();
        expect(booleanObject.getError()).toBe(Boolean.ERROR_MUST_BE_TRUE);
        expect(booleanObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(booleanObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(booleanObject.notifyObservers.calls.count()).toBe(2);
    });
});