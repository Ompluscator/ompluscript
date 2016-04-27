/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Event = Ompluscript.Core.Observer.Event;

    export abstract class TableEvent extends Event {

        public static ON_ADD_ROW_TO_TABLE: string = "onAddRowToTable";

        public static ON_REMOVE_ROW_FROM_TABLE: string = "onRemoveRowFromTable";

        public static ON_CLEAR_TABLE: string = "onClearTable";

        constructor(sender: IBase, type: string) {
            super(sender, type);
        }

    }

}
