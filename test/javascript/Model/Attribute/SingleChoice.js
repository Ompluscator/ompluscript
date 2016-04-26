describe("SingleChoice class tests - not required", function() {

    var singleChoiceObject;
    var name = "param";
    var type = "number";
    var choices = [1, 2, 3];
    var undefined;
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        singleChoiceObject = new SingleChoice(name, undefined, required, choices);
    });

    beforeEach(function() {
        spyOn(singleChoiceObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(singleChoiceObject.isRequired()).toBeFalsy();
        expect(singleChoiceObject.getName()).toBe(name);
        expect(singleChoiceObject.getChoices()).toEqual(choices);
        expect(singleChoiceObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: undefined,
            choices: choices,
        });
    });

    it("validate setting up choices", function() {
        singleChoiceObject.setChoices([]);

        expect(singleChoiceObject.getChoices()).toEqual([]);

        singleChoiceObject.setChoices(choices);

        expect(singleChoiceObject.getChoices()).toEqual(choices);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Choice.EVENT_UPDATE_CHOICES]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Choice.EVENT_UPDATE_CHOICES]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate undefined value", function() {
        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();
        expect(singleChoiceObject.validate()).toBeTruthy();
        expect(singleChoiceObject.getError()).toBeUndefined();
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid value", function() {
        var value = 1;

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);
        expect(singleChoiceObject.validate()).toBeTruthy();
        expect(singleChoiceObject.getError()).toBeUndefined();
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid value", function() {
        var value = 4;

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);
        expect(singleChoiceObject.validate()).toBeFalsy();
        expect(singleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("SingleChoice class tests - required", function() {

    var singleChoiceObject;
    var name = "param";
    var type = "number";
    var choices = [1, 2, 3];
    var value = 1;
    var undefined;
    var required = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        singleChoiceObject = new SingleChoice(name, value, required, choices);
    });

    beforeEach(function() {
        spyOn(singleChoiceObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(singleChoiceObject.isRequired()).toBeTruthy();
        expect(singleChoiceObject.getName()).toBe(name);
        expect(singleChoiceObject.getChoices()).toEqual(choices);
        expect(singleChoiceObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            choices: choices,
        });
    });

    it("validate undefined value", function() {
        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();
        expect(singleChoiceObject.validate()).toBeFalsy();
        expect(singleChoiceObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate valid value", function() {
        var value = 1;

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);
        expect(singleChoiceObject.validate()).toBeTruthy();
        expect(singleChoiceObject.getError()).toBeUndefined();
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid value", function() {
        var value = 4;

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);
        expect(singleChoiceObject.validate()).toBeFalsy();
        expect(singleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });
});