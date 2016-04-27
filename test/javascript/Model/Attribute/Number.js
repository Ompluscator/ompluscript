describe("Number class tests - without limits and not required", function() {

    var numberObject;
    var undefined;
    var type = "number";
    var name = "param";
    var required = false;
    var include = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        numberObject = new Number(name);
    });

    beforeEach(function() {
        numberObject.setValue(undefined);
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
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, undefined, undefined);
        
        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate number value", function() {
        var value = 1.0;
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, undefined, value);

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate string value", function() {
        var value = "1";
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(numberObject, value, Attribute.ERROR_WRONG_TYPE);

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
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
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        numberObject = new Number(name, value, required);
    });

    beforeEach(function() {
        numberObject.setValue(value);
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
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value, undefined);
        var onInvalidAttribute = new OnInvalidAttribute(numberObject, undefined, Attribute.ERROR_IS_REQUIRED);

        numberObject.resetValue();

        expect(numberObject.getValue()).toBeUndefined();
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate number value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value, value);

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
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
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        numberObject = new Number(name, value, required, minimum, include, maximum, include);
    });

    beforeEach(function() {
        numberObject.setValue(value * 3);
        spyOn(numberObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);
        expect(numberObject.getMaximum()).toBe(maximum);
        expect(numberObject.getName()).toBe(name);
        expect(numberObject.isRequired()).toBeTruthy();
        expect(numberObject.getStackTrace()).toEqual({
            name: name,
            required: required,
            type: type,
            value: value * 3,
            minimum: minimum,
            maximum: maximum,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate minimum value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, minimum);
        var onInvalidAttribute = new OnInvalidAttribute(numberObject, minimum, Attribute.ERROR_BELOW_MINIMUM);

        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_BELOW_MINIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate regular value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, value * 3);

        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate maximum length", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, maximum);
        var onInvalidAttribute = new OnInvalidAttribute(numberObject, maximum, Attribute.ERROR_OVER_MAXIMUM);

        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_OVER_MAXIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
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
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        numberObject = new Number(name, value, required, minimum, include, maximum, include);
    });

    beforeEach(function() {
        numberObject.setValue(value * 3);
        spyOn(numberObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(numberObject.getMinimum()).toBe(minimum);
        expect(numberObject.getMaximum()).toBe(maximum);
        expect(numberObject.getName()).toBe(name);
        expect(numberObject.isRequired()).toBeTruthy();
        expect(numberObject.getStackTrace()).toEqual({
            name: name,
            required: required,
            type: type,
            value: value * 3,
            minimum: minimum,
            maximum: maximum,
            includeMinimum: include,
            includeMaximum: include
        });
    });

    it("validate minimum value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, value);
        var onInvalidAttribute = new OnInvalidAttribute(numberObject, value, Attribute.ERROR_BELOW_MINIMUM);

        numberObject.setValue(value);

        expect(numberObject.getValue()).toBe(value);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_BELOW_MINIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate regular value 1", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, minimum);

        numberObject.setValue(minimum);

        expect(numberObject.getValue()).toBe(minimum);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate regular value 2", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, value * 3);

        numberObject.setValue(value * 3);

        expect(numberObject.getValue()).toBe(value * 3);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate regular value 3", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, maximum);

        numberObject.setValue(maximum);

        expect(numberObject.getValue()).toBe(maximum);
        expect(numberObject.validate()).toBeTruthy();
        expect(numberObject.getError()).toBeUndefined();
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate maximum length", function() {
        var onUpdateAttribute = new OnUpdateAttribute(numberObject, value * 3, value * 5);
        var onInvalidAttribute = new OnInvalidAttribute(numberObject, value * 5, Attribute.ERROR_OVER_MAXIMUM);

        numberObject.setValue(value * 5);

        expect(numberObject.getValue()).toBe(value * 5);
        expect(numberObject.validate()).toBeFalsy();
        expect(numberObject.getError()).toBe(Attribute.ERROR_OVER_MAXIMUM);
        expect(numberObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(numberObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(numberObject.notifyObservers.calls.count()).toBe(2);
    });
});