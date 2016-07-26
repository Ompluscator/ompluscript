describe("OnFieldMouseLeave class tests", function() {

    var event;
    var pageLink;
    var clickEvent;

    var OnFieldMouseLeave = Ompluscript.View.Event.OnFieldMouseLeave;
    var PageLink = Ompluscript.View.Field.PageLink;

    beforeAll(function() {
        clickEvent = document.createEvent("MouseEvent");
        clickEvent.initMouseEvent("click");
        spyOn(clickEvent, 'preventDefault');

        pageLink = new PageLink("pageLink", "pageLinkAsset", "pageHref");
        event = new OnFieldMouseLeave(pageLink, clickEvent);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(pageLink);
        expect(event.getType()).toEqual(OnFieldMouseLeave.ON_FIELD_MOUSE_LEAVE);

        event.preventDefault();

        expect(clickEvent.preventDefault.calls.argsFor(0)).toEqual([]);
        expect(clickEvent.preventDefault.calls.count()).toBe(1);
    });
});