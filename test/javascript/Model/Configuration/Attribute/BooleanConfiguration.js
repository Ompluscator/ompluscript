describe("BooleanConfiguration class tests - valid boolean", function() {

    var booleanConfiguration;

    var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
    var Boolean = Ompluscript.Model.Attribute.Boolean;

    beforeAll(function() {
        booleanConfiguration = new BooleanConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Boolean",
            name: "boolean"
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([]);
        expect(booleanConfiguration.create(definition) instanceof Boolean).toBeTruthy();
        expect(booleanConfiguration.create(definition).getName()).toBe("boolean");
        expect(booleanConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(booleanConfiguration.create(definition).isMustBeTrue()).toBeFalsy();
    });

    it("valid - second", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            required: true,
            mustBeTrue: true,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([]);
        expect(booleanConfiguration.create(definition) instanceof Boolean).toBeTruthy();
        expect(booleanConfiguration.create(definition).getName()).toBe("boolean");
        expect(booleanConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(booleanConfiguration.create(definition).isMustBeTrue()).toBeTruthy();
    });

    it("valid - third", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            required: false,
            mustBeTrue: false,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([]);
        expect(booleanConfiguration.create(definition) instanceof Boolean).toBeTruthy();
        expect(booleanConfiguration.create(definition).getName()).toBe("boolean");
        expect(booleanConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(booleanConfiguration.create(definition).isMustBeTrue()).toBeFalsy();
    });

    it("valid - fourth", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            mustBeTrue: true,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([]);
        expect(booleanConfiguration.create(definition) instanceof Boolean).toBeTruthy();
        expect(booleanConfiguration.create(definition).getName()).toBe("boolean");
        expect(booleanConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(booleanConfiguration.create(definition).isMustBeTrue()).toBeTruthy();
    });

    it("valid - fifth", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            required: true,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([]);
        expect(booleanConfiguration.create(definition) instanceof Boolean).toBeTruthy();
        expect(booleanConfiguration.create(definition).getName()).toBe("boolean");
        expect(booleanConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(booleanConfiguration.create(definition).isMustBeTrue()).toBeFalsy();
    });
});

describe("BooleanConfiguration class tests - invalid boolean", function() {

    var booleanConfiguration;
    var undefined;

    var BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        booleanConfiguration = new BooleanConfiguration();
    });

    it("invalid name", function() {
        var definition = {
            type: "Boolean"
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            required: 1,
            mustBeTrue: 1,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([
            "boolean." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "boolean." + Boolean.PARAMETER_MUST_BE_TRUE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid required", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            required: 1,
            mustBeTrue: true,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([
            "boolean." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid mustBeTrue", function() {
        var definition = {
            type: "Boolean",
            name: "boolean",
            required: true,
            mustBeTrue: 1,
        };
        expect(booleanConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(booleanConfiguration.getErrors(definition)).toEqual([
            "boolean." + Boolean.PARAMETER_MUST_BE_TRUE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED
        ]);
    });
});