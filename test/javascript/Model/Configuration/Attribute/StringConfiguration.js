describe("StringConfiguration class tests - valid string", function() {

    var stringConfiguration;

    var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        stringConfiguration = new StringConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "String",
            name: "string"
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([]);
        expect(stringConfiguration.create(definition) instanceof String).toBeTruthy();
        expect(stringConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(stringConfiguration.create(definition).getMinimumLength()).toBeUndefined();
        expect(stringConfiguration.create(definition).getMaximumLength()).toBeUndefined();
        expect(stringConfiguration.create(definition).getPattern()).toBeUndefined();
    });

    it("valid - second", function() {
        var definition = {
            type: "String",
            name: "string",
            required: true,
            minimumLength: 1,
            maximumLength: 5,
            pattern: /value/,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([]);
        expect(stringConfiguration.create(definition) instanceof String).toBeTruthy();
        expect(stringConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(stringConfiguration.create(definition).getMinimumLength()).toBe(1);
        expect(stringConfiguration.create(definition).getMaximumLength()).toBe(5);
        expect(stringConfiguration.create(definition).getPattern()).toEqual(/value/);
    });

    it("valid - third", function() {
        var definition = {
            type: "String",
            name: "string",
            required: false,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([]);
        expect(stringConfiguration.create(definition) instanceof String).toBeTruthy();
        expect(stringConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(stringConfiguration.create(definition).getMinimumLength()).toBeUndefined();
        expect(stringConfiguration.create(definition).getMaximumLength()).toBeUndefined();
        expect(stringConfiguration.create(definition).getPattern()).toBeUndefined();
    });

    it("valid - fourth", function() {
        var definition = {
            type: "String",
            name: "string",
            required: false,
            minimumLength: 5,
            maximumLength: 5,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([]);
        expect(stringConfiguration.create(definition) instanceof String).toBeTruthy();
        expect(stringConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(stringConfiguration.create(definition).getMinimumLength()).toBe(5);
        expect(stringConfiguration.create(definition).getMaximumLength()).toBe(5);
        expect(stringConfiguration.create(definition).getPattern()).toBeUndefined();
    });

    it("valid - fifth", function() {
        var definition = {
            type: "String",
            name: "string",
            pattern: /value/,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([]);
        expect(stringConfiguration.create(definition) instanceof String).toBeTruthy();
        expect(stringConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(stringConfiguration.create(definition).getMinimumLength()).toBeUndefined();
        expect(stringConfiguration.create(definition).getMaximumLength()).toBeUndefined();
        expect(stringConfiguration.create(definition).getPattern()).toEqual(/value/);
    });
});

describe("StringConfiguration class tests - invalid string", function() {

    var stringConfiguration;
    var undefined;

    var StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        stringConfiguration = new StringConfiguration();
    });

    it("invalid name", function() {
        var definition = {
            type: "String"
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration - first", function() {
        var definition = {
            type: "String",
            name: "string",
            required: "not",
            minimumLength: false,
            maximumLength: "not",
            pattern: "value",
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([
            "string." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "string." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "string." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "string." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED,
        ]);
    });

    it("invalid configuration - second", function() {
        var definition = {
            type: "String",
            name: "string",
            minimumLength: 4,
            maximumLength: 2,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([
            "string." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_GREATER + "string." + String.PARAMETER_MINIMUM_LENGTH,
        ]);
    });

    it("invalid required", function() {
        var definition = {
            type: "String",
            name: "string",
            required: 1,
            minimumLength: 4,
            maximumLength: 2,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([
            "string." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid minimum", function() {
        var definition = {
            type: "String",
            name: "string",
            required: true,
            minimumLength: "not",
            maximumLength: 2,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([
            "string." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
        ]);
    });

    it("invalid maximum", function() {
        var definition = {
            type: "String",
            name: "string",
            required: true,
            minimumLength: 4,
            maximumLength: true,
        };
        expect(stringConfiguration.getErrors(definition)).toEqual([
            "string." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
        ]);
    });
});