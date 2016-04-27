describe("Datetime class tests - without limits and not required", function() {

    var datetimeObject;
    var undefined;
    var type = "string";
    var name = "param";
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        datetimeObject = new Datetime(name);
    });

    beforeEach(function() {
        datetimeObject.setValue(undefined);
        spyOn(datetimeObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(datetimeObject.getMinimum()).toBeUndefined();
        expect(datetimeObject.getMaximum()).toBeUndefined();
        expect(datetimeObject.getName()).toBe(name);
        expect(datetimeObject.isRequired()).toBeFalsy();
        expect(datetimeObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
            minimum: undefined,
            maximum: undefined,
            minimumObject: undefined,
            maximumObject: undefined
        });
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, undefined, undefined);
        
        datetimeObject.resetValue();

        expect(datetimeObject.getValue()).toBeUndefined();
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate datetime value", function() {
        var value = "1/11/1985";
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, undefined, value);

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate wrong date format value", function() {
        var value = "wrong";
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(datetimeObject, value, Attribute.ERROR_WRONG_TYPE);

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate number value", function() {
        var value = 1.0;
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(datetimeObject, value, Attribute.ERROR_WRONG_TYPE);

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("Datetime class tests - without limits and required", function() {

    var datetimeObject;
    var undefined;
    var value = "1/11/1985";
    var type = "string";
    var name = "param";
    var required = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        datetimeObject = new Datetime(name, value, required);
    });

    beforeEach(function() {
        datetimeObject.setValue(value);
        spyOn(datetimeObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(datetimeObject.getMinimum()).toBeUndefined();
        expect(datetimeObject.getMaximum()).toBeUndefined();
        expect(datetimeObject.getName()).toBe(name);
        expect(datetimeObject.isRequired()).toBeTruthy();
        expect(datetimeObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimum: undefined,
            maximum: undefined,
            minimumObject: undefined,
            maximumObject: undefined
        });
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, undefined);
        var onInvalidAttribute = new OnInvalidAttribute(datetimeObject, undefined, Attribute.ERROR_IS_REQUIRED);

        datetimeObject.resetValue();

        expect(datetimeObject.getValue()).toBeUndefined();
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate number value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, value);

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
    });
});

describe("Datetime class tests - with limits and required", function() {

    var datetimeObject;
    var value = "1/11/1985";
    var type = "string";
    var name = "param";
    var required = true;
    var minimum = "1/10/1985";
    var maximum = "1/12/1985";

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        datetimeObject = new Datetime(name, value, required, minimum, maximum);
    });

    beforeEach(function() {
        datetimeObject.setValue(value);
        spyOn(datetimeObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(datetimeObject.getMinimum()).toBe(minimum);
        expect(datetimeObject.getMaximum()).toBe(maximum);
        expect(datetimeObject.getName()).toBe(name);
        expect(datetimeObject.isRequired()).toBeTruthy();
        expect(datetimeObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimum: minimum,
            maximum: maximum,
            minimumObject: new Date(minimum),
            maximumObject: new Date(maximum)
        });
    });

    it("validate minimum value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, "1/09/1985");
        var onInvalidAttribute = new OnInvalidAttribute(datetimeObject, "1/09/1985", Attribute.ERROR_BELOW_MINIMUM);

        datetimeObject.setValue("1/09/1985");

        expect(datetimeObject.getValue()).toBe("1/09/1985");
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_BELOW_MINIMUM);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate regular value 1", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, minimum);

        datetimeObject.setValue(minimum);

        expect(datetimeObject.getValue()).toBe(minimum);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
    });

    it("validate regular value 2", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, value);

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
    });

    it("validate regular value 3", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, maximum);

        datetimeObject.setValue(maximum);

        expect(datetimeObject.getValue()).toBe(maximum);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
    });

    it("validate maximum length", function() {
        var onUpdateAttribute = new OnUpdateAttribute(datetimeObject, value, "1/13/1985");
        var onInvalidAttribute = new OnInvalidAttribute(datetimeObject, "1/13/1985", Attribute.ERROR_OVER_MAXIMUM);

        datetimeObject.setValue("1/13/1985");

        expect(datetimeObject.getValue()).toBe("1/13/1985");
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_OVER_MAXIMUM);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });
});