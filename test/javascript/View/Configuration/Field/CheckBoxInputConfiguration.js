describe("CheckBoxInputConfiguration class tests - valid CheckBoxInput", function() {

    var checkBoxInputConfiguration;

    var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    var CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        checkBoxInputConfiguration = new CheckBoxInputConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "CheckBoxInput",
            name: "input"
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([]);
        var checkBoxInput = checkBoxInputConfiguration.create(definition);
        expect(checkBoxInput instanceof CheckBoxInput).toBeTruthy();
        expect(checkBoxInput.getName()).toBe("input");
        expect(checkBoxInput.isTranslated()).toBeFalsy();
        expect(checkBoxInput.getPlaceholderContent()).toBeUndefined();
        expect(checkBoxInput.isBound()).toBeFalsy();
        expect(checkBoxInput.getBindingAttribute()).toBeUndefined();
        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="input" class="input">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "CheckBoxInput",
            name: "input",
            attribute: true
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([]);
        var checkBoxInput = checkBoxInputConfiguration.create(definition);
        expect(checkBoxInput instanceof CheckBoxInput).toBeTruthy();
        expect(checkBoxInput.getName()).toBe("input");
        expect(checkBoxInput.isTranslated()).toBeFalsy();
        expect(checkBoxInput.getPlaceholderContent()).toBeUndefined();
        expect(checkBoxInput.isBound()).toBeTruthy();
        expect(checkBoxInput.getBindingAttribute() instanceof Boolean).toBeTruthy();
        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: false,
                type: "boolean",
                value: void(0),
                mustBeTrue: false,
            },
        });
    });

    it("valid - third", function() {
        var definition = {
            type: "CheckBoxInput",
            name: "input",
            attribute: {
                required: true,
                mustBeTrue: true,
            }
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([]);
        var checkBoxInput = checkBoxInputConfiguration.create(definition);
        expect(checkBoxInput instanceof CheckBoxInput).toBeTruthy();
        expect(checkBoxInput.getName()).toBe("input");
        expect(checkBoxInput.isTranslated()).toBeFalsy();
        expect(checkBoxInput.getPlaceholderContent()).toBeUndefined();
        expect(checkBoxInput.isBound()).toBeTruthy();
        expect(checkBoxInput.getBindingAttribute() instanceof Boolean).toBeTruthy();
        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "boolean",
                value: void(0),
                mustBeTrue: true,
            },
        });
    });

    it("valid - fourth", function() {
        Creator.getInstance().define({
            name: "checkBoxInputParam",
            required: true,
            type: "Boolean",
            mustBeTrue: true,
        });
        var definition = {
            type: "CheckBoxInput",
            name: "input",
            attribute: "checkBoxInputParam"
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([]);
        var checkBoxInput = checkBoxInputConfiguration.create(definition);
        expect(checkBoxInput instanceof CheckBoxInput).toBeTruthy();
        expect(checkBoxInput.getName()).toBe("input");
        expect(checkBoxInput.isTranslated()).toBeFalsy();
        expect(checkBoxInput.getPlaceholderContent()).toBeUndefined();
        expect(checkBoxInput.isBound()).toBeTruthy();
        expect(checkBoxInput.getBindingAttribute() instanceof Boolean).toBeTruthy();
        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="input" class="input">',
            name: "input",
            attribute: {
                name: "checkBoxInputParam",
                required: true,
                type: "boolean",
                value: void(0),
                mustBeTrue: true,
            },
        });
    });

    it("valid - fifth", function() {
        var booleanObject = new Boolean("param");
        var definition = {
            type: "CheckBoxInput",
            name: "input",
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([]);
        var checkBoxInput = checkBoxInputConfiguration.create(definition, booleanObject);
        expect(checkBoxInput instanceof CheckBoxInput).toBeTruthy();
        expect(checkBoxInput.getName()).toBe("input");
        expect(checkBoxInput.isTranslated()).toBeFalsy();
        expect(checkBoxInput.getPlaceholderContent()).toBeUndefined();
        expect(checkBoxInput.isBound()).toBeTruthy();
        expect(checkBoxInput.getBindingAttribute()).toBe(booleanObject);
        expect(checkBoxInput.getStackTrace()).toEqual({
            html: '<input type="checkbox" name="input" class="input">',
            name: "input",
            attribute: {
                name: "param",
                required: false,
                type: "boolean",
                value: void(0),
                mustBeTrue: false,
            },
        });
    });
});

describe("CheckBoxInputConfiguration class tests - invalid CheckBoxInput", function() {

    var checkBoxInputConfiguration;

    var CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    var CheckBoxInput = Ompluscript.View.Field.CheckBoxInput;
    var Input = Ompluscript.View.Field.Input;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Creator = Ompluscript.Model.Creator;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        checkBoxInputConfiguration = new CheckBoxInputConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "CheckBoxInput",
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "CheckBoxInput",
            name: "input",
            attribute: 1
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_ATTRIBUTE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute configuration", function() {
        var definition = {
            type: "CheckBoxInput",
            name: "input",
            attribute: {
                required: 1,
                mustBeTrue: 1,
            }
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([
            "attribute." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + Boolean.PARAMETER_MUST_BE_TRUE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute not defined", function() {
        var definition = {
            type: "CheckBoxInput",
            name: "input",
            attribute: "not"
        };
        expect(checkBoxInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(checkBoxInputConfiguration.getErrors(definition)).toEqual([
            "not" + Configuration.MODEL_MUST_BE_DEFINED,
        ]);
    });
});