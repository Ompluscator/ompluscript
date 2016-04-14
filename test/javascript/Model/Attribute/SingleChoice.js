describe("SingleChoice class tests - not required", function() {

    var singleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];
    
    var undefined;

    beforeAll(function() {
        singleChoiceObject = new Ompluscript.Model.Attribute.SingleChoice(name, values);
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

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);

        expect(function () {
            singleChoiceObject.validate();
        }).toThrowError(RangeError);
    });
});

describe("SingleChoice class tests - required", function() {

    var singleChoiceObject;

    var name = "param";

    var type = "number";

    var values = [1, 2, 3];

    var value = 1;

    var undefined;

    beforeAll(function() {
        singleChoiceObject = new Ompluscript.Model.Attribute.SingleChoice(name, values, value, true);
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
        singleChoiceObject.resetValue();

        expect(singleChoiceObject.getValue()).toBeUndefined();

        expect(function () {
            singleChoiceObject.validate();
        }).toThrowError(TypeError);
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

        singleChoiceObject.setValue(value);

        expect(singleChoiceObject.getValue()).toBe(value);

        expect(function () {
            singleChoiceObject.validate();
        }).toThrowError(RangeError);
    });
});