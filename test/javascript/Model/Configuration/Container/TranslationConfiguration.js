describe("TranslationConfiguration class tests - valid Translation", function() {

    var translationConfiguration;

    var TranslationConfiguration = Ompluscript.Model.Configuration.Container.TranslationConfiguration;
    var Translation = Ompluscript.Model.Container.Translation;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    var LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;
    var SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;

    beforeAll(function() {
        translationConfiguration = new TranslationConfiguration();
    });

    it("valid - empty", function() {
        var definition = {
            type: "Translation",
        };
        expect(translationConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(translationConfiguration.getErrors(definition)).toEqual([]);
        expect(translationConfiguration.create(definition) instanceof Translation).toBeTruthy();
        expect(translationConfiguration.create(definition).getName()).toBe("Translation");
        expect(translationConfiguration.create(definition).getStackTrace()).toEqual({
            name: "Translation",
            proxies: [
                {
                    type: "AjaxProxy",
                    saveLink: void(0),
                    updateLink: void(0),
                    deleteLink: void(0),
                    selectLink: void(0)
                },
            ],
            assets: {},
            attribute: {
                name: "asset",
                required: false,
                type: "string",
                value: void(0),
                minimumLength: void(0),
                maximumLength: void(0),
                pattern: void(0),
            },
        });
    });

    it("valid - proxies", function() {
        var definition = {
            type: "Translation",
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
        var translation = translationConfiguration.create(definition);
        expect(translationConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(translationConfiguration.getErrors(definition)).toEqual([]);
        expect(translation instanceof Translation).toBeTruthy();
        expect(translation.getName()).toBe("Translation");
        expect(translation.hasProxy("AjaxProxy")).toBeTruthy();
        expect(translation.hasProxy("LocalStorageProxy")).toBeTruthy();
        expect(translation.hasProxy("SessionStorageProxy")).toBeTruthy();
        expect(translation.hasProxy("not")).toBeFalsy();
        expect(translation.getProxy("AjaxProxy") instanceof AjaxProxy).toBeTruthy();
        expect(translation.getProxy("LocalStorageProxy") instanceof LocalStorageProxy).toBeTruthy();
        expect(translation.getProxy("SessionStorageProxy") instanceof SessionStorageProxy).toBeTruthy();
        expect(translation.getStackTrace()).toEqual({
            name: "Translation",
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
            assets: {},
            attribute: {
                name: "asset",
                required: false,
                type: "string",
                value: void(0),
                minimumLength: void(0),
                maximumLength: void(0),
                pattern: void(0),
            },
        });
    });

});

describe("TranslationConfiguration class tests - invalid Translation", function() {

    var translationConfiguration;

    var TranslationConfiguration = Ompluscript.Model.Configuration.Container.TranslationConfiguration;
    var Configuration = Ompluscript.Core.Configuration.Configuration;
    var Translation = Ompluscript.Model.Container.Translation;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;

    beforeAll(function() {
        translationConfiguration = new TranslationConfiguration();
    });

    it("invalid - proxies", function() {
        var definition = {
            type: "Translation",
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
        var translation = translationConfiguration.create(definition);
        expect(translationConfiguration.getErrors(definition)).toEqual([
            "AjaxProxy." + AjaxProxy.PARAMETER_SAVE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_UPDATE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_DELETE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_SELECT_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
        ]);
    });
});