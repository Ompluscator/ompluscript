describe("OnUpdateTable class tests", function() {

    var event;
    var table;

    var TableEvent = Ompluscript.Model.Event.TableEvent;
    var OnUpdateTable = Ompluscript.Model.Event.OnUpdateTable;
    var Table = Ompluscript.Model.Container.Table;

    beforeAll(function() {
        table = new Table("table", []);
        event = new OnUpdateTable(table);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(table);
        expect(event.getType()).toEqual(TableEvent.ON_UPDATE_TABLE);
    });
});