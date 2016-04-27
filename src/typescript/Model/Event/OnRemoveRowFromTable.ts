/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="TableEvent.ts" />

module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class OnRemoveRowFromTable extends TableEvent {

        protected index: number;

        constructor(sender: IBase, index: number) {
            super(sender, TableEvent.ON_REMOVE_ROW_FROM_TABLE);
            this.index = index;
        }

        public getIndex(): number {
            return this.index;
        }

    }

}
