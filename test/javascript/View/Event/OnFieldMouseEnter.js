describe("OnFieldMouseEnter class tests", function() {

    var event;
    var pageLink;
    var clickEvent;

    var OnFieldMouseEnter = Ompluscript.View.Event.OnFieldMouseEnter;
    var PageLink = Ompluscript.View.Field.PageLink;

    beforeAll(function() {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click");
        spyOn(clickEvent, 'preventDefault');

        pageLink = new PageLink("pageLink", "pageLinkAsset", "pageHref");
        event = new OnFieldMouseEnter(pageLink, clickEvent);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(pageLink);
        expect(event.getType()).toEqual(OnFieldMouseEnter.ON_FIELD_MOUSE_ENTER);

        event.preventDefault();

        expect(clickEvent.preventDefault.calls.argsFor(0)).toEqual([]);
        expect(clickEvent.preventDefault.calls.count()).toBe(1);
    });
});