describe("Number class tests - without limits and not required", function() {

    var numberObject;
    var undefined;
    var type = "number";
    var name = "param";
    var required = false;
    var include = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberObject = new Number(name);
    });

    beforeEach(function() {
        spyOn(numberObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBeUndefined();
        expect(numberObject.getMaximum()).toBeUndefined();
        expect(numberObject.getName()).toBe(name);
        expect(numberObject.isRequired()).toBeFalsy();
        expect(numberObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
            minimum: undefined,
            maximum: undefined,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate undefined value", function() {
        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate number value", function() {
        var value = 1.0;

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate string value", function() {
        var value = "1";


        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("Number class tests - without limits and required", function() {

    var numberObject;
    var undefined;
    var value = 2;
    var type = "number";
    var name = "param";
    var required = true;
    var include = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberObject = new Number(name, value, required);
    });

    beforeEach(function() {
        spyOn(numberObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBeUndefined();
        expect(numberObject.getMaximum()).toBeUndefined();
        expect(numberObject.getName()).toBe(name);
        expect(numberObject.isRequired()).toBeTruthy();
        expect(numberObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimum: undefined,
            maximum: undefined,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate undefined value", function() {
        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate number value", function() {
        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });
});

describe("Number class tests - without included limits and required", function() {

    var numberObject;
    var value = 3;
    var type = "number";
    var name = "param";
    var minimum = value * 2;
    var maximum = value * 4;
    var required = true;
    var include = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberObject = new Number(name, value, required, minimum, include, maximum, include);
    });

    beforeEach(function() {
        spyOn(numberObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);
        expect(numberObject.getMaximum()).toBe(maximum);
        expect(numberObject.getName()).toBe(name);
        expect(numberObject.isRequired()).toBeTruthy();
        expect(numberObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimum: minimum,
            maximum: maximum,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate minimum value", function() {
        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_BELOW_MINIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate regular value", function() {
        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate maximum length", function() {
        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_OVER_MAXIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("Number class tests - with included limits and required", function() {

    var numberObject;
    var value = 3;
    var type = "number";
    var name = "param";
    var minimum = value * 2;
    var maximum = value * 4;
    var required = true;
    var include = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberObject = new Number(name, value, required, minimum, include, maximum, include);
    });

    beforeEach(function() {
        spyOn(numberObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);
        expect(numberObject.getMaximum()).toBe(maximum);
        expect(numberObject.getName()).toBe(name);
        expect(numberObject.isRequired()).toBeTruthy();
        expect(numberObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimum: minimum,
            maximum: maximum,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate minimum value", function() {
        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_BELOW_MINIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate regular value", function() {
        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();

        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();

        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(2)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.count()).toBe(3);
    });

    it("validate maximum length", function() {
        numberObject.setValue(value * 5);

        expect(numberObject.getValue()).toBe(value * 5);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_OVER_MAXIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });
});