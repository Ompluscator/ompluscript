describe("NavigationController class tests - initialization", function() {

    var navigationController;
    var navigation;
    var firstPage;
    var defaulPage;
    var secondPage;
    
    var NavigationController = Ompluscript.Controller.Controller.NavigationController;
    var Navigation = Ompluscript.View.Container.Navigation;
    var Page = Ompluscript.View.Container.Page;
    var Viewport = Ompluscript.View.Viewport.Viewport;

    beforeAll(function() {
        firstPage = new Page("/first");
        defaulPage = new Page("/default", true);
        secondPage = new Page("/first/second");
    });

    it("switch page", function() {
        spyOn(Viewport.prototype, "initializeHtmlElement").and.callFake(function(){
            this.htmlElement = document.createElement("div");
        });
        navigationController = new NavigationController([firstPage, defaulPage, secondPage]);
        navigation = new Navigation([firstPage, defaulPage, secondPage]);
        expect(navigationController.getName()).toBe("NavigationController");
        expect(navigationController.getStackTrace().pageControllers.length).toBe(4);
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(3);

        navigationController.showPageFromPath("/");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(1);

        navigationController.showPageFromPath("/first");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(0);

        navigationController.showPageFromPath("/first/second");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(2);

        navigationController.showPageFromPath("/default");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(1);

        navigationController.showPageFromPath("/not");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(3);
    });

    it("pushState", function() {
        spyOn(Viewport.prototype, "initializeHtmlElement").and.callFake(function(){
            this.htmlElement = document.createElement("div");
        });
        navigationController = new NavigationController([firstPage, defaulPage, secondPage]);
        navigation = new Navigation([firstPage, defaulPage, secondPage]);

        window.history.pushState(false, "/");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(1);

        window.history.pushState(false, "/first");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(0);

        window.history.pushState(false, "/first/second");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(2);

        window.history.pushState(false, "/default");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(1);

        window.history.pushState(false, "/not");
        expect(navigationController.getStackTrace().viewport.activePageIndex).toEqual(3);
    });
});