describe("EmailInputConfiguration class tests - valid EmailInput", function() {

    var emailInputConfiguration;

    var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    var EmailInput = Ompluscript.View.Field.EmailInput;
    var String = Ompluscript.Model.Attribute.String;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        emailInputConfiguration = new EmailInputConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "EmailInput",
            name: "input"
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeFalsy();
        expect(emailInput.getPlaceholderContent()).toBeUndefined();
        expect(emailInput.isBound()).toBeFalsy();
        expect(emailInput.getBindingAttribute()).toBeUndefined();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "EmailInput",
            name: "input",
            attribute: true
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeFalsy();
        expect(emailInput.getPlaceholderContent()).toBeUndefined();
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input">',
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
            type: "EmailInput",
            name: "input",
            attribute: {
                required: true,
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            }
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeFalsy();
        expect(emailInput.getPlaceholderContent()).toBeUndefined();
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input">',
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
            name: "emailInputParam",
            required: true,
            type: "String",
            minimumLength: 3,
            maximumLength: 5,
            pattern: /value/,
        });
        var definition = {
            type: "EmailInput",
            name: "input",
            attribute: "emailInputParam"
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeFalsy();
        expect(emailInput.getPlaceholderContent()).toBeUndefined();
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input">',
            name: "input",
            attribute: {
                name: "emailInputParam",
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
            type: "EmailInput",
            name: "input",
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition, stringObject);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeFalsy();
        expect(emailInput.getPlaceholderContent()).toBeUndefined();
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getBindingAttribute()).toBe(stringObject);
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input">',
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
            type: "EmailInput",
            name: "input",
            placeholder: "emailInputParam"
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeTruthy();
        expect(emailInput.getPlaceholderContent()).toBe("emailInputParam");
        expect(emailInput.isBound()).toBeFalsy();
        expect(emailInput.getBindingAttribute()).toBeUndefined();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input" placeholder="emailInputParam">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - seventh", function() {
        var definition = {
            type: "EmailInput",
            name: "input",
            placeholder: "emailInputParam",
            attribute: {
                required: true,
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            }
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([]);
        var emailInput = emailInputConfiguration.create(definition);
        expect(emailInput instanceof EmailInput).toBeTruthy();
        expect(emailInput.getName()).toBe("input");
        expect(emailInput.isTranslated()).toBeTruthy();
        expect(emailInput.getPlaceholderContent()).toBe("emailInputParam");
        expect(emailInput.isBound()).toBeTruthy();
        expect(emailInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(emailInput.getStackTrace()).toEqual({
            html: '<input type="email" name="input" class="input" placeholder="emailInputParam">',
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

describe("EmailInputConfiguration class tests - invalid EmailInput", function() {

    var emailInputConfiguration;

    var EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    var EmailInput = Ompluscript.View.Field.EmailInput;
    var Input = Ompluscript.View.Field.Input;
    var String = Ompluscript.Model.Attribute.String;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Creator = Ompluscript.Model.Creator;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        emailInputConfiguration = new EmailInputConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "EmailInput",
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "EmailInput",
            name: "input",
            attribute: 1
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_ATTRIBUTE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute configuration", function() {
        var definition = {
            type: "EmailInput",
            name: "input",
            attribute: {
                required: "not",
                minimumLength: false,
                maximumLength: "not",
                pattern: "value",
            }
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([
            "attribute." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED,
        ]);
    });

    it("invalid attribute not defined", function() {
        var definition = {
            type: "EmailInput",
            name: "input",
            attribute: "not"
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([
            "not" + Configuration.MODEL_MUST_BE_DEFINED,
        ]);
    });

    it("invalid placeholder", function() {
        var definition = {
            type: "EmailInput",
            name: "input",
            placeholder: 1
        };
        expect(emailInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(emailInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_PLACEHOLDER + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});