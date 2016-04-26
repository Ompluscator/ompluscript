describe("MultipleChoice class tests - not required", function() {

    var multipleChoiceObject;
    var name = "param";
    var type = "number";
    var choices = [1, 2, 3];
    var undefined;
    var required = false;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    beforeAll(function() {
        multipleChoiceObject = new MultipleChoice(name, undefined, required, choices);
    });

    beforeEach(function() {
        spyOn(multipleChoiceObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(multipleChoiceObject.isRequired()).toBeFalsy();
        expect(multipleChoiceObject.getName()).toBe(name);
        expect(multipleChoiceObject.getChoices()).toEqual(choices);
        expect(multipleChoiceObject.getStackTrace()).toEqual({
            name: name,
            required: required,
            type: type,
            value: undefined,
            choices: choices,
        });
    });

    it("validate setting up choices", function() {
        multipleChoiceObject.setChoices([]);

        expect(multipleChoiceObject.getChoices()).toEqual([]);

        multipleChoiceObject.setChoices(choices);

        expect(multipleChoiceObject.getChoices()).toEqual(choices);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Choice.EVENT_UPDATE_CHOICES]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Choice.EVENT_UPDATE_CHOICES]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate undefined value", function() {
        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid empty value", function() {
        var value = [];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid single value", function() {
        var value = [1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid double value", function() {
        var value = [3, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid single value", function() {
        var value = [4];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate invalid double value", function() {
        var value = [4, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });
});

describe("MultipleChoice class tests - required", function() {

    var multipleChoiceObject;
    var name = "param";
    var type = "number";
    var choices = [1, 2, 3];
    var value = [1];
    var undefined;
    var required = true;

    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    beforeAll(function() {
        multipleChoiceObject = new MultipleChoice(name, value, required, choices);
    });

    beforeEach(function() {
        spyOn(multipleChoiceObject, 'notifyObservers');
    });

    it("get configuration", function() {
        expect(multipleChoiceObject.isRequired()).toBeTruthy();
        expect(multipleChoiceObject.getName()).toBe(name);
        expect(multipleChoiceObject.getChoices()).toEqual(choices);
        expect(multipleChoiceObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: required,
            value: value,
            choices: choices,
        });
    });

    it("validate undefined value", function() {
        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate invalid empty value", function() {
        var value = [];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate valid single value", function() {
        var value = [1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid double value", function() {
        var value = [3, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid single value", function() {
        var value = [4];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate invalid double value", function() {
        var value = [4, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([Attribute.EVENT_UPDATE]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([Attribute.EVENT_INVALID]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });
});