describe("PasswordInputConfiguration class tests - valid PasswordInput", function() {

    var passwordInputConfiguration;

    var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    var PasswordInput = Ompluscript.View.Field.PasswordInput;
    var String = Ompluscript.Model.Attribute.String;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        passwordInputConfiguration = new PasswordInputConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "PasswordInput",
            name: "input"
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeFalsy();
        expect(passwordInput.getPlaceholderContent()).toBeUndefined();
        expect(passwordInput.isBound()).toBeFalsy();
        expect(passwordInput.getBindingAttribute()).toBeUndefined();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "PasswordInput",
            name: "input",
            attribute: true
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeFalsy();
        expect(passwordInput.getPlaceholderContent()).toBeUndefined();
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input">',
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
            type: "PasswordInput",
            name: "input",
            attribute: {
                required: true,
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            }
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeFalsy();
        expect(passwordInput.getPlaceholderContent()).toBeUndefined();
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input">',
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
            name: "passwordInputParam",
            required: true,
            type: "String",
            minimumLength: 3,
            maximumLength: 5,
            pattern: /value/,
        });
        var definition = {
            type: "PasswordInput",
            name: "input",
            attribute: "passwordInputParam"
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeFalsy();
        expect(passwordInput.getPlaceholderContent()).toBeUndefined();
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input">',
            name: "input",
            attribute: {
                name: "passwordInputParam",
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
            type: "PasswordInput",
            name: "input",
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition, stringObject);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeFalsy();
        expect(passwordInput.getPlaceholderContent()).toBeUndefined();
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getBindingAttribute()).toBe(stringObject);
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input">',
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
            type: "PasswordInput",
            name: "input",
            placeholder: "passwordInputParam"
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeTruthy();
        expect(passwordInput.getPlaceholderContent()).toBe("passwordInputParam");
        expect(passwordInput.isBound()).toBeFalsy();
        expect(passwordInput.getBindingAttribute()).toBeUndefined();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input" placeholder="passwordInputParam">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - seventh", function() {
        var definition = {
            type: "PasswordInput",
            name: "input",
            placeholder: "passwordInputParam",
            attribute: {
                required: true,
                minimumLength: 3,
                maximumLength: 5,
                pattern: /value/,
            }
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([]);
        var passwordInput = passwordInputConfiguration.create(definition);
        expect(passwordInput instanceof PasswordInput).toBeTruthy();
        expect(passwordInput.getName()).toBe("input");
        expect(passwordInput.isTranslated()).toBeTruthy();
        expect(passwordInput.getPlaceholderContent()).toBe("passwordInputParam");
        expect(passwordInput.isBound()).toBeTruthy();
        expect(passwordInput.getBindingAttribute() instanceof String).toBeTruthy();
        expect(passwordInput.getStackTrace()).toEqual({
            html: '<input type="password" name="input" class="input" placeholder="passwordInputParam">',
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

describe("PasswordInputConfiguration class tests - invalid PasswordInput", function() {

    var passwordInputConfiguration;

    var PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    var PasswordInput = Ompluscript.View.Field.PasswordInput;
    var Input = Ompluscript.View.Field.Input;
    var String = Ompluscript.Model.Attribute.String;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Creator = Ompluscript.Model.Creator;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        passwordInputConfiguration = new PasswordInputConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "PasswordInput",
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "PasswordInput",
            name: "input",
            attribute: 1
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_ATTRIBUTE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute configuration", function() {
        var definition = {
            type: "PasswordInput",
            name: "input",
            attribute: {
                required: "not",
                minimumLength: false,
                maximumLength: "not",
                pattern: "value",
            }
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([
            "attribute." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED,
        ]);
    });

    it("invalid attribute not defined", function() {
        var definition = {
            type: "PasswordInput",
            name: "input",
            attribute: "not"
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });

    it("invalid placeholder", function() {
        var definition = {
            type: "PasswordInput",
            name: "input",
            placeholder: 1
        };
        expect(passwordInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(passwordInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_PLACEHOLDER + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});