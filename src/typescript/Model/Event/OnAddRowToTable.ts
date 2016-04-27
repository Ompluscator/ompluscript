/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="TableEvent.ts" />
/// <reference path="../Container/Model.ts" />

module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Model = Ompluscript.Model.Container.Model;

    export class OnAddRowToTable extends TableEvent {

        protected index: number;

        protected model: Model;

        constructor(sender: IBase, index: number, model: Model) {
            super(sender, TableEvent.ON_ADD_ROW_TO_TABLE);
            this.index = index;
            this.model = model;
        }

        public getModel(): Model {
            return this.model;
        }

        public getIndex(): number {
            return this.index;
        }

    }

}
