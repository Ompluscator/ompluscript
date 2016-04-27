describe("Creator class tests - valid creator", function() {

    var definition = [
        {
            name: "param1",
            required: true,
            type: "string",
            minimumLength: 2,
            maximumLength: 4,
            pattern: /value/,
        },
        {
            name: "param1",
            type: "string",
        },
        {
            name: "param2",
            required: true,
            type: "boolean",
        },
        {
            name: "param3",
            required: true,
            type: "number",
            minimum: 3,
            includeMinimum: true,
            maximum: 5,
            includeMaximum: false,
        },
        {
            name: "param4",
            required: false,
            type: "datetime",
            minimum: "1/10/1985",
            maximum: "1/12/1985",
        },
        {
            name: "param5",
            required: true,
            type: "singleChoice",
            choices: [1],
        },
        {
            name: "param5",
            required: true,
            type: "multipleChoice",
            choices: [1, 2],
        }
    ];

    var Creator = Ompluscript.Model.Creator;
    var Model = Ompluscript.Model.Container.Model;
    var Table = Ompluscript.Model.Container.Table;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("get configuration", function() {
        expect(Creator.getInstance() instanceof Creator).toBeTruthy();
        expect(Creator.getInstance().hasErrors()).toBeFalsy();
        expect(Creator.getInstance().getErrors()).toEqual([]);
    });

    it("valid creation", function() {
        Creator.getInstance().define("containerModel", "model", definition);
        Creator.getInstance().define("containerTable", "table", definition);

        expect(Creator.getInstance() instanceof Creator).toBeTruthy();
        expect(Creator.getInstance().hasErrors()).toBeFalsy();
        expect(Creator.getInstance().getErrors()).toEqual([]);
        expect(Creator.getInstance().create("containerModel") instanceof Model).toBeTruthy();
        expect(Creator.getInstance().create("containerTable") instanceof Table).toBeTruthy();
    });
});

describe("Creator class tests - invalid string", function() {

    var Creator = Ompluscript.Model.Creator;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("invalid creation", function() {
        var definition = [
            {},
            {
                type: "string"
            },
            {
                type: "string",
                name: "param",
                required: 1
            },
            {
                type: "string",
                name: "param",
                required: true,
                minimumLength: false,
            },
            {
                type: "string",
                name: "param",
                required: true,
                minimumLength: 2,
                maximumLength: false,
            },
            {
                type: "string",
                name: "param",
                required: true,
                minimumLength: 2,
                maximumLength: 1,
            },
            {
                type: "string",
                name: "param",
                required: true,
                minimumLength: 2,
                maximumLength: 4,
                pattern: false
            }
        ];
        Creator.getInstance().define("containerModel", "model", definition);

        expect(Creator.getInstance().hasErrors()).toBeTruthy();
        expect(Creator.getInstance().getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE,
                    Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING,
                    Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    String.PARAMETER_MINIMUM_LENGTH + Creator.MUST_BE_NUMBER_OR_UNDEFINED,
                    String.PARAMETER_MAXIMUM_LENGTH + Creator.MUST_BE_NUMBER_OR_UNDEFINED,
                    String.PARAMETER_MAXIMUM_LENGTH + Creator.MUST_BE_GREATER + String.PARAMETER_MINIMUM_LENGTH,
                    String.PARAMETER_PATTERN + Creator.MUST_BE_REGEX_OR_UNDEFINED
                ],
                name: "containerModel",
                type: "model"
            },
        ]);
    });
});

describe("Creator class tests - invalid number", function() {

    var Creator = Ompluscript.Model.Creator;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("invalid creation", function() {
        var definition = [
            {},
            {
                type: "number"
            },
            {
                type: "number",
                name: "param",
                required: 1
            },
            {
                type: "number",
                name: "param",
                required: true,
                minimum: false,
            },
            {
                type: "number",
                name: "param",
                required: true,
                minimum: 2,
                maximum: false,
            },
            {
                type: "number",
                name: "param",
                required: true,
                minimum: 2,
                maximum: 2,
            },
            {
                type: "number",
                name: "param",
                required: true,
                minimum: 2,
                maximum: 4,
                includeMinimum: 1
            },
            {
                type: "number",
                name: "param",
                required: true,
                minimum: 2,
                maximum: 4,
                includeMinimum: true,
                includeMaximum: 2
            },
            {
                type: "number",
                name: "param",
                required: true,
                minimum: 2,
                maximum: 1,
                includeMinimum: true,
                includeMaximum: true
            }
        ];
        Creator.getInstance().define("containerModel", "model", definition);

        expect(Creator.getInstance().hasErrors()).toBeTruthy();
        expect(Creator.getInstance().getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE,
                    Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING,
                    Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    Attribute.PARAMETER_MINIMUM + Creator.MUST_BE_NUMBER_OR_UNDEFINED,
                    Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_NUMBER_OR_UNDEFINED,
                    Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM,
                    Number.PARAMETER_INCLUDE_MINIMUM + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    Number.PARAMETER_INCLUDE_MAXIMUM + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM,
                ],
                name: "containerModel",
                type: "model"
            },
        ]);
    });
});

describe("Creator class tests - invalid boolean", function() {

    var Creator = Ompluscript.Model.Creator;
    var Attribute = Ompluscript.Model.Attribute.Attribute;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("invalid creation", function() {
        var definition = [
            {},
            {
                type: "boolean"
            },
            {
                type: "boolean",
                name: "param",
                required: 1
            },
        ];
        Creator.getInstance().define("containerModel", "model", definition);

        expect(Creator.getInstance().hasErrors()).toBeTruthy();
        expect(Creator.getInstance().getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE,
                    Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING,
                    Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                ],
                name: "containerModel",
                type: "model"
            },
        ]);
    });
});

describe("Creator class tests - invalid number", function() {

    var Creator = Ompluscript.Model.Creator;
    var Attribute = Ompluscript.Model.Attribute.Attribute;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("invalid creation", function() {
        var definition = [
            {},
            {
                type: "datetime"
            },
            {
                type: "datetime",
                name: "param",
                required: 1
            },
            {
                type: "datetime",
                name: "param",
                required: true,
                minimum: false,
            },
            {
                type: "datetime",
                name: "param",
                required: true,
                minimum: "1/10/1985",
                maximum: false,
            },
            {
                type: "datetime",
                name: "param",
                required: true,
                minimum: "1/10/1985",
                maximum: "1/09/1985",
            },
        ];
        Creator.getInstance().define("containerModel", "model", definition);

        expect(Creator.getInstance().hasErrors()).toBeTruthy();
        expect(Creator.getInstance().getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE,
                    Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING,
                    Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    Attribute.PARAMETER_MINIMUM + Creator.MUST_BE_DATETIME_OR_UNDEFINED,
                    Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_DATETIME_OR_UNDEFINED,
                    Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM,
                ],
                name: "containerModel",
                type: "model"
            },
        ]);
    });
});

describe("Creator class tests - invalid singleChoice", function() {

    var Creator = Ompluscript.Model.Creator;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("invalid creation", function() {
        var definition = [
            {},
            {
                type: "singleChoice"
            },
            {
                type: "singleChoice",
                name: "param",
                required: 1
            },
            {
                type: "singleChoice",
                name: "param",
                required: true,
                choices: false,
            },
        ];
        Creator.getInstance().define("containerModel", "model", definition);

        expect(Creator.getInstance().hasErrors()).toBeTruthy();
        expect(Creator.getInstance().getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE,
                    Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING,
                    Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    Choice.PARAMETER_CHOICES + Creator.MUST_BE_ARRAY_OR_UNDEFINED,
                ],
                name: "containerModel",
                type: "model"
            },
        ]);
    });
});

describe("Creator class tests - invalid multipleChoice", function() {

    var Creator = Ompluscript.Model.Creator;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;

    beforeAll(function() {
        Creator.getInstance().reset();
    });

    it("invalid creation", function() {
        var definition = [
            {},
            {
                type: "multipleChoice"
            },
            {
                type: "multipleChoice",
                name: "param",
                required: 1
            },
            {
                type: "multipleChoice",
                name: "param",
                required: true,
                choices: false,
            },
        ];
        Creator.getInstance().define("containerModel", "model", definition);

        expect(Creator.getInstance().hasErrors()).toBeTruthy();
        expect(Creator.getInstance().getErrors()).toEqual([
            {
                definition: definition,
                errors: [
                    Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE,
                    Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING,
                    Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED,
                    Choice.PARAMETER_CHOICES + Creator.MUST_BE_ARRAY_OR_UNDEFINED,
                ],
                name: "containerModel",
                type: "model"
            },
        ]);
    });
});