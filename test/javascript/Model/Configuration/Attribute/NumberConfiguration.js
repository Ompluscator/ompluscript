describe("NumberConfiguration class tests - valid number", function() {

    var numberConfiguration;

    var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        numberConfiguration = new NumberConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Number",
            name: "number"
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([]);
        expect(numberConfiguration.create(definition) instanceof Number).toBeTruthy();
        expect(numberConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMinimum()).toBeUndefined();
        expect(numberConfiguration.create(definition).getIncludeMinimum()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMaximum()).toBeUndefined();
        expect(numberConfiguration.create(definition).getIncludeMaximum()).toBeFalsy();
    });

    it("valid - second", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: true,
            minimum: 1,
            includeMinimum: true,
            maximum: 5,
            includeMaximum: true,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([]);
        expect(numberConfiguration.create(definition) instanceof Number).toBeTruthy();
        expect(numberConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(numberConfiguration.create(definition).getMinimum()).toBe(1);
        expect(numberConfiguration.create(definition).getIncludeMinimum()).toBeTruthy();
        expect(numberConfiguration.create(definition).getMaximum()).toBe(5);
        expect(numberConfiguration.create(definition).getIncludeMaximum()).toBeTruthy();
    });

    it("valid - third", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: false,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([]);
        expect(numberConfiguration.create(definition) instanceof Number).toBeTruthy();
        expect(numberConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMinimum()).toBeUndefined();
        expect(numberConfiguration.create(definition).getIncludeMinimum()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMaximum()).toBeUndefined();
        expect(numberConfiguration.create(definition).getIncludeMaximum()).toBeFalsy();
    });

    it("valid - fourth", function() {
        var definition = {
            type: "Number",
            name: "number",
            minimum: 1,
            includeMinimum: false,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([]);
        expect(numberConfiguration.create(definition) instanceof Number).toBeTruthy();
        expect(numberConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMinimum()).toBe(1);
        expect(numberConfiguration.create(definition).getIncludeMinimum()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMaximum()).toBeUndefined();
        expect(numberConfiguration.create(definition).getIncludeMaximum()).toBeFalsy();
    });

    it("valid - fifth", function() {
        var definition = {
            type: "Number",
            name: "number",
            maximum: 5,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([]);
        expect(numberConfiguration.create(definition) instanceof Number).toBeTruthy();
        expect(numberConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMinimum()).toBeUndefined();
        expect(numberConfiguration.create(definition).getIncludeMinimum()).toBeFalsy();
        expect(numberConfiguration.create(definition).getMaximum()).toBe(5);
        expect(numberConfiguration.create(definition).getIncludeMaximum()).toBeFalsy();
    });

    it("valid - sixth", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: true,
            minimum: 5,
            includeMinimum: true,
            maximum: 5,
            includeMaximum: true,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([]);
        expect(numberConfiguration.create(definition) instanceof Number).toBeTruthy();
        expect(numberConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(numberConfiguration.create(definition).getMinimum()).toBe(5);
        expect(numberConfiguration.create(definition).getIncludeMinimum()).toBeTruthy();
        expect(numberConfiguration.create(definition).getMaximum()).toBe(5);
        expect(numberConfiguration.create(definition).getIncludeMaximum()).toBeTruthy();
    });
});

describe("NumberConfiguration class tests - invalid number", function() {

    var numberConfiguration;
    var undefined;

    var NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        numberConfiguration = new NumberConfiguration();
    });

    it("invalid name", function() {
        var definition = {
            type: "Number"
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration - first", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: "not",
            minimum: "not",
            includeMinimum: 3,
            maximum: false,
            includeMaximum: "not",
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "number." + Number.PARAMETER_INCLUDE_MINIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "number." + Number.PARAMETER_INCLUDE_MAXIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid configuration - second", function() {
        var definition = {
            type: "Number",
            name: "number",
            minimum: 4,
            maximum: 2,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "number." + Attribute.PARAMETER_MINIMUM,
        ]);
    });

    it("invalid required", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: 1,
            minimum: 2,
            maximum: 3,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid minimum", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: true,
            minimum: false,
            maximum: 3,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
        ]);
    });

    it("invalid maximum", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: true,
            minimum: 2,
            maximum: "not",
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
        ]);
    });

    it("invalid order - first", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: false,
            minimum: 3,
            maximum: 3,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "number." + Attribute.PARAMETER_MINIMUM,
        ]);
    });

    it("invalid order - first", function() {
        var definition = {
            type: "Number",
            name: "number",
            required: false,
            minimum: 4,
            includeMinimum: true,
            maximum: 3,
            includeMaximum: true,
        };
        expect(numberConfiguration.getErrors(definition)).toEqual([
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "number." + Attribute.PARAMETER_MINIMUM,
        ]);
    });
});