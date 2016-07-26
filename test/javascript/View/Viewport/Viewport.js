describe("Viewport class tests", function() {

    var firstPage;
    var secondPage;
    var thirdPage;
    var viewport;
    var navigation;

    var Viewport = Ompluscript.View.Viewport.Viewport;
    var Page = Ompluscript.View.Container.Page;
    var Navigation = Ompluscript.View.Container.Navigation;

    beforeAll(function() {
        firstPage = new Page("first");
        secondPage = new Page("second");
        thirdPage = new Page("third");
        navigation = new Navigation();
    });

    it("get configuration", function() {
        viewport = new Viewport(navigation, [firstPage, secondPage, thirdPage]);
        expect(viewport.hasClass(Viewport.CLASS_VIEWPORT)).toBeTruthy();
        expect(viewport.getPageByIndex(1)).toBe(secondPage);
        expect(viewport.findPageIndexByName("third")).toBe(2);
        expect(viewport.getPageByIndex(0).isActive()).toBeTruthy();
        expect(viewport.getStackTrace()).toEqual({
            html: '<body class="viewport"></body>',
            name: "Viewport",
            activePageIndex: 0,
            navigation: navigation.getStackTrace(),
            pages: [
                firstPage.getStackTrace(),
                secondPage.getStackTrace(),
                thirdPage.getStackTrace(),
            ]
        });
    });

    it("switch page", function() {
        spyOn(Viewport.prototype, "initializeHtmlElement").and.callFake(function(){
            this.htmlElement = document.createElement("div");
        });
        viewport = new Viewport(navigation, [firstPage, secondPage, thirdPage]);
        expect(viewport.getPageByIndex(1)).toBe(secondPage);
        expect(viewport.findPageIndexByName("third")).toBe(2);
        expect(viewport.getPageByIndex(0).isActive()).toBeTruthy();

        viewport.setActivePageIndex(1);
        
        expect(viewport.getPageByIndex(0).isActive()).toBeFalsy();
        expect(viewport.getPageByIndex(1).isActive()).toBeTruthy();
        expect(viewport.getStackTrace()).toEqual({
            html: '<div></div>',
            name: "Viewport",
            activePageIndex: 1,
            navigation: navigation.getStackTrace(),
            pages: [
                firstPage.getStackTrace(),
                secondPage.getStackTrace(),
                thirdPage.getStackTrace(),
            ]
        });
    });
});