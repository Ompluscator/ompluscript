describe("LocalStorageProxyConfiguration class tests - valid localStorageProxy", function() {

    var localStorageProxyConfiguration;

    var LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;
    var LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;

    beforeAll(function() {
        localStorageProxyConfiguration = new LocalStorageProxyConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "LocalStorageProxy",
        };
        expect(localStorageProxyConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(localStorageProxyConfiguration.getErrors(definition)).toEqual([]);
        expect(localStorageProxyConfiguration.create(definition) instanceof LocalStorageProxy).toBeTruthy();
        expect(localStorageProxyConfiguration.create(definition).getName()).toBe("LocalStorageProxy");
    });
});