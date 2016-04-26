describe("String class tests - without limits, without pattern and not required", function() {

    var stringObject;
    var undefined;
    var type = "string";
    var name = "param";
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String(name);
    });

    beforeEach(function() {
        spyOn(stringObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();
        expect(stringObject.getMaximumLength()).toBeUndefined();
        expect(stringObject.getPattern()).toBeUndefined();
        expect(stringObject.getName()).toBe(name);
        expect(stringObject.isRequired()).toBeFalsy();
        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
            minimumLength: undefined,
            maximumLength: undefined,
            pattern: undefined
        });
    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate string value", function() {
        var value = "value";

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate number value", function() {
        var value = 1;

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(Attribute.ERROR_WRONG_TYPE);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("String class tests - without limits, without pattern and required", function() {

    var stringObject;
    var value = "value";
    var name = "param";
    var undefined;
    var type = "string";
    var required = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String(name, value, required);
    });

    beforeEach(function() {
        spyOn(stringObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();
        expect(stringObject.getMaximumLength()).toBeUndefined();
        expect(stringObject.getPattern()).toBeUndefined();
        expect(stringObject.getName()).toBe(name);
        expect(stringObject.isRequired()).toBeTruthy();
        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimumLength: undefined,
            maximumLength: undefined,
            pattern: undefined
        });
    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate string value", function() {
        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });
});

describe("String class tests - with limits, without pattern and required", function() {

    var stringObject;
    var value = "value";
    var type = "string";
    var name = "param";
    var minimum = value.length * 2;
    var maximum = value.length * 4;
    var undefined;
    var required = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String(name, value, required, minimum, maximum);
    });

    beforeEach(function() {
        spyOn(stringObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBe(minimum);
        expect(stringObject.getMaximumLength()).toBe(maximum);
        expect(stringObject.getPattern()).toBeUndefined();
        expect(stringObject.getName()).toBe(name);
        expect(stringObject.isRequired()).toBeTruthy();
        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimumLength: minimum,
            maximumLength: maximum,
            pattern: undefined
        });
    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate minimum length", function() {
        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(String.ERROR_BELOW_MINIMUM_LENGTH);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate string value", function() {
        var helper = value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();

        helper += value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();

        helper += value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(2)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(3);
    });

    it("validate maximum length", function() {
        var helper = value + value + value + value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(String.ERROR_OVER_MAXIMUM_LENGTH);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("String class tests - with limits, without pattern and not required", function() {

    var stringObject;
    var value = "value";
    var type = "string";
    var name = "param";
    var minimum = value.length * 2;
    var maximum = value.length * 4;
    var undefined;
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String(name, value, required, minimum, maximum);
    });

    beforeEach(function() {
        spyOn(stringObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBe(minimum);
        expect(stringObject.getMaximumLength()).toBe(maximum);
        expect(stringObject.getPattern()).toBeUndefined();
        expect(stringObject.getName()).toBe(name);
        expect(stringObject.isRequired()).toBeFalsy();
        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            minimumLength: minimum,
            maximumLength: maximum,
            pattern: undefined
        });
    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate minimum length", function() {
        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(String.ERROR_BELOW_MINIMUM_LENGTH);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate string value", function() {
        var helper = value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate maximum length", function() {
        var helper = value + value + value + value + value;

        stringObject.setValue(helper);

        expect(stringObject.getValue()).toBe(helper);
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(String.ERROR_OVER_MAXIMUM_LENGTH);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("String class tests - without limits, with pattern and not required", function() {

    var stringObject;
    var undefined;
    var pattern = new RegExp("value", "g");
    var name = "param";
    var type = "string";
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringObject = new String(name, undefined, required, undefined, undefined, pattern);
    });

    beforeEach(function() {
        spyOn(stringObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(stringObject.getMinimumLength()).toBeUndefined();
        expect(stringObject.getMaximumLength()).toBeUndefined();
        expect(stringObject.getPattern()).toBe(pattern);
        expect(stringObject.getName()).toBe(name);
        expect(stringObject.isRequired()).toBeFalsy();
        expect(stringObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
            minimumLength: undefined,
            maximumLength: undefined,
            pattern: pattern
        });

    });

    it("validate undefined value", function() {
        stringObject.resetValue();

        expect(stringObject.getValue()).toBeUndefined();
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate string value", function() {
        var value = "value";

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeTruthy();
        expect(stringObject.getError()).toBeUndefined();
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid string value", function() {
        var value = "not";

        stringObject.setValue(value);

        expect(stringObject.getValue()).toBe(value);
        expect(stringObject.validate()).toBeFalsy();
        expect(stringObject.getError()).toBe(String.ERROR_PATTERN_NOT_MATCH);
        expect(stringObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(stringObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(stringObject.notifyObservers.calls.count()).toBe(2);
    });
});