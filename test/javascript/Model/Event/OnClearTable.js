describe("OnClearTable class tests", function() {

    var event;
    var table;

    var TableEvent = Ompluscript.Model.Event.TableEvent;
    var OnClearTable = Ompluscript.Model.Event.OnClearTable;
    var Table = Ompluscript.Model.Container.Table;

    beforeAll(function() {
        table = new Table("table", []);
        event = new OnClearTable(table);
    });

    it("get configuration", function() {
        expect(event.getSender()).toEqual(table);
        expect(event.getType()).toEqual(TableEvent.ON_CLEAR_TABLE);
    });
});