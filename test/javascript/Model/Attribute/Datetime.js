describe("Datetime class tests - without limits and not required", function() {

    var datetimeObject;
    var undefined;
    var type = "string";
    var name = "param";
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Datetime = Ompluscript.Model.Attribute.Datetime;

    beforeAll(function() {
        datetimeObject = new Datetime(name);
    });

    beforeEach(function() {
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
        datetimeObject.resetValue();

        expect(datetimeObject.getValue()).toBeUndefined();
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate datetime value", function() {
        var value = "1/11/1985";

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate wrong date format value", function() {
        var value = "wrong";

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate number value", function() {
        var value = 1.0;

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
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

    beforeAll(function() {
        datetimeObject = new Datetime(name, value, required);
    });

    beforeEach(function() {
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
        datetimeObject.resetValue();

        expect(datetimeObject.getValue()).toBeUndefined();
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate number value", function() {
        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
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

    beforeAll(function() {
        datetimeObject = new Datetime(name, value, required, minimum, maximum);
    });

    beforeEach(function() {
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
        datetimeObject.setValue("1/09/1985");

        expect(datetimeObject.getValue()).toBe("1/09/1985");
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_BELOW_MINIMUM);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate regular value", function() {

        datetimeObject.setValue(minimum);

        expect(datetimeObject.getValue()).toBe(minimum);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();

        datetimeObject.setValue(value);

        expect(datetimeObject.getValue()).toBe(value);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();

        datetimeObject.setValue(maximum);

        expect(datetimeObject.getValue()).toBe(maximum);
        expect(datetimeObject.validate()).toBeTruthy();
        expect(datetimeObject.getError()).toBeUndefined();
        expect(datetimeObject.notifyObservers.calls.count()).toBe(3);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(2)).toEqual([Attribute.EVENT_UPDATE]);
    });

    it("validate maximum length", function() {

        datetimeObject.setValue("1/13/1985");

        expect(datetimeObject.getValue()).toBe("1/13/1985");
        expect(datetimeObject.validate()).toBeFalsy();
        expect(datetimeObject.getError()).toBe(Attribute.ERROR_OVER_MAXIMUM);
        expect(datetimeObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(datetimeObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(datetimeObject.notifyObservers.calls.count()).toBe(2);
    });
});