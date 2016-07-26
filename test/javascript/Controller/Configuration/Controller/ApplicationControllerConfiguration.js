describe("ApplicationController class tests - initialization", function() {

    var applicationControllerConfiguration;

    var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    var ApplicationControllerConfiguration = Ompluscript.Controller.Configuration.Controller.ApplicationControllerConfiguration;

    applicationControllerConfiguration = new ApplicationControllerConfiguration();

    it("get configuration", function() {
        var definition = {
            type: "ApplicationController",
            components: ["first", "second"]
        };

        expect(applicationControllerConfiguration.isRelatedTo(definition)).toBeTruthy();

        var applicationController = applicationControllerConfiguration.create(definition);

        expect(applicationController instanceof ApplicationController).toBeTruthy();
        expect(applicationController.getName()).toBe("ApplicationController");
    });
});

describe("ApplicationControllerConfiguration class tests - invalid ApplicationControllerConfiguration", function() {

    var applicationControllerConfiguration;

    var ApplicationControllerConfiguration = Ompluscript.Controller.Configuration.Controller.ApplicationControllerConfiguration;
    var ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    var Configuration = Ompluscript.Core.Configuration.Configuration;

    beforeAll(function() {
        applicationControllerConfiguration = new ApplicationControllerConfiguration();
    });

    it("invalid configuration", function() {
        var definition = {
            type: "ApplicationController",
            components: 1,
        };
        expect(applicationControllerConfiguration.isRelatedTo(definition)).toBeTruthy();
        expect(applicationControllerConfiguration.getErrors(definition)).toEqual([
            "ApplicationController." + ApplicationController.PARAMETER_COMPONENTS + Configuration.MUST_BE_ARRAY_OR_UNDEFINED,
        ]);
    });
});