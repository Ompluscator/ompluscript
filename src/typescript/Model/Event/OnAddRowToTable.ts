/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="TableEvent.ts" />
/// <reference path="../Container/Model.ts" />

/**
 * Module that contains model's events
 *
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Model = Ompluscript.Model.Container.Model;

    /**
     * Class that contains info for event when row is added to table
     *
     * @class OnAddRowToTable
     */
    export class OnAddRowToTable extends TableEvent {

        /**
         * @type {number} index Index of newly added row
         */
        protected index: number;

        /**
         * @type {Model} model Newly added model
         */
        protected model: Model;

        /**
         * Class constructor
         *
         * Sets index of newly added model and model itself.
         * Calls superclass' constructor.
         *
         * @param {IBase} sender Object that fired event
         * @param {number} index Index of newly added model
         * @param {Model} model Newly added model
         * @constructs
         */
        constructor(sender: IBase, index: number, model: Model) {
            super(sender, TableEvent.ON_ADD_ROW_TO_TABLE);
            this.index = index;
            this.model = model;
        }

        /**
         * Method that returns newly added model
         *
         * @returns {Model} Newly added model
         */
        public getModel(): Model {
            return this.model;
        }

        /**
         * Method that return index of newly added model
         *
         * @return {number} Index of newly added model
         */
        public getIndex(): number {
            return this.index;
        }

    }

}
