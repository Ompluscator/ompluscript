describe("MultipleChoice class tests - not required", function() {

    var multipleChoiceObject;
    var name = "param";
    var type = "number";
    var choices = [1, 2, 3];
    var undefined;
    var required = false;

    var Choice = Ompluscript.Model.Attribute.Choice;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
    var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;

    beforeAll(function() {
        multipleChoiceObject = new MultipleChoice(name, undefined, required, choices);
    });

    beforeEach(function() {
        multipleChoiceObject.setValue(undefined);
        multipleChoiceObject.setChoices(choices);
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
        var onUpdateChoices = new OnUpdateChoices(multipleChoiceObject, choices, []);

        multipleChoiceObject.setChoices([]);

        expect(multipleChoiceObject.getChoices()).toEqual([]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateChoices]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, undefined, undefined);
        
        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid empty value", function() {
        var value = [];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, undefined, value);

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid single value", function() {
        var value = [1];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, undefined, value);

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid double value", function() {
        var value = [3, 1];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, undefined, value);

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid single value", function() {
        var value = [4];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(multipleChoiceObject, value, Choice.ERROR_VALUE_NOT_ALLOWED);

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate invalid double value", function() {
        var value = [4, 1];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(multipleChoiceObject, value, Choice.ERROR_VALUE_NOT_ALLOWED);

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
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
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;

    beforeAll(function() {
        multipleChoiceObject = new MultipleChoice(name, value, required, choices);
    });

    beforeEach(function() {
        multipleChoiceObject.setValue(value);
        multipleChoiceObject.setChoices(choices);
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
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, value, undefined);
        var onInvalidAttribute = new OnInvalidAttribute(multipleChoiceObject, undefined, Attribute.ERROR_IS_REQUIRED);

        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate invalid empty value", function() {
        var newValue = [];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, value, newValue);
        var onInvalidAttribute = new OnInvalidAttribute(multipleChoiceObject, newValue, Attribute.ERROR_IS_REQUIRED);

        multipleChoiceObject.setValue(newValue);

        expect(multipleChoiceObject.getValue()).toBe(newValue);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate valid single value", function() {
        var newValue = [1];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, value, newValue);

        multipleChoiceObject.setValue(newValue);

        expect(multipleChoiceObject.getValue()).toBe(newValue);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid double value", function() {
        var newValue = [3, 1];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, value, newValue);

        multipleChoiceObject.setValue(newValue);

        expect(multipleChoiceObject.getValue()).toBe(newValue);
        expect(multipleChoiceObject.validate()).toBeTruthy();
        expect(multipleChoiceObject.getError()).toBeUndefined();
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid single value", function() {
        var newValue = [4];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, value, newValue);
        var onInvalidAttribute = new OnInvalidAttribute(multipleChoiceObject, newValue, Choice.ERROR_VALUE_NOT_ALLOWED);

        multipleChoiceObject.setValue(newValue);

        expect(multipleChoiceObject.getValue()).toBe(newValue);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate invalid double value", function() {
        var newValue = [4, 1];
        var onUpdateAttribute = new OnUpdateAttribute(multipleChoiceObject, value, newValue);
        var onInvalidAttribute = new OnInvalidAttribute(multipleChoiceObject, newValue, Choice.ERROR_VALUE_NOT_ALLOWED);

        multipleChoiceObject.setValue(newValue);

        expect(multipleChoiceObject.getValue()).toBe(newValue);
        expect(multipleChoiceObject.validate()).toBeFalsy();
        expect(multipleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(multipleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });
});