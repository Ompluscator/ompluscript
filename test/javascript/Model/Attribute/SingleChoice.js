describe("SingleChoice class tests - initialization", function() {

    var undefined;

    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    var General = Ompluscript.Core.Utils.General;

    it("validate invalid minimum configuration", function() {
        var values = "1";

        var parameters = {
            classType: SingleChoice.name,
            code: General.ERROR_WRONG_CONFIGURATION,
            variables: {
                values: values
            }
        };

        expect(function () {
            new SingleChoice("param", undefined, false, values);
        }).toThrow(new SyntaxError(JSON.stringify(parameters)));
    });

    it("validate valid configuration", function() {
        expect(function () {
            new SingleChoice("param");
        }).not.toThrow();

        expect(function () {
            new SingleChoice("param", undefined);
        }).not.toThrow();

        expect(function () {
            new SingleChoice("param", undefined, true);
        }).not.toThrow();

        expect(function () {
            new SingleChoice("param", undefined, true, []);
        }).not.toThrow();
    });
});

describe("SingleChoice class tests - not required", function() {

    var singleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];
    
    var undefined;

    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        singleChoiceObject = new Ompluscript.Model.Attribute.SingleChoice(name, undefined, false, values);
    });

    it("get configuration", function() {

        expect(singleChoiceObject.isRequired()).toBeFalsy();

        expect(singleChoiceObject.getName()).toBe(name);

        expect(singleChoiceObject.getChoices()).toEqual(values);

        expect(singleChoiceObject.getStackTrace()).toEqual({
            name: name,
            type: type,
            required: false,
            value: undefined,
            values: values,
        });

    });

    it("validate setting up choices", function() {
        singleChoiceObject.setChoices([]);

        expect(singleChoiceObject.getChoices()).toEqual([]);

        singleChoiceObject.setChoices(values);

        expect(singleChoiceObject.getChoices()).toEqual(values);
    });

    it("validate undefined value", function() {
        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();

        expect(function () {
            singleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate valid value", function() {
        var value = 1;

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);

        expect(function () {
            singleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate invalid value", function() {
        var value = 4;

        var parameters = {
            classType: SingleChoice.name,
            code: SingleChoice.ERROR_VALUE_NOT_ALLOWED,
            objectName: singleChoiceObject.getName(),
        };

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);

        expect(function () {
            singleChoiceObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});

describe("SingleChoice class tests - required", function() {

    var singleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];

    var value = 1;

    var undefined;

    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    var UnitClass = Ompluscript.Model.Attribute.Unit;

    beforeAll(function() {
        singleChoiceObject = new Ompluscript.Model.Attribute.SingleChoice(name, value, true, values);
    });

    it("get configuration", function() {

        expect(singleChoiceObject.isRequired()).toBeTruthy();

        expect(singleChoiceObject.getName()).toBe(name);

        expect(singleChoiceObject.getChoices()).toEqual(values);

        expect(singleChoiceObject.getStackTrace()).toEqual({
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
            objectName: singleChoiceObject.getName(),
        };
        
        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();

        expect(function () {
            singleChoiceObject.validate();
        }).toThrow(new TypeError(JSON.stringify(parameters)));
    });

    it("validate valid value", function() {
        var value = 1;

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);

        expect(function () {
            singleChoiceObject.validate();
        }).not.toThrow();
    });

    it("validate invalid value", function() {
        var value = 4;

        var parameters = {
            classType: SingleChoice.name,
            code: SingleChoice.ERROR_VALUE_NOT_ALLOWED,
            objectName: singleChoiceObject.getName(),
        };

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);

        expect(function () {
            singleChoiceObject.validate();
        }).toThrow(new RangeError(JSON.stringify(parameters)));
    });
});