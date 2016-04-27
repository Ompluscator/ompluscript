/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="TableEvent.ts" />

module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class OnClearTable extends TableEvent {

        constructor(sender: IBase) {
            super(sender, TableEvent.ON_CLEAR_TABLE);
        }
    }

}
