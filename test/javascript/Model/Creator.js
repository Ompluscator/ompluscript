describe("Creator class tests - valid creator", function() {

    var Creator = Ompluscript.Model;
    var Model = Ompluscript.Model.Container.Model;

    var definition = {
        name: "model",
        type: Model.name,
        definition: [
             {
                name: "param1",
                required: true,
                type: "String",
                minimumLength: 2,
                maximumLength: 4,
                pattern: /value/,
            },
            {
                name: "param1",
                type: "String",
            },
            {
                name: "param2",
                required: true,
                type: "Boolean",
                mustBeTrue: true,
            },
            {
                name: "param3",
                required: true,
                type: "Number",
                minimum: 3,
                includeMinimum: true,
                maximum: 5,
                includeMaximum: false,
            },
            {
                name: "param4",
                required: false,
                type: "Datetime",
                minimum: "1/10/1985",
                maximum: "1/12/1985",
            },
            {
                name: "param5",
                required: true,
                type: "SingleChoice",
                choices: [1],
            },
            {
                name: "param5",
                required: true,
                type: "MultipleChoice",
                choices: [1, 2],
            }
        ]
    };

    beforeAll(function() {
        Creator.reset();
    });

    it("get configuration", function() {
        expect(Creator.hasErrors()).toBeFalsy();
        expect(Creator.getErrors()).toEqual([]);
    });

    it("valid creation", function() {
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeFalsy();
        expect(Creator.getErrors()).toEqual([]);
        expect(Creator.create("model") instanceof Model).toBeTruthy();
    });
});

describe("Creator class tests - invalid string", function() {

    var Creator = Ompluscript.Model;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        Creator.reset();
    });

    it("invalid creation", function() {
        var definition = {
            type: "Model",
            name: "model",
            definition: [
                {},
                {
                    type: "String"
                },
                {
                    type: "String",
                    name: "param1",
                    required: 1
                },
                {
                    type: "String",
                    name: "param2",
                    required: true,
                    minimumLength: false,
                },
                {
                    type: "String",
                    name: "param3",
                    required: true,
                    minimumLength: 2,
                    maximumLength: false,
                },
                {
                    type: "String",
                    name: "param4",
                    required: true,
                    minimumLength: 2,
                    maximumLength: 1,
                },
                {
                    type: "String",
                    name: "param5",
                    required: true,
                    minimumLength: 2,
                    maximumLength: 4,
                    pattern: false
                }
            ]
        };
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeTruthy();
        expect(Creator.getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    "model." + Configuration.IS_WRONG_CONFIGURATION,
                    "model.undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
                    "model.param1." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param2." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
                    "model.param3." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
                    "model.param4." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_GREATER + "model.param4." + String.PARAMETER_MINIMUM_LENGTH,
                    "model.param5." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED
                ],
                name: "model",
                type: "Model"
            },
        ]);
    });
});

describe("Creator class tests - invalid number", function() {

    var Creator = Ompluscript.Model;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        Creator.reset();
    });

    it("invalid creation", function() {
        var definition = {
            type: "Model",
            name: "model",
            definition: [
                {},
                {
                    type: "Number"
                },
                {
                    type: "Number",
                    name: "param1",
                    required: 1
                },
                {
                    type: "Number",
                    name: "param2",
                    required: true,
                    minimum: false,
                },
                {
                    type: "Number",
                    name: "param3",
                    required: true,
                    minimum: 2,
                    maximum: false,
                },
                {
                    type: "Number",
                    name: "param4",
                    required: true,
                    minimum: 2,
                    maximum: 2,
                },
                {
                    type: "Number",
                    name: "param5",
                    required: true,
                    minimum: 2,
                    maximum: 4,
                    includeMinimum: 1
                },
                {
                    type: "Number",
                    name: "param6",
                    required: true,
                    minimum: 2,
                    maximum: 4,
                    includeMinimum: true,
                    includeMaximum: 2
                },
                {
                    type: "Number",
                    name: "param7",
                    required: true,
                    minimum: 2,
                    maximum: 1,
                    includeMinimum: true,
                    includeMaximum: true
                }
            ]
        };
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeTruthy();
        expect(Creator.getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    "model." + Configuration.IS_WRONG_CONFIGURATION,
                    "model.undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
                    "model.param1." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param2." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
                    "model.param3." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
                    "model.param4." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "model.param4." + Attribute.PARAMETER_MINIMUM,
                    "model.param5." + Number.PARAMETER_INCLUDE_MINIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param6." + Number.PARAMETER_INCLUDE_MAXIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param7." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "model.param7." + Attribute.PARAMETER_MINIMUM,
                ],
                name: "model",
                type: "Model"
            },
        ]);
    });
});

describe("Creator class tests - invalid boolean", function() {

    var Creator = Ompluscript.Model;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        Creator.reset();
    });

    it("invalid creation", function() {
        var definition = {
            type: "Model",
            name: "model",
            definition: [
                {},
                {
                    type: "Boolean"
                },
                {
                    type: "Boolean",
                    name: "param1",
                    required: 1
                },
                {
                    type: "Boolean",
                    name: "param2",
                    required: true,
                    mustBeTrue: 1
                },
            ]
        };
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeTruthy();
        expect(Creator.getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    "model." + Configuration.IS_WRONG_CONFIGURATION,
                    "model.undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
                    "model.param1." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param2." + Boolean.PARAMETER_MUST_BE_TRUE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                ],
                name: "model",
                type: "Model"
            },
        ]);
    });
});

describe("Creator class tests - invalid datetime", function() {

    var Creator = Ompluscript.Model;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        Creator.reset();
    });

    it("invalid creation", function() {
        var definition = {
            type: "Model",
            name: "model",
            definition: [
                {},
                {
                    type: "Datetime"
                },
                {
                    type: "Datetime",
                    name: "param1",
                    required: 1
                },
                {
                    type: "Datetime",
                    name: "param2",
                    required: true,
                    minimum: "invalid",
                },
                {
                    type: "Datetime",
                    name: "param3",
                    required: true,
                    minimum: "1/10/1985",
                    maximum: false,
                },
                {
                    type: "Datetime",
                    name: "param4",
                    required: true,
                    minimum: "1/10/1985",
                    maximum: "1/09/1985",
                },
            ]
        };
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeTruthy();
        expect(Creator.getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    "model." + Configuration.IS_WRONG_CONFIGURATION,
                    "model.undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
                    "model.param1." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param2." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
                    "model.param3." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
                    "model.param4." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "model.param4." + Attribute.PARAMETER_MINIMUM,
                ],
                name: "model",
                type: "Model"
            },
        ]);
    });
});

describe("Creator class tests - invalid singleChoice", function() {

    var Creator = Ompluscript.Model;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        Creator.reset();
    });

    it("invalid creation", function() {
        var definition = {
            type: "Model",
            name: "model",
            definition: [
                {},
                {
                    type: "SingleChoice"
                },
                {
                    type: "SingleChoice",
                    name: "param1",
                    required: 1
                },
                {
                    type: "SingleChoice",
                    name: "param2",
                    required: true,
                    choices: false,
                },
            ]
        };
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeTruthy();
        expect(Creator.getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    "model." + Configuration.IS_WRONG_CONFIGURATION,
                    "model.undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
                    "model.param1." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param2." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
                ],
                name: "model",
                type: "Model"
            },
        ]);
    });
});

describe("Creator class tests - invalid multipleChoice", function() {

    var Creator = Ompluscript.Model;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        Creator.reset();
    });

    it("invalid creation", function() {
        var definition = {
            type: "Model",
            name: "model",
            definition: [
                {},
                {
                    type: "MultipleChoice"
                },
                {
                    type: "MultipleChoice",
                    name: "param1",
                    required: 1
                },
                {
                    type: "MultipleChoice",
                    name: "param2",
                    required: true,
                    choices: false,
                },
            ]
        };
        Creator.define(definition);

        expect(Creator.hasErrors()).toBeTruthy();
        expect(Creator.getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    "model." + Configuration.IS_WRONG_CONFIGURATION,
                    "model.undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING,
                    "model.param1." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    "model.param2." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
                ],
                name: "model",
                type: "Model"
            },
        ]);
    });
});