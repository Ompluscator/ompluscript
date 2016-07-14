describe("DatetimeConfiguration class tests - valid datetime", function() {

    var datetimeConfiguration;

    var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
    var Datetime = Ompluscript.Model.Attribute.Datetime;

    beforeAll(function() {
        datetimeConfiguration = new DatetimeConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "Datetime",
            name: "datetime"
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([]);
        expect(datetimeConfiguration.create(definition) instanceof Datetime).toBeTruthy();
        expect(datetimeConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(datetimeConfiguration.create(definition).getMinimum()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMinimumDateObject()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMaximum()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMaximumDateObject()).toBeUndefined();
    });

    it("valid - second", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: true,
            minimum: "1/10/1985",
            maximum: "1/12/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([]);
        expect(datetimeConfiguration.create(definition) instanceof Datetime).toBeTruthy();
        expect(datetimeConfiguration.create(definition).isRequired()).toBeTruthy();
        expect(datetimeConfiguration.create(definition).getMinimum()).toBe("1/10/1985");
        expect(datetimeConfiguration.create(definition).getMinimumDateObject()).toEqual(new Date("1/10/1985"));
        expect(datetimeConfiguration.create(definition).getMaximum()).toBe("1/12/1985");
        expect(datetimeConfiguration.create(definition).getMaximumDateObject()).toEqual(new Date("1/12/1985"));
    });

    it("valid - third", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: false,
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([]);
        expect(datetimeConfiguration.create(definition) instanceof Datetime).toBeTruthy();
        expect(datetimeConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(datetimeConfiguration.create(definition).getMinimum()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMinimumDateObject()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMaximum()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMaximumDateObject()).toBeUndefined();
    });

    it("valid - fourth", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            minimum: "1/10/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([]);
        expect(datetimeConfiguration.create(definition) instanceof Datetime).toBeTruthy();
        expect(datetimeConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(datetimeConfiguration.create(definition).getMinimum()).toBe("1/10/1985");
        expect(datetimeConfiguration.create(definition).getMinimumDateObject()).toEqual(new Date("1/10/1985"));
        expect(datetimeConfiguration.create(definition).getMaximum()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMaximumDateObject()).toBeUndefined();
    });

    it("valid - fifth", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            maximum: "1/12/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([]);
        expect(datetimeConfiguration.create(definition) instanceof Datetime).toBeTruthy();
        expect(datetimeConfiguration.create(definition).isRequired()).toBeFalsy();
        expect(datetimeConfiguration.create(definition).getMinimum()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMinimumDateObject()).toBeUndefined();
        expect(datetimeConfiguration.create(definition).getMaximum()).toBe("1/12/1985");
        expect(datetimeConfiguration.create(definition).getMaximumDateObject()).toEqual(new Date("1/12/1985"));
    });
});

describe("DatetimeConfiguration class tests - invalid datetime", function() {

    var datetimeConfiguration;
    var undefined;

    var DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        datetimeConfiguration = new DatetimeConfiguration();
    });

    it("invalid name", function() {
        var definition = {
            type: "Datetime"
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "undefined." + Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid configuration - first", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: "not",
            minimum: "1/10/1985",
            maximum: "1/09/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "datetime." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "datetime." + Attribute.PARAMETER_MINIMUM,
        ]);
    });

    it("invalid configuration - second", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: 1,
            minimum: true,
            maximum: 1,
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "datetime." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
        ]);
    });

    it("invalid required", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: 1,
            minimum: "1/10/1985",
            maximum: "1/12/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "datetime." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
        ]);
    });

    it("invalid minimum", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: true,
            minimum: false,
            maximum: "1/12/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "datetime." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
        ]);
    });

    it("invalid maximum", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: true,
            minimum: "1/10/1985",
            maximum: "not",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "datetime." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_DATETIME_OR_UNDEFINED,
        ]);
    });

    it("invalid order", function() {
        var definition = {
            type: "Datetime",
            name: "datetime",
            required: false,
            minimum: "1/10/1985",
            maximum: "1/09/1985",
        };
        expect(datetimeConfiguration.getErrors(definition)).toEqual([
            "datetime." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "datetime." + Attribute.PARAMETER_MINIMUM,
        ]);
    });
});