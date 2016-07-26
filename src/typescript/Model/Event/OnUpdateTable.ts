/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="TableEvent.ts" />

/**
 * Module that contains model's events
 *
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains info for event when table is updated
     *
     * @class OnUpdateTable
     */
    export class OnUpdateTable extends TableEvent {

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @constructs
         */
        constructor(sender: IBase) {
            super(sender, TableEvent.ON_UPDATE_TABLE);
        }
    }

}
