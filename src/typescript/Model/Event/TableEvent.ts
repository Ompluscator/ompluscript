/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />

/**
 * Module that contains model's events
 *
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import OEvent = Ompluscript.Core.Observer.OEvent;

    /**
     * Class that defines basic table event
     *
     * @class TableEvent
     */
    export abstract class TableEvent extends OEvent {

        /**
         * @type {string} ON_ADD_ROW_TO_TABLE Defines event when row is added to table
         */
        public static ON_ADD_ROW_TO_TABLE: string = "onAddRowToTable";

        /**
         * @type {string} ON_REMOVE_ROW_FROM_TABLE Defines event when row is removed from table
         */
        public static ON_REMOVE_ROW_FROM_TABLE: string = "onRemoveRowFromTable";

        /**
         * @type {string} ON_CLEAR_TABLE Defines event when table is cleared
         */
        public static ON_CLEAR_TABLE: string = "onClearTable";

        /**
         * @type {string} ON_UPDATE_TABLE Defines event when table is updated
         */
        public static ON_UPDATE_TABLE: string = "onUpdateTable";

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {string} type Type of event
         * @constructs
         */
        constructor(sender: IBase, type: string) {
            super(sender, type);
        }

    }

}
