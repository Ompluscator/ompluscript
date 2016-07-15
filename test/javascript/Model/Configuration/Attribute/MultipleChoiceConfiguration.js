describe("MultipleChoiceConfiguration class tests - valid multipleChoice", function() {

    var multipleChoiceConfiguration;

    var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    beforeAll(function() {
        multipleChoiceConfiguration = new MultipleChoiceConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice"
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(multipleChoiceConfiguration.create(definition) instanceof MultipleChoice).toBeTruthy();
        expect(multipleChoiceConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(multipleChoiceConfiguration.create(definition).getChoices()).toEqual([]);
    });

    it("valid - second", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice",
            required: true,
            choices: [1, 2],
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(multipleChoiceConfiguration.create(definition) instanceof MultipleChoice).toBeTruthy();
        expect(multipleChoiceConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(multipleChoiceConfiguration.create(definition).getChoices()).toEqual([1, 2]);
    });
    
    it("valid - third", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice",
            required: true,
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(multipleChoiceConfiguration.create(definition) instanceof MultipleChoice).toBeTruthy();
        expect(multipleChoiceConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(multipleChoiceConfiguration.create(definition).getChoices()).toEqual([]);
    });
    
    it("valid - fourth", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice",
            choices: [1, 2],
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([]);
        expect(multipleChoiceConfiguration.create(definition) instanceof MultipleChoice).toBeTruthy();
        expect(multipleChoiceConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(multipleChoiceConfiguration.create(definition).getChoices()).toEqual([1, 2]);
    });
});

describe("MultipleChoiceConfiguration class tests - invalid multipleChoice", function() {

    var multipleChoiceConfiguration;
    var undefined;

    var MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        multipleChoiceConfiguration = new MultipleChoiceConfiguration();
    });

    it("invalid name", function() {
        var definition = {
            type: "MultipleChoice"
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice",
            required: 1,
            choices: {},
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([
            "multipleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "multipleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });

    it("invalid required", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice",
            required: 1,
            choices: [],
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([
            "multipleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid choices", function() {
        var definition = {
            type: "MultipleChoice",
            name: "multipleChoice",
            required: true,
            choices: false,
        };
        expect(multipleChoiceConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(multipleChoiceConfiguration.getErrors(definition)).toEqual([
            "multipleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });
});