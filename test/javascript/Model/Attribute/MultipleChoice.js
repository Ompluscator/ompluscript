describe("MultipleChoice class tests - not required", function() {

    var multipleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];
    
    var undefined;

    beforeAll(function() {
        multipleChoiceObject = new Ompluscript.Model.Attribute.MultipleChoice(name, values);
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

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate invalid double value", function() {
        var value = [4, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrowError(RangeError);
    });
});

describe("MultipleChoice class tests - required", function() {

    var multipleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];

    var value = 1;

    var undefined;

    beforeAll(function() {
        multipleChoiceObject = new Ompluscript.Model.Attribute.MultipleChoice(name, values, value, true);
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
        multipleChoiceObject.resetValue();

        expect(multipleChoiceObject.getValue()).toBeUndefined();

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrowError(TypeError);
    });

    it("validate invalid empty value", function() {
        var value = [];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrowError(TypeError);
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

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrowError(RangeError);
    });

    it("validate invalid double value", function() {
        var value = [4, 1];

        multipleChoiceObject.setValue(value);

        expect(multipleChoiceObject.getValue()).toBe(value);

        expect(function () {
            multipleChoiceObject.validate();
        }).toThrowError(RangeError);
    });
});