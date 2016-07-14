describe("Model class tests - add string", function() {

    var modelObject;
    var name = "model";
    var paramName = "param";
    var value = "value";
    var minimumLength = 2;
    var maximumLength = 6;
    var pattern = /value/;
    var required = true;
    var undefined;
    var attributes;

    var Model = Ompluscript.Model.Container.Model;
    var String = Ompluscript.Model.Attribute.String;

    beforeAll(function() {
        attributes = [
            new String(paramName, value, required, minimumLength, maximumLength, pattern)
        ];

        modelObject = new Model(name, attributes);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof String).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeFalsy();
        expect(modelObject.getProxy("AjaxProxy")).toBeUndefined();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("LocalStorageProxy")).toBeUndefined();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("SessionStorageProxy")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
            proxies: [],
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "string",
                    value: value,
                    minimumLength: minimumLength,
                    maximumLength: maximumLength,
                    pattern: pattern,
                }
            },
        });
        expect(modelObject.getValues()).toEqual({
            param: value
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.getValues()).toEqual({
            param: undefined
        });
        expect(modelObject.validate()).toBeFalsy();

        modelObject.setValues({
            param: value
        });

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();
    });
});

describe("Model class tests - add number", function() {

    var modelObject;
    var name = "model";
    var paramName = "param";
    var value = 3;
    var minimum = 2;
    var maximum = 4;
    var included = true;
    var required = true;
    var undefined;
    var attributes;

    var Model = Ompluscript.Model.Container.Model;
    var Number = Ompluscript.Model.Attribute.Number;

    beforeAll(function() {
        attributes = [
            new Number(paramName, value, required, minimum, included, maximum, included)
        ];

        modelObject = new Model(name, attributes);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof Number).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeFalsy();
        expect(modelObject.getProxy("AjaxProxy")).toBeUndefined();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("LocalStorageProxy")).toBeUndefined();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("SessionStorageProxy")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
            proxies: [],
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    minimum: minimum,
                    maximum: maximum,
                    includeMinimum: included,
                    includeMaximum: included
                }
            },
        });
        expect(modelObject.getValues()).toEqual({
            param: value
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.getValues()).toEqual({
            param: undefined
        });
        expect(modelObject.validate()).toBeFalsy();

        modelObject.setValues({
            param: value
        });

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();
    });
});

describe("Model class tests - add datetime", function() {

    var modelObject;
    var name = "model";
    var paramName = "param";
    var value = "1/11/1985";
    var minimum = "1/10/1985";
    var maximum = "1/12/1985";
    var required = true;
    var undefined;
    var attributes;

    var Model = Ompluscript.Model.Container.Model;
    var Datetime = Ompluscript.Model.Attribute.Datetime;

    beforeAll(function() {
        attributes = [
            new Datetime(paramName, value, required, minimum, maximum)
        ];

        modelObject = new Model(name, attributes);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof Datetime).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeFalsy();
        expect(modelObject.getProxy("AjaxProxy")).toBeUndefined();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("LocalStorageProxy")).toBeUndefined();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("SessionStorageProxy")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
            proxies: [],
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "string",
                    value: value,
                    minimum: minimum,
                    maximum: maximum,
                    minimumObject: new Date(minimum),
                    maximumObject: new Date(maximum)
                }
            },
        });
        expect(modelObject.getValues()).toEqual({
            param: value
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.getValues()).toEqual({
            param: undefined
        });
        expect(modelObject.validate()).toBeFalsy();

        modelObject.setValues({
            param: value
        });

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();
    });
});

describe("Model class tests - add boolean", function() {

    var modelObject;
    var name = "model";
    var paramName = "param";
    var value = true;
    var required = true;
    var undefined;
    var attributes;
    var mustBeTrue = true;

    var Model = Ompluscript.Model.Container.Model;
    var Boolean = Ompluscript.Model.Attribute.Boolean;
    var type = Boolean.name;

    beforeAll(function() {
        attributes = [
            new Boolean(paramName, value, required, mustBeTrue)
        ];

        modelObject = new Model(name, attributes);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof Boolean).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeFalsy();
        expect(modelObject.getProxy("AjaxProxy")).toBeUndefined();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("LocalStorageProxy")).toBeUndefined();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("SessionStorageProxy")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
            proxies: [],
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "boolean",
                    value: value,
                    mustBeTrue: mustBeTrue,
                }
            },
        });
        expect(modelObject.getValues()).toEqual({
            param: value
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.getValues()).toEqual({
            param: undefined
        });
        expect(modelObject.validate()).toBeFalsy();

        modelObject.setValues({
            param: value
        });

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();
    });
});

describe("Model class tests - add singleChoice", function() {

    var modelObject;
    var name = "model";
    var paramName = "param";
    var value = 3;
    var choices = [2, 3];
    var required = true;
    var undefined;
    var attributes;

    var Model = Ompluscript.Model.Container.Model;
    var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    beforeAll(function() {
        attributes = [
            new SingleChoice(paramName, value, required, choices)
        ];

        modelObject = new Model(name, attributes);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof SingleChoice).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeFalsy();
        expect(modelObject.getProxy("AjaxProxy")).toBeUndefined();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("LocalStorageProxy")).toBeUndefined();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("SessionStorageProxy")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
            proxies: [],
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    choices: choices,
                }
            },
        });
        expect(modelObject.getValues()).toEqual({
            param: value
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.getValues()).toEqual({
            param: undefined
        });
        expect(modelObject.validate()).toBeFalsy();

        modelObject.setValues({
            param: value
        });

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();
    });
});

describe("Model class tests - add multipleChoice", function() {

    var modelObject;
    var name = "model";
    var paramName = "param";
    var value = [3];
    var choices = [2, 3];
    var required = true;
    var undefined;
    var attributes;

    var Model = Ompluscript.Model.Container.Model;
    var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    beforeAll(function() {
        attributes = [
            new MultipleChoice(paramName, value, required, choices)
        ];

        modelObject = new Model(name, attributes);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute(paramName)).toBeTruthy();
        expect(modelObject.getAttribute(paramName) instanceof MultipleChoice).toBeTruthy();
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeFalsy();
        expect(modelObject.getProxy("AjaxProxy")).toBeUndefined();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("LocalStorageProxy")).toBeUndefined();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeFalsy();
        expect(modelObject.getProxy("SessionStorageProxy")).toBeUndefined();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
            proxies: [],
            attributes: {
                param: {
                    name: paramName,
                    required: required,
                    type: "number",
                    value: value,
                    choices: choices,
                }
            },
        });
        expect(modelObject.getValues()).toEqual({
            param: value
        });
    });

    it("validation", function() {
        modelObject.getAttribute(paramName).setValue(value);

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();

        modelObject.getAttribute(paramName).setValue(undefined);

        expect(modelObject.getValues()).toEqual({
            param: undefined
        });
        expect(modelObject.validate()).toBeFalsy();

        modelObject.setValues({
            param: value
        });

        expect(modelObject.getValues()).toEqual({
            param: value
        });
        expect(modelObject.validate()).toBeTruthy();
    });
});

describe("Model class tests - proxies", function() {

    var modelObject;
    var name = "model";
    var value = "value";
    var proxies;

    var Model = Ompluscript.Model.Container.Model;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    var LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;
    var SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;

    beforeAll(function() {
        proxies = [
            new AjaxProxy("save", "update", "delete", "select"),
            new LocalStorageProxy(),
            new SessionStorageProxy(),
        ];

        modelObject = new Model(name, [], proxies);
    });

    it("get configuration", function() {
        expect(modelObject.getName()).toBe(name);
        expect(modelObject.hasAttribute("not")).toBeFalsy();
        expect(modelObject.getAttribute("not")).toBeUndefined();
        expect(modelObject.hasProxy("AjaxProxy")).toBeTruthy();
        expect(modelObject.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(modelObject.hasProxy("LocalStorageProxy")).toBeTruthy();
        expect(modelObject.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeTruthy();
        expect(modelObject.hasProxy("SessionStorageProxy")).toBeTruthy();
        expect(modelObject.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeTruthy();
        expect(modelObject.getStackTrace()).toEqual({
            name: name,
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
                },
            ],
            attributes: {},
        });
        expect(modelObject.getValues()).toEqual({});
    });
});