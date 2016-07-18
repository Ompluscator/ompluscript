describe("SingleChoiceConfiguration class tests - valid singleChoice", function() {

    var singleChoiceConfiguration;

    var SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        singleChoiceConfiguration = new SingleChoiceConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice"
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(singleChoiceConfiguration.create(definition) instanceof SingleChoice).toBeTruthy();
        expect(singleChoiceConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(singleChoiceConfiguration.create(definition).getChoices()).toEqual([]);
    });

    it("valid - second", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice",
            required: true,
            choices: [1, 2],
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(singleChoiceConfiguration.create(definition) instanceof SingleChoice).toBeTruthy();
        expect(singleChoiceConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(singleChoiceConfiguration.create(definition).getChoices()).toEqual([1, 2]);
    });

    it("valid - third", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice",
            required: true,
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(singleChoiceConfiguration.create(definition) instanceof SingleChoice).toBeTruthy();
        expect(singleChoiceConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(singleChoiceConfiguration.create(definition).getChoices()).toEqual([]);
    });

    it("valid - fourth", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice",
            choices: [1, 2],
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(singleChoiceConfiguration.create(definition) instanceof SingleChoice).toBeTruthy();
        expect(singleChoiceConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(singleChoiceConfiguration.create(definition).getChoices()).toEqual([1, 2]);
    });
});

describe("SingleChoiceConfiguration class tests - invalid singleChoice", function() {

    var singleChoiceConfiguration;
    var undefined;

    var SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        singleChoiceConfiguration = new SingleChoiceConfiguration();
    });

    it("invalid name", function() {
        var definition = {
            type: "SingleChoice"
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice",
            required: 1,
            choices: {},
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([
            "singleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "singleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });

    it("invalid required", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice",
            required: 1,
            choices: [],
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([
            "singleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid choices", function() {
        var definition = {
            type: "SingleChoice",
            name: "singleChoice",
            required: true,
            choices: false,
        };
        expect(singleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(singleChoiceConfiguration.getErrors(definition)).toEqual([
            "singleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });
});