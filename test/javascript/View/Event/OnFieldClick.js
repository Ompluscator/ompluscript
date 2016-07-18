describe("OnFieldClick class tests", function() {

    var event;
    var pageLink;
    var clickEvent;

    var OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    var PageLink = Ompluscript.View.Field.PageLink;

    beforeAll(function() {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click");
        spyOn(clickEvent, 'preventDefault');

        pageLink = new PageLink("pageLink", "pageLinkAsset", "pageHref");
        event = new OnFieldClick(pageLink, clickEvent);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(pageLink);
        expect(event.getType()).toEqual(OnFieldClick.ON_FIELD_CLICK);

        event.preventDefault();

        expect(clickEvent.preventDefault.calls.argsFor(0)).toEqual([]);
        expect(clickEvent.preventDefault.calls.count()).toBe(1);
    });
});