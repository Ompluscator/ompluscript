describe("NumberInputConfiguration class tests - valid NumberInput", function() {

    var numberInputConfiguration;

    var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    var NumberInput = Ompluscript.View.Field.NumberInput;
    var Number = Ompluscript.Model.Attribute.Number;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        numberInputConfiguration = new NumberInputConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "NumberInput",
            name: "input"
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeFalsy();
        expect(numberInput.getPlaceholderContent()).toBeUndefined();
        expect(numberInput.isBound()).toBeFalsy();
        expect(numberInput.getBindingAttribute()).toBeUndefined();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            attribute: true
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeFalsy();
        expect(numberInput.getPlaceholderContent()).toBeUndefined();
        expect(numberInput.isBound()).toBeTruthy();
        expect(numberInput.getBindingAttribute() instanceof Number).toBeTruthy();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: false,
                type: "number",
                value: void(0),
                minimum: void(0),
                includeMinimum: false,
                maximum: void(0),
                includeMaximum: false,
            },
        });
    });

    it("valid - third", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            attribute: {
                required: true,
                minimum: 1,
                includeMinimum: true,
                maximum: 5,
                includeMaximum: true,
            }
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeFalsy();
        expect(numberInput.getPlaceholderContent()).toBeUndefined();
        expect(numberInput.isBound()).toBeTruthy();
        expect(numberInput.getBindingAttribute() instanceof Number).toBeTruthy();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "number",
                value: void(0),
                minimum: 1,
                includeMinimum: true,
                maximum: 5,
                includeMaximum: true,
            },
        });
    });

    it("valid - fourth", function() {
        Creator.getInstance().define({
            name: "numberInputParam",
            required: true,
            type: "Number",
            minimum: 1,
            includeMinimum: true,
            maximum: 5,
            includeMaximum: true,
        });
        var definition = {
            type: "NumberInput",
            name: "input",
            attribute: "numberInputParam"
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeFalsy();
        expect(numberInput.getPlaceholderContent()).toBeUndefined();
        expect(numberInput.isBound()).toBeTruthy();
        expect(numberInput.getBindingAttribute() instanceof Number).toBeTruthy();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input">',
            name: "input",
            attribute: {
                name: "numberInputParam",
                required: true,
                type: "number",
                value: void(0),
                minimum: 1,
                includeMinimum: true,
                maximum: 5,
                includeMaximum: true,
            },
        });
    });

    it("valid - fifth", function() {
        var numberObject = new Number("param");
        var definition = {
            type: "NumberInput",
            name: "input",
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition, numberObject);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeFalsy();
        expect(numberInput.getPlaceholderContent()).toBeUndefined();
        expect(numberInput.isBound()).toBeTruthy();
        expect(numberInput.getBindingAttribute()).toBe(numberObject);
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input">',
            name: "input",
            attribute: {
                name: "param",
                required: false,
                type: "number",
                value: void(0),
                minimum: void(0),
                includeMinimum: false,
                maximum: void(0),
                includeMaximum: false,
            },
        });
    });

    it("valid - sixth", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            placeholder: "numberInputParam"
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeTruthy();
        expect(numberInput.getPlaceholderContent()).toBe("numberInputParam");
        expect(numberInput.isBound()).toBeFalsy();
        expect(numberInput.getBindingAttribute()).toBeUndefined();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input" placeholder="numberInputParam">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - seventh", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            placeholder: "numberInputParam",
            attribute: {
                required: true,
                minimum: 1,
                includeMinimum: true,
                maximum: 5,
                includeMaximum: true,
            }
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([]);
        var numberInput = numberInputConfiguration.create(definition);
        expect(numberInput instanceof NumberInput).toBeTruthy();
        expect(numberInput.getName()).toBe("input");
        expect(numberInput.isTranslated()).toBeTruthy();
        expect(numberInput.getPlaceholderContent()).toBe("numberInputParam");
        expect(numberInput.isBound()).toBeTruthy();
        expect(numberInput.getBindingAttribute() instanceof Number).toBeTruthy();
        expect(numberInput.getStackTrace()).toEqual({
            html: '<input type="number" name="input" class="input" placeholder="numberInputParam">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "number",
                value: void(0),
                minimum: 1,
                includeMinimum: true,
                maximum: 5,
                includeMaximum: true,
            },
        });
    });
});

describe("NumberInputConfiguration class tests - invalid NumberInput", function() {

    var numberInputConfiguration;

    var NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    var NumberInput = Ompluscript.View.Field.NumberInput;
    var Input = Ompluscript.View.Field.Input;
    var Number = Ompluscript.Model.Attribute.Number;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Creator = Ompluscript.Model.Creator;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        numberInputConfiguration = new NumberInputConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "NumberInput",
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            attribute: 1
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_ATTRIBUTE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute configuration", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            attribute: {
                required: "not",
                minimum: "not",
                includeMinimum: 3,
                maximum: false,
                includeMaximum: "not",
            }
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([
            "attribute." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "attribute." + Number.PARAMETER_INCLUDE_MINIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + Number.PARAMETER_INCLUDE_MAXIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid attribute not defined", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            attribute: "not"
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });

    it("invalid placeholder", function() {
        var definition = {
            type: "NumberInput",
            name: "input",
            placeholder: 1
        };
        expect(numberInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(numberInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_PLACEHOLDER + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});