describe("ModelConfiguration class tests - valid Model", function() {

    var modelConfiguration;

    var ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
    var Model = Ompluscript.Model.Container.Model;
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
        modelConfiguration = new ModelConfiguration();
    });

    it("valid - empty", function() {
        var definition = {
            type: "Model",
            name: "model"
        };
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([]);
        expect(modelConfiguration.create(definition) instanceof Model).toBeTruthy();
        expect(modelConfiguration.create(definition).getName()).toBe("model");
        expect(modelConfiguration.create(definition).getStackTrace()).toEqual({
            name: "model",
            proxies: [],
            attributes: {},
        });
    });

    it("valid - attributes", function() {
        var definition = {
            type: "Model",
            name: "model",
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
        var model = modelConfiguration.create(definition);
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([]);
        expect(model instanceof Model).toBeTruthy();
        expect(model.getName()).toBe("model");
        expect(model.hasAttribute("string")).toBeTruthy();
        expect(model.hasAttribute("number")).toBeTruthy();
        expect(model.hasAttribute("boolean")).toBeTruthy();
        expect(model.hasAttribute("datetime")).toBeTruthy();
        expect(model.hasAttribute("singleChoice")).toBeTruthy();
        expect(model.hasAttribute("multipleChoice")).toBeTruthy();
        expect(model.hasAttribute("not")).toBeFalsy();
        expect(model.getAttribute("string") instanceof String).toBeTruthy();
        expect(model.getAttribute("number") instanceof Number).toBeTruthy();
        expect(model.getAttribute("boolean") instanceof Boolean).toBeTruthy();
        expect(model.getAttribute("datetime") instanceof Datetime).toBeTruthy();
        expect(model.getAttribute("singleChoice") instanceof SingleChoice).toBeTruthy();
        expect(model.getAttribute("multipleChoice") instanceof MultipleChoice).toBeTruthy();
        expect(model.getProxy("AjaxProxy") instanceof AjaxProxy).toBeFalsy();
        expect(model.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeFalsy();
        expect(model.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeFalsy();
        expect(model.getStackTrace()).toEqual({
            name: "model",
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
            },
        });
    });
    it("valid - proxies", function() {
        var definition = {
            type: "Model",
            name: "model",
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
        var model = modelConfiguration.create(definition);
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([]);
        expect(model instanceof Model).toBeTruthy();
        expect(model.getName()).toBe("model");
        expect(model.hasProxy("AjaxProxy")).toBeTruthy();
        expect(model.hasProxy("LocalStorageProxy")).toBeTruthy();
        expect(model.hasProxy("SessionStorageProxy")).toBeTruthy();
        expect(model.hasProxy("not")).toBeFalsy();
        expect(model.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(model.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeTruthy();
        expect(model.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeTruthy();
        expect(model.getStackTrace()).toEqual({
            name: "model",
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
            attributes: {},
        });
    });

    it("valid - all", function() {
        var definition = {
            type: "Model",
            name: "model",
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
        var model = modelConfiguration.create(definition);
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([]);
        expect(model instanceof Model).toBeTruthy();
        expect(model.getName()).toBe("model");
        expect(model.hasAttribute("string")).toBeTruthy();
        expect(model.hasAttribute("number")).toBeTruthy();
        expect(model.hasAttribute("boolean")).toBeTruthy();
        expect(model.hasAttribute("datetime")).toBeTruthy();
        expect(model.hasAttribute("singleChoice")).toBeTruthy();
        expect(model.hasAttribute("multipleChoice")).toBeTruthy();
        expect(model.hasProxy("AjaxProxy")).toBeTruthy();
        expect(model.hasProxy("LocalStorageProxy")).toBeTruthy();
        expect(model.hasProxy("SessionStorageProxy")).toBeTruthy();
        expect(model.getAttribute("string") instanceof String).toBeTruthy();
        expect(model.getAttribute("number") instanceof Number).toBeTruthy();
        expect(model.getAttribute("boolean") instanceof Boolean).toBeTruthy();
        expect(model.getAttribute("datetime") instanceof Datetime).toBeTruthy();
        expect(model.getAttribute("singleChoice") instanceof SingleChoice).toBeTruthy();
        expect(model.getAttribute("multipleChoice") instanceof MultipleChoice).toBeTruthy();
        expect(model.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(model.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeTruthy();
        expect(model.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeTruthy();
        expect(model.getStackTrace()).toEqual({
            name: "model",
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
            },
        });
    });
});

describe("ModelConfiguration class tests - invalid Model", function() {

    var modelConfiguration;

    var ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
    var Configuration = Ompluscript.Core.Configuration.Configuration;
    var Model = Ompluscript.Model.Container.Model;
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
        modelConfiguration = new ModelConfiguration();
    });

    it("invalid - empty", function() {
        var definition = {
            type: "Model",
        };
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([
            Configuration.PARAMETER_NAME + Configuration.MUST_BE_STRING
        ]);
    });

    it("invalid - attributes", function() {
        var definition = {
            type: "Model",
            name: "model",
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
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([
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
            type: "Model",
            name: "model",
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
        var model = modelConfiguration.create(definition);
        expect(modelConfiguration.getErrors(definition)).toEqual([
            "AjaxProxy." + AjaxProxy.PARAMETER_SAVE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_UPDATE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_DELETE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_SELECT_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
        ]);
    });

    it("invalid - all", function() {
        var definition = {
            type: "Model",
            name: "model",
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
        expect(modelConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(modelConfiguration.getErrors(definition)).toEqual([
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