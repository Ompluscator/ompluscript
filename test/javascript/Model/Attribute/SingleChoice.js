describe("SingleChoice class tests - not required", function() {

    var singleChoiceObject;
    var name = "param";
    var type = "number";
    var choices = [1, 2, 3];
    var undefined;
    var required = false;

    var Choice = Ompluscript.Model.Attribute.Choice;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
    var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;

    beforeAll(function() {
        singleChoiceObject = new SingleChoice(name, undefined, required, choices);
    });

    beforeEach(function() {
        singleChoiceObject.setValue(undefined);
        singleChoiceObject.setChoices(choices);
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
        var onUpdateChoices = new OnUpdateChoices(singleChoiceObject, choices, []);
        
        singleChoiceObject.setChoices([]);

        expect(singleChoiceObject.getChoices()).toEqual([]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateChoices]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate undefined value", function() {
        var onUpdateAttribute = new OnUpdateAttribute(singleChoiceObject, undefined, undefined);
        
        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();
        expect(singleChoiceObject.validate()).toBeTruthy();
        expect(singleChoiceObject.getError()).toBeUndefined();
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate valid value", function() {
        var value = 1;
        var onUpdateAttribute = new OnUpdateAttribute(singleChoiceObject, undefined, value);

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);
        expect(singleChoiceObject.validate()).toBeTruthy();
        expect(singleChoiceObject.getError()).toBeUndefined();
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid value", function() {
        var value = 4;
        var onUpdateAttribute = new OnUpdateAttribute(singleChoiceObject, undefined, value);
        var onInvalidAttribute = new OnInvalidAttribute(singleChoiceObject, value, Choice.ERROR_VALUE_NOT_ALLOWED);

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);
        expect(singleChoiceObject.validate()).toBeFalsy();
        expect(singleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
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
    var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
    var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;

    beforeAll(function() {
        singleChoiceObject = new SingleChoice(name, value, required, choices);
    });

    beforeEach(function() {
        singleChoiceObject.setValue(value);
        singleChoiceObject.setChoices(choices);
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
        var onUpdateAttribute = new OnUpdateAttribute(singleChoiceObject, value, undefined);
        var onInvalidAttribute = new OnInvalidAttribute(singleChoiceObject, undefined, Attribute.ERROR_IS_REQUIRED);

        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();
        expect(singleChoiceObject.validate()).toBeFalsy();
        expect(singleChoiceObject.getError()).toBe(Attribute.ERROR_IS_REQUIRED);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });

    it("validate valid value", function() {
        var newValue = 1;
        var onUpdateAttribute = new OnUpdateAttribute(singleChoiceObject, value, newValue);

        singleChoiceObject.setValue(newValue);

        expect(singleChoiceObject.getValue()).toBe(newValue);
        expect(singleChoiceObject.validate()).toBeTruthy();
        expect(singleChoiceObject.getError()).toBeUndefined();
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(1);
    });

    it("validate invalid value", function() {
        var newValue = 4;
        var onUpdateAttribute = new OnUpdateAttribute(singleChoiceObject, value, newValue);
        var onInvalidAttribute = new OnInvalidAttribute(singleChoiceObject, newValue, Choice.ERROR_VALUE_NOT_ALLOWED);

        singleChoiceObject.setValue(newValue);

        expect(singleChoiceObject.getValue()).toBe(newValue);
        expect(singleChoiceObject.validate()).toBeFalsy();
        expect(singleChoiceObject.getError()).toBe(Choice.ERROR_VALUE_NOT_ALLOWED);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(0)).toEqual([onUpdateAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.argsFor(1)).toEqual([onInvalidAttribute]);
        expect(singleChoiceObject.notifyObservers.calls.count()).toBe(2);
    });
});