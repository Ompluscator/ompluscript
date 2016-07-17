describe("TextInputConfiguration class tests - valid TextInput", function() {

    var textInputConfiguration;

    var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
    var TextInput = Ompluscript.View.Field.TextInput;
    var String = Ompluscript.Model.Attribute.String;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        textInputConfiguration = new TextInputConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "TextInput",
            name: "input"
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeFalsy();
        expect(textInput.getPlaceholderContent()).toBeUndefined();
        expect(textInput.isBound()).toBeFalsy();
        expect(textInput.getBindingAttribute()).toBeUndefined();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            attribute: true
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeFalsy();
        expect(textInput.getPlaceholderContent()).toBeUndefined();
        expect(textInput.isBound()).toBeTruthy();
        expect(textInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: false,
                type: "string",
                value: void(0),
                minimumLength: void(0),
                maximumLength: void(0),
                pattern: void(0),
            },
        });
    });

    it("valid - third", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            attribute: {
                required: true,
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            }
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeFalsy();
        expect(textInput.getPlaceholderContent()).toBeUndefined();
        expect(textInput.isBound()).toBeTruthy();
        expect(textInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "string",
                value: void(0),
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            },
        });
    });

    it("valid - fourth", function() {
        Creator.getInstance().define({
            name: "textInputParam",
            required: true,
            type: "String",
            minimumLength: 3,
            maximumLength: 5,
            pattern: /value/,
        });
        var definition = {
            type: "TextInput",
            name: "input",
            attribute: "textInputParam"
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeFalsy();
        expect(textInput.getPlaceholderContent()).toBeUndefined();
        expect(textInput.isBound()).toBeTruthy();
        expect(textInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input">',
            name: "input",
            attribute: {
                name: "textInputParam",
                required: true,
                type: "string",
                value: void(0),
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            },
        });
    });

    it("valid - fifth", function() {
        var stringObject = new String("param");
        var definition = {
            type: "TextInput",
            name: "input",
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition, stringObject);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeFalsy();
        expect(textInput.getPlaceholderContent()).toBeUndefined();
        expect(textInput.isBound()).toBeTruthy();
        expect(textInput.getBindingAttribute()).toBe(stringObject);
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input">',
            name: "input",
            attribute: {
                name: "param",
                required: false,
                type: "string",
                value: void(0),
                minimumLength: void(0),
                maximumLength: void(0),
                pattern: void(0),
            },
        });
    });

    it("valid - sixth", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            placeholder: "textInputParam"
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeTruthy();
        expect(textInput.getPlaceholderContent()).toBe("textInputParam");
        expect(textInput.isBound()).toBeFalsy();
        expect(textInput.getBindingAttribute()).toBeUndefined();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input" placeholder="textInputParam">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - seventh", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            placeholder: "textInputParam",
            attribute: {
                required: true,
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            }
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([]);
        var textInput = textInputConfiguration.create(definition);
        expect(textInput instanceof TextInput).toBeTruthy();
        expect(textInput.getName()).toBe("input");
        expect(textInput.isTranslated()).toBeTruthy();
        expect(textInput.getPlaceholderContent()).toBe("textInputParam");
        expect(textInput.isBound()).toBeTruthy();
        expect(textInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(textInput.getStackTrace()).toEqual({
            html: '<input type="text" name="input" class="input" placeholder="textInputParam">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "string",
                value: void(0),
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            },
        });
    });
});

describe("TextInputConfiguration class tests - invalid TextInput", function() {

    var textInputConfiguration;

    var TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
    var TextInput = Ompluscript.View.Field.TextInput;
    var Input = Ompluscript.View.Field.Input;
    var String = Ompluscript.Model.Attribute.String;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Creator = Ompluscript.Model.Creator;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        textInputConfiguration = new TextInputConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "TextInput",
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            attribute: 1
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_ATTRIBUTE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute configuration", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            attribute: {
                required: "not",
                minimumLength: false,
                maximumLength: "not",
                pattern: "value",
            }
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([
            "attribute." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED,
        ]);
    });

    it("invalid attribute not defined", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            attribute: "not"
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });

    it("invalid placeholder", function() {
        var definition = {
            type: "TextInput",
            name: "input",
            placeholder: 1
        };
        expect(textInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(textInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_PLACEHOLDER + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});