describe("TableConfiguration class tests - valid Table", function() {

    var tableConfiguration;

    var TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
    var Table = Ompluscript.Model.Container.Table;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var String = Ompluscript.Model.Attribute.String;
    var Number = Ompluscript.Model.Attribute.Number;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    var LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;
    var SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;

    beforeAll(function() {
        tableConfiguration = new TableConfiguration();
    });

    it("valid - empty", function() {
        var definition = {
            type: "Table",
            name: "table"
        };
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([]);
        expect(tableConfiguration.create(definition) instanceof Table).toBeTruthy();
        expect(tableConfiguration.create(definition).getName()).toBe("table");
        expect(tableConfiguration.create(definition).getStackTrace()).toEqual({
            name: "table",
            proxies: [],
            rows: [],
            attributes: [],
        });
    });

    it("valid - attributes", function() {
        var definition = {
            type: "Table",
            name: "table",
            attributes: [
                {
                    type: "Boolean",
                    name: "boolean",
                    required: true,
                    mustBeTrue: true,
                },
                {
                    type: "String",
                    name: "string",
                    required: true,
                    minimumLength: 1,
                    maximumLength: 5,
                    pattern: /value/,
                },
                {
                    type: "Number",
                    name: "number",
                    required: true,
                    minimum: 1,
                    includeMinimum: true,
                    maximum: 5,
                    includeMaximum: true,
                },
                {
                    type: "Datetime",
                    name: "datetime",
                    required: true,
                    minimum: "1/10/1985",
                    maximum: "1/12/1985",
                },
                {
                    type: "SingleChoice",
                    name: "singleChoice",
                    required: true,
                    choices: [1, 2],
                },
                {
                    type: "MultipleChoice",
                    name: "multipleChoice",
                    required: true,
                    choices: [1, 2],
                }
            ],
        };
        var table = tableConfiguration.create(definition);
        table.addRow({});
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([]);
        expect(table instanceof Table).toBeTruthy();
        expect(table.getName()).toBe("table");
        expect(table.getRowByIndex(0).hasAttribute("string")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("number")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("boolean")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("datetime")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("singleChoice")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("multipleChoice")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("not")).toBeFalsy();
        expect(table.getRowByIndex(0).getAttribute("string") instanceof String).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("number") instanceof Number).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("boolean") instanceof Boolean).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("datetime") instanceof Datetime).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("singleChoice") instanceof SingleChoice).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("multipleChoice") instanceof MultipleChoice).toBeTruthy();
        expect(table.getProxy("AjaxProxy") instanceof AjaxProxy).toBeFalsy();
        expect(table.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeFalsy();
        expect(table.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeFalsy();
        expect(table.getStackTrace()).toEqual({
            name: "table",
            proxies: [],
            rows: [
                {
                    name: "table",
                    proxies: [],
                    attributes: {
                        boolean:
                        {
                            name: "boolean",
                            required: true,
                            type: "boolean",
                            value: void(0),
                            mustBeTrue: true,
                        },
                        string:
                        {
                            name: "string",
                            required: true,
                            type: "string",
                            value: void(0),
                            minimumLength: 1,
                            maximumLength: 5,
                            pattern: /value/,
                        },
                        number:
                        {
                            name: "number",
                            required: true,
                            type: "number",
                            value: void(0),
                            minimum: 1,
                            includeMinimum: true,
                            maximum: 5,
                            includeMaximum: true,
                        },
                        datetime:
                        {
                            name: "datetime",
                            required: true,
                            type: "string",
                            value: void(0),
                            minimum: "1/10/1985",
                            minimumObject: new Date("1/10/1985"),
                            maximum: "1/12/1985",
                            maximumObject: new Date("1/12/1985"),
                        },
                        singleChoice:
                        {
                            name: "singleChoice",
                            required: true,
                            type: "number",
                            value: void(0),
                            choices: [1, 2],
                        },
                        multipleChoice:
                        {
                            name: "multipleChoice",
                            required: true,
                            type: "number",
                            value: void(0),
                            choices: [1, 2],
                        }
                    }
                }
            ],
            attributes: [
                {
                    name: "boolean",
                    required: true,
                    type: "boolean",
                    value: void(0),
                    mustBeTrue: true,
                },
                {
                    name: "string",
                    required: true,
                    type: "string",
                    value: void(0),
                    minimumLength: 1,
                    maximumLength: 5,
                    pattern: /value/,
                },
                {
                    name: "number",
                    required: true,
                    type: "number",
                    value: void(0),
                    minimum: 1,
                    includeMinimum: true,
                    maximum: 5,
                    includeMaximum: true,
                },
                {
                    name: "datetime",
                    required: true,
                    type: "string",
                    value: void(0),
                    minimum: "1/10/1985",
                    minimumObject: new Date("1/10/1985"),
                    maximum: "1/12/1985",
                    maximumObject: new Date("1/12/1985"),
                },
                {
                    name: "singleChoice",
                    required: true,
                    type: "number",
                    value: void(0),
                    choices: [1, 2],
                },
                {
                    name: "multipleChoice",
                    required: true,
                    type: "number",
                    value: void(0),
                    choices: [1, 2],
                }
            ]
        });
    });
    it("valid - proxies", function() {
        var definition = {
            type: "Table",
            name: "table",
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: "save",
                    updateLink: "update",
                    deleteLink: "delete",
                    selectLink: "select"
                },
                {
                    type: "LocalStorageProxy",
                },
                {
                    type: "SessionStorageProxy",
                }
            ],
        };
        var table = tableConfiguration.create(definition);
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([]);
        expect(table instanceof Table).toBeTruthy();
        expect(table.getName()).toBe("table");
        expect(table.hasProxy("AjaxProxy")).toBeTruthy();
        expect(table.hasProxy("LocalStorageProxy")).toBeTruthy();
        expect(table.hasProxy("SessionStorageProxy")).toBeTruthy();
        expect(table.hasProxy("not")).toBeFalsy();
        expect(table.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(table.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeTruthy();
        expect(table.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeTruthy();
        expect(table.getStackTrace()).toEqual({
            name: "table",
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: "save",
                    updateLink: "update",
                    deleteLink: "delete",
                    selectLink: "select"
                },
                {
                    type: "LocalStorageProxy",
                },
                {
                    type: "SessionStorageProxy",
                }
            ],
            rows: [],
            attributes: [],
        });
    });

    it("valid - all", function() {
        var definition = {
            type: "Table",
            name: "table",
            attributes: [
                {
                    type: "Boolean",
                    name: "boolean",
                    required: true,
                    mustBeTrue: true,
                },
                {
                    type: "String",
                    name: "string",
                    required: true,
                    minimumLength: 1,
                    maximumLength: 5,
                    pattern: /value/,
                },
                {
                    type: "Number",
                    name: "number",
                    required: true,
                    minimum: 1,
                    includeMinimum: true,
                    maximum: 5,
                    includeMaximum: true,
                },
                {
                    type: "Datetime",
                    name: "datetime",
                    required: true,
                    minimum: "1/10/1985",
                    maximum: "1/12/1985",
                },
                {
                    type: "SingleChoice",
                    name: "singleChoice",
                    required: true,
                    choices: [1, 2],
                },
                {
                    type: "MultipleChoice",
                    name: "multipleChoice",
                    required: true,
                    choices: [1, 2],
                }
            ],
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: "save",
                    updateLink: "update",
                    deleteLink: "delete",
                    selectLink: "select"
                },
                {
                    type: "LocalStorageProxy",
                },
                {
                    type: "SessionStorageProxy",
                }
            ],
        };
        var table = tableConfiguration.create(definition);
        table.addRow({});
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([]);
        expect(table instanceof Table).toBeTruthy();
        expect(table.getName()).toBe("table");
        expect(table.getRowByIndex(0).hasAttribute("string")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("number")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("boolean")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("datetime")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("singleChoice")).toBeTruthy();
        expect(table.getRowByIndex(0).hasAttribute("multipleChoice")).toBeTruthy();
        expect(table.hasProxy("AjaxProxy")).toBeTruthy();
        expect(table.hasProxy("LocalStorageProxy")).toBeTruthy();
        expect(table.hasProxy("SessionStorageProxy")).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("string") instanceof String).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("number") instanceof Number).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("boolean") instanceof Boolean).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("datetime") instanceof Datetime).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("singleChoice") instanceof SingleChoice).toBeTruthy();
        expect(table.getRowByIndex(0).getAttribute("multipleChoice") instanceof MultipleChoice).toBeTruthy();
        expect(table.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(table.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeTruthy();
        expect(table.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeTruthy();
        expect(table.getStackTrace()).toEqual({
            name: "table",
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: "save",
                    updateLink: "update",
                    deleteLink: "delete",
                    selectLink: "select"
                },
                {
                    type: "LocalStorageProxy",
                },
                {
                    type: "SessionStorageProxy",
                }
            ],
            rows: [
                {
                    name: "table",
                    proxies: [],
                    attributes: {
                        boolean:
                        {
                            name: "boolean",
                            required: true,
                            type: "boolean",
                            value: void(0),
                            mustBeTrue: true,
                        },
                        string:
                        {
                            name: "string",
                            required: true,
                            type: "string",
                            value: void(0),
                            minimumLength: 1,
                            maximumLength: 5,
                            pattern: /value/,
                        },
                        number:
                        {
                            name: "number",
                            required: true,
                            type: "number",
                            value: void(0),
                            minimum: 1,
                            includeMinimum: true,
                            maximum: 5,
                            includeMaximum: true,
                        },
                        datetime:
                        {
                            name: "datetime",
                            required: true,
                            type: "string",
                            value: void(0),
                            minimum: "1/10/1985",
                            minimumObject: new Date("1/10/1985"),
                            maximum: "1/12/1985",
                            maximumObject: new Date("1/12/1985"),
                        },
                        singleChoice:
                        {
                            name: "singleChoice",
                            required: true,
                            type: "number",
                            value: void(0),
                            choices: [1, 2],
                        },
                        multipleChoice:
                        {
                            name: "multipleChoice",
                            required: true,
                            type: "number",
                            value: void(0),
                            choices: [1, 2],
                        }
                    }
                }
            ],
            attributes: [
                {
                    name: "boolean",
                    required: true,
                    type: "boolean",
                    value: void(0),
                    mustBeTrue: true,
                },
                {
                    name: "string",
                    required: true,
                    type: "string",
                    value: void(0),
                    minimumLength: 1,
                    maximumLength: 5,
                    pattern: /value/,
                },
                {
                    name: "number",
                    required: true,
                    type: "number",
                    value: void(0),
                    minimum: 1,
                    includeMinimum: true,
                    maximum: 5,
                    includeMaximum: true,
                },
                {
                    name: "datetime",
                    required: true,
                    type: "string",
                    value: void(0),
                    minimum: "1/10/1985",
                    minimumObject: new Date("1/10/1985"),
                    maximum: "1/12/1985",
                    maximumObject: new Date("1/12/1985"),
                },
                {
                    name: "singleChoice",
                    required: true,
                    type: "number",
                    value: void(0),
                    choices: [1, 2],
                },
                {
                    name: "multipleChoice",
                    required: true,
                    type: "number",
                    value: void(0),
                    choices: [1, 2],
                }
            ],
        });
    });
});

describe("TableConfiguration class tests - invalid Table", function() {

    var tableConfiguration;

    var TableConfiguration = Ompluscript.Model.Configuration.Container.TableConfiguration;
    var Configuration = Ompluscript.Core.Configuration.Configuration;
    var Table = Ompluscript.Model.Container.Table;
    var Attribute = Ompluscript.Model.Attribute.Attribute;
    var Choice = Ompluscript.Model.Attribute.Choice;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var String = Ompluscript.Model.Attribute.String;
    var Number = Ompluscript.Model.Attribute.Number;
    var Datetime = Ompluscript.Model.Attribute.Datetime;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;

    beforeAll(function() {
        tableConfiguration = new TableConfiguration();
    });

    it("invalid - empty", function() {
        var definition = {
            type: "Table",
        };
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid - attributes", function() {
        var definition = {
            type: "Table",
            name: "table",
            attributes: [
                {
                    type: "Boolean",
                    name: "boolean",
                    required: 1,
                    mustBeTrue: 1,
                },
                {
                    type: "String",
                    name: "string",
                    required: "not",
                    minimumLength: false,
                    maximumLength: "not",
                    pattern: "value",
                },
                {
                    type: "Number",
                    name: "number",
                    required: "not",
                    minimum: "not",
                    includeMinimum: 3,
                    maximum: false,
                    includeMaximum: "not",
                },
                {
                    type: "Datetime",
                    name: "datetime",
                    required: "not",
                    minimum: "1/10/1985",
                    maximum: "1/09/1985",
                },
                {
                    type: "SingleChoice",
                    name: "singleChoice",
                    required: 1,
                    choices: {},
                },
                {
                    type: "MultipleChoice",
                    name: "multipleChoice",
                    required: 1,
                    choices: {},
                }
            ],
        };
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([
            "boolean." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "boolean." + Boolean.PARAMETER_MUST_BE_TRUE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "string." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "string." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "string." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "string." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "number." + Number.PARAMETER_INCLUDE_MINIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "number." + Number.PARAMETER_INCLUDE_MAXIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "datetime." + Attribute.PARAMETER_MINIMUM,
            "singleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "singleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
            "multipleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "multipleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });
    it("invalid - proxies", function() {
        var definition = {
            type: "Table",
            name: "table",
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: 1,
                    updateLink: false,
                    deleteLink: {},
                    selectLink: []
                },
            ],
        };
        var table = tableConfiguration.create(definition);
        expect(tableConfiguration.getErrors(definition)).toEqual([
            "AjaxProxy." + AjaxProxy.PARAMETER_SAVE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_UPDATE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_DELETE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_SELECT_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
        ]);
    });

    it("invalid - all", function() {
        var definition = {
            type: "Table",
            name: "table",
            attributes: [
                {
                    type: "Boolean",
                    name: "boolean",
                    required: 1,
                    mustBeTrue: 1,
                },
                {
                    type: "String",
                    name: "string",
                    required: "not",
                    minimumLength: false,
                    maximumLength: "not",
                    pattern: "value",
                },
                {
                    type: "Number",
                    name: "number",
                    required: "not",
                    minimum: "not",
                    includeMinimum: 3,
                    maximum: false,
                    includeMaximum: "not",
                },
                {
                    type: "Datetime",
                    name: "datetime",
                    required: "not",
                    minimum: "1/10/1985",
                    maximum: "1/09/1985",
                },
                {
                    type: "SingleChoice",
                    name: "singleChoice",
                    required: 1,
                    choices: {},
                },
                {
                    type: "MultipleChoice",
                    name: "multipleChoice",
                    required: 1,
                    choices: {},
                }
            ],
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: 1,
                    updateLink: false,
                    deleteLink: {},
                    selectLink: []
                },
            ],
        };
        expect(tableConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(tableConfiguration.getErrors(definition)).toEqual([
            "boolean." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "boolean." + Boolean.PARAMETER_MUST_BE_TRUE + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "string." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "string." + String.PARAMETER_MINIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "string." + String.PARAMETER_MAXIMUM_LENGTH + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "string." + String.PARAMETER_PATTERN + Configuration.MUST_BE_REGEX_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_MINIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "number." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_NUMBER_OR_UNDEFINED,
            "number." + Number.PARAMETER_INCLUDE_MINIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "number." + Number.PARAMETER_INCLUDE_MAXIMUM + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "datetime." + Attribute.PARAMETER_MAXIMUM + Configuration.MUST_BE_GREATER + "datetime." + Attribute.PARAMETER_MINIMUM,
            "singleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "singleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
            "multipleChoice." + Attribute.PARAMETER_REQUIRED + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED,
            "multipleChoice." + Choice.PARAMETER_CHOICES + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_SAVE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_UPDATE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_DELETE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_SELECT_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
        ]);
    });
});