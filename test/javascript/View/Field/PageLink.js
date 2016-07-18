describe("PageLink class tests", function() {

    var pageLink;

    var PageLink = Ompluscript.View.Field.PageLink;
    var Creator = Ompluscript.Model.Creator;
    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;

    beforeAll(function() {
        pageLink = new PageLink("pageLink", "pageLinkAsset", "pageHref");
    });

    it("get configuration", function() {
        expect(pageLink.hasClass(PageLink.CLASS_LINK)).toBeTruthy();
        expect(pageLink.getName()).toBe("pageLink");
        expect(pageLink.isTranslated()).toBeTruthy();
        expect(pageLink.getTextContent()).toBe("pageLinkAsset");
        expect(pageLink.render().outerHTML).toBe('<a class="link" href="pageHref">pageLinkAsset</a>');
        expect(pageLink.getStackTrace()).toEqual({
            html: '<a class="link" href="pageHref"></a>',
            name: "pageLink",
            text: "pageLinkAsset",
            page: "pageHref"
        });
    });

    it("text - functional test", function() {
        Creator.getInstance().getTranslation().setValues({
            pageLinkAsset: "value"
        });
        expect(pageLink.getTextContent()).toBe("value");
        expect(pageLink.render().outerHTML).toBe('<a class="link" href="pageHref">value</a>');
        expect(pageLink.getStackTrace()).toEqual({
            html: '<a class="link" href="pageHref"></a>',
            name: "pageLink",
            text: "pageLinkAsset",
            page: "pageHref"
        });
    });

    it("simulate click - unit test", function() {
        spyOn(pageLink, 'notifyObservers');

        var event = document.createEvent("MouseEvent");
        event.initMouseEvent("click");
        pageLink.render().dispatchEvent(event);

        var onFieldClick = new OnFieldClick(pageLink, event);

        expect(pageLink.notifyObservers.calls.argsFor(0)).toEqual([onFieldClick]);
        expect(pageLink.notifyObservers.calls.count()).toBe(1);
    });

    it("simulate click - functional test with spy", function() {
        spyOn(pageLink, 'handleLinking');

        var event = document.createEvent("MouseEvent");
        event.initMouseEvent("click");
        pageLink.render().dispatchEvent(event);

        var onFieldClick = new OnFieldClick(pageLink, event);

        expect(pageLink.handleLinking.calls.argsFor(0)).toEqual([onFieldClick]);
        expect(pageLink.handleLinking.calls.count()).toBe(1);
    });
});