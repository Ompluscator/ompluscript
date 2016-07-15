describe("SessionStorageProxyConfiguration class tests - valid sessionStorageProxy", function() {

    var sessionStorageProxyConfiguration;

    var SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
    var SessionStorageProxy = Ompluscript.Model.Proxy.SessionStorageProxy;

    beforeAll(function() {
        sessionStorageProxyConfiguration = new SessionStorageProxyConfiguration();
    });

    it("valid - first", function() {
        var definition = {
            type: "SessionStorageProxy",
        };
        expect(sessionStorageProxyConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(sessionStorageProxyConfiguration.getErrors(definition)).toEqual([]);
        expect(sessionStorageProxyConfiguration.create(definition) instanceof SessionStorageProxy).toBeTruthy();
        expect(sessionStorageProxyConfiguration.create(definition).getName()).toBe("SessionStorageProxy");
    });
});