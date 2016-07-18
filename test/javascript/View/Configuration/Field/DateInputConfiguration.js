describe("DateInputConfiguration class tests - valid DateInput", function() {

    var dateInputConfiguration;

    var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    var DateInput = Ompluscript.View.Field.DateInput;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var Creator = Ompluscript.Model.Creator;

    beforeAll(function() {
        dateInputConfiguration = new DateInputConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "DateInput",
            name: "input"
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeFalsy();
        expect(dateInput.getPlaceholderContent()).toBeUndefined();
        expect(dateInput.isBound()).toBeFalsy();
        expect(dateInput.getBindingAttribute()).toBeUndefined();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - second", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            attribute: true
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeFalsy();
        expect(dateInput.getPlaceholderContent()).toBeUndefined();
        expect(dateInput.isBound()).toBeTruthy();
        expect(dateInput.getBindingAttribute() instanceof Datetime).toBeTruthy();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: false,
                type: "string",
                value: void(0),
                minimum: void(0),
                minimumObject: void(0),
                maximum: void(0),
                maximumObject: void(0),
            },
        });
    });

    it("valid - third", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            attribute: {
                required: true,
                minimum: "1/10/1985",
                maximum: "1/12/1985",
            }
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeFalsy();
        expect(dateInput.getPlaceholderContent()).toBeUndefined();
        expect(dateInput.isBound()).toBeTruthy();
        expect(dateInput.getBindingAttribute() instanceof Datetime).toBeTruthy();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "string",
                value: void(0),
                minimum: "1/10/1985",
                minimumObject: new Date("1/10/1985"),
                maximum: "1/12/1985",
                maximumObject: new Date("1/12/1985"),
            },
        });
    });

    it("valid - fourth", function() {
        Creator.getInstance().define({
            name: "dateInputParam",
            required: true,
            type: "Datetime",
            minimum: "1/10/1985",
            maximum: "1/12/1985",
        });
        var definition = {
            type: "DateInput",
            name: "input",
            attribute: "dateInputParam"
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeFalsy();
        expect(dateInput.getPlaceholderContent()).toBeUndefined();
        expect(dateInput.isBound()).toBeTruthy();
        expect(dateInput.getBindingAttribute() instanceof Datetime).toBeTruthy();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input">',
            name: "input",
            attribute: {
                name: "dateInputParam",
                required: true,
                type: "string",
                value: void(0),
                minimum: "1/10/1985",
                minimumObject: new Date("1/10/1985"),
                maximum: "1/12/1985",
                maximumObject: new Date("1/12/1985"),
            },
        });
    });

    it("valid - fifth", function() {
        var stringObject = new Datetime("param");
        var definition = {
            type: "DateInput",
            name: "input",
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition, stringObject);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeFalsy();
        expect(dateInput.getPlaceholderContent()).toBeUndefined();
        expect(dateInput.isBound()).toBeTruthy();
        expect(dateInput.getBindingAttribute()).toBe(stringObject);
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input">',
            name: "input",
            attribute: {
                name: "param",
                required: false,
                type: "string",
                value: void(0),
                minimum: void(0),
                minimumObject: void(0),
                maximum: void(0),
                maximumObject: void(0),
            },
        });
    });

    it("valid - sixth", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            placeholder: "dateInputParam"
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeTruthy();
        expect(dateInput.getPlaceholderContent()).toBe("dateInputParam");
        expect(dateInput.isBound()).toBeFalsy();
        expect(dateInput.getBindingAttribute()).toBeUndefined();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input" placeholder="dateInputParam">',
            name: "input",
            attribute: void(0),
        });
    });

    it("valid - seventh", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            placeholder: "dateInputParam",
            attribute: {
                required: true,
                minimum: "1/10/1985",
                maximum: "1/12/1985",
            }
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([]);
        var dateInput = dateInputConfiguration.create(definition);
        expect(dateInput instanceof DateInput).toBeTruthy();
        expect(dateInput.getName()).toBe("input");
        expect(dateInput.isTranslated()).toBeTruthy();
        expect(dateInput.getPlaceholderContent()).toBe("dateInputParam");
        expect(dateInput.isBound()).toBeTruthy();
        expect(dateInput.getBindingAttribute() instanceof Datetime).toBeTruthy();
        expect(dateInput.getStackTrace()).toEqual({
            html: '<input type="date" name="input" class="input" placeholder="dateInputParam">',
            name: "input",
            attribute: {
                name: "attribute",
                required: true,
                type: "string",
                value: void(0),
                minimum: "1/10/1985",
                minimumObject: new Date("1/10/1985"),
                maximum: "1/12/1985",
                maximumObject: new Date("1/12/1985"),
            },
        });
    });
});

describe("DateInputConfiguration class tests - invalid DateInput", function() {

    var dateInputConfiguration;

    var DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    var DateInput = Ompluscript.View.Field.DateInput;
    var Input = Ompluscript.View.Field.Input;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Creator = Ompluscript.Model.Creator;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        dateInputConfiguration = new DateInputConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "DateInput",
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid attribute", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            attribute: 1
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_ATTRIBUTE + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED
        ]);
    });

    it("invalid attribute configuration", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            attribute: {
                required: 1,
                minimum: true,
                maximum: 1,
            }
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([
            "attribute." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "attribute." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
            "attribute." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
        ]);
    });

    it("invalid attribute not defined", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            attribute: "not"
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([
            "not" + Configuration.MUST_BE_DEFINED,
        ]);
    });

    it("invalid placeholder", function() {
        var definition = {
            type: "DateInput",
            name: "input",
            placeholder: 1
        };
        expect(dateInputConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(dateInputConfiguration.getErrors(definition)).toEqual([
            "input." + Input.PARAMETER_PLACEHOLDER + Configuration.MUST_BE_STRING_OR_UNDEFINED
        ]);
    });
});