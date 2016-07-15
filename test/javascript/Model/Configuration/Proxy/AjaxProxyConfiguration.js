describe("AjaxProxyConfiguration class tests - valid ajaxProxy", function() {

    var ajaxProxyConfiguration;

    var AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;

    beforeAll(function() {
        ajaxProxyConfiguration = new AjaxProxyConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "AjaxProxy",
        };
        expect(ajaxProxyConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(ajaxProxyConfiguration.getErrors(definition)).toEqual([]);
        expect(ajaxProxyConfiguration.create(definition) instanceof AjaxProxy).toBeTruthy();
        expect(ajaxProxyConfiguration.create(definition).getName()).toBe("AjaxProxy");
        expect(ajaxProxyConfiguration.create(definition).getSaveLink()).toBeUndefined();
        expect(ajaxProxyConfiguration.create(definition).getUpdateLink()).toBeUndefined();
        expect(ajaxProxyConfiguration.create(definition).getDeleteLink()).toBeUndefined();
        expect(ajaxProxyConfiguration.create(definition).getSelectLink()).toBeUndefined();
    });

    it("valid - second", function() {
        var definition = {
            type: "AjaxProxy",
            saveLink: "save",
            updateLink: "update",
            deleteLink: "delete",
            selectLink: "select"
        };
        expect(ajaxProxyConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(ajaxProxyConfiguration.getErrors(definition)).toEqual([]);
        expect(ajaxProxyConfiguration.create(definition) instanceof AjaxProxy).toBeTruthy();
        expect(ajaxProxyConfiguration.create(definition).getName()).toBe("AjaxProxy");
        expect(ajaxProxyConfiguration.create(definition).getSaveLink()).toBe("save");
        expect(ajaxProxyConfiguration.create(definition).getUpdateLink()).toBe("update");
        expect(ajaxProxyConfiguration.create(definition).getDeleteLink()).toBe("delete");
        expect(ajaxProxyConfiguration.create(definition).getSelectLink()).toBe("select");
    });
});

describe("AjaxProxyConfiguration class tests - invalid ajaxProxy", function() {

    var ajaxProxyConfiguration;
    var undefined;

    var AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
    var AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        ajaxProxyConfiguration = new AjaxProxyConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "AjaxProxy",
            saveLink: 1,
            updateLink: false,
            deleteLink: {},
            selectLink: []
        };
        expect(ajaxProxyConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(ajaxProxyConfiguration.getErrors(definition)).toEqual([
            "AjaxProxy." + AjaxProxy.PARAMETER_SAVE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_UPDATE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_DELETE_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
            "AjaxProxy." + AjaxProxy.PARAMETER_SELECT_LINK + Configuration.MUST_BE_STRING_OR_UNDEFINED,
        ]);
    });
});