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
     * Class that contains info for event when row is removed from table
     *
     * @class OnRemoveRowFromTable
     */
    export class OnRemoveRowFromTable extends TableEvent {

        /**
         * @type {number} index Index of removed row
         */
        protected index: number;

        /**
         * Class constructor
         *
         * Sets index of removed model.
         * Calls superclass' constructor.
         *
         * @param {IBase} sender Object that fired event
         * @param {number} index Index of removed model
         * @constructs
         */
        constructor(sender: IBase, index: number) {
            super(sender, TableEvent.ON_REMOVE_ROW_FROM_TABLE);
            this.index = index;
        }

        /**
         * Method that return index of removed model
         *
         * @return {number} Index of removed model
         */
        public getIndex(): number {
            return this.index;
        }

    }

}
