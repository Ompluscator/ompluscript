describe("MultipleChoice class tests - initialization", function() {

    var undefined;

    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    var General = Ompluscript.Core.Utils.General;

    it("validate invalid minimum configuration", function() {
        var values = "1";

        var parameters = {
            classType: MultipleChoice.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                values: values
            }
        };

        expect(function () {
            new MultipleChoice("param", undefined, false, values);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate valid configuration", function() {
        expect(function () {
            new MultipleChoice("param");
        }).not.toThrow();

        expect(function () {
            new MultipleChoice("param", []);
        }).not.toThrow();

        expect(function () {
            new MultipleChoice("param", [], true);
        }).not.toThrow();

        expect(function () {
            new MultipleChoice("param", [], true, []);
        }).not.toThrow();
    });
});

describe("MultipleChoice class tests - not required", function() {

    var multipleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];
    
    var undefined;

    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    beforeAll(function() {
        multipleChoiceObject = new Ompluscript.Model.Attribute.MultipleChoice(name, undefined, false, values);
    });

    it("get configuration", function() {

        expect(multipleChoiceObject.isRequired()).toBeFalsy();

        expect(multipleChoiceObject.getName()).toBe(name);

        expect(multipleChoiceObject.getChoices()).toEqual(values);

        expect(multipleChoiceObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
            values: values,
        });

    });

    it("validate setting up choices", function() {
        multipleChoiceObject.setChoices([]);

        expect(multipleChoiceObject.getChoices()).toEqual([]);

        multipleChoiceObject.setChoices(values);

        expect(multipleChoiceObject.getChoices()).toEqual(values);
    });

    it("validate undefined value", function() {
        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();

        expect(function () {
            multipleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate valid empty value", function() {
        var value = [];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate valid single value", function() {
        var value = [1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate valid double value", function() {
        var value = [3, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate invalid single value", function() {
        var value = [4];

        var parameters = {
            classType: MultipleChoice.name,
            code: MultipleChoice.ERROR_VALUE_NOT_ALLOWED,
            objectName: multipleChoiceObject.getName(),
        };

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });

    it("validate invalid double value", function() {
        var value = [4, 1];

        var parameters = {
            classType: MultipleChoice.name,
            code: MultipleChoice.ERROR_VALUE_NOT_ALLOWED,
            objectName: multipleChoiceObject.getName(),
        };

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});

describe("MultipleChoice class tests - required", function() {

    var multipleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];

    var value = 1;

    var undefined;

    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        multipleChoiceObject = new Ompluscript.Model.Attribute.MultipleChoice(name, value, true, values);
    });

    it("get configuration", function() {

        expect(multipleChoiceObject.isRequired()).toBeTruthy();

        expect(multipleChoiceObject.getName()).toBe(name);

        expect(multipleChoiceObject.getChoices()).toEqual(values);

        expect(multipleChoiceObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: true,
            value: value,
            values: values,
        });

    });

    it("validate undefined value", function() {
        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_IS_REQUIRED,
            objectName: multipleChoiceObject.getName(),
        };
        
        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });

    it("validate invalid empty value", function() {
        var value = [];

        var parameters = {
            classType: UnitClass.name,
            code: UnitClass.ERROR_IS_REQUIRED,
            objectName: multipleChoiceObject.getName(),
        };

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });

    it("validate valid single value", function() {
        var value = [1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate valid double value", function() {
        var value = [3, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate invalid single value", function() {
        var value = [4];

        var parameters = {
            classType: MultipleChoice.name,
            code: MultipleChoice.ERROR_VALUE_NOT_ALLOWED,
            objectName: multipleChoiceObject.getName(),
        };

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });

    it("validate invalid double value", function() {
        var value = [4, 1];

        var parameters = {
            classType: MultipleChoice.name,
            code: MultipleChoice.ERROR_VALUE_NOT_ALLOWED,
            objectName: multipleChoiceObject.getName(),
        };

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});