/// <reference path="Container.ts" />
/// <reference path="Model.ts" />
/// <reference path="../Event/OnAddRowToTable.ts" />
/// <reference path="../Event/OnRemoveRowFromTable.ts" />
/// <reference path="../Event/OnClearTable.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Model = Ompluscript.Model.Container.Model;
    import Container = Ompluscript.Model.Container.Container;
    import OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
    import OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
    import OnClearTable = Ompluscript.Model.Event.OnClearTable;

    /**
     * Class that contains functionality for Table.
     *
     * @class Model
     */
    export class Table extends Container {

        /**
         * @type {Model[]} rows Contains a list of models
         */
        protected rows: Model[];

        /**
         * Class constructor.
         *
         * Sets name and attributes' configuration.
         *
         * @param {string} name Name of model
         * @param {Object[]} definition Attributes' configuration
         * @constructs
         */
        constructor(name: string, definition: Object[]) {
            super(name, definition);
            this.rows = [];
        }

        /**
         * Method that returns number of rows in table
         *
         * @return {number} Number of rows in table
         */
        public count(): number {
            return this.rows.length;
        }

        /**
         * Method that iterates through rows and fires callback for each
         *
         * @param {Function} callback Method that should be called for each row
         */
        public each(callback: Function): void {
            for (let i: number = 0; i < this.rows.length; i++) {
                callback(i, this.rows[i]);
            }
        }

        /**
         * Method that returns if there is a row on desired indef
         *
         * @param {number} index Index of row
         * @return {boolean} If there is a row on desired indef
         */
        public hasRowOnIndex(index: number): boolean {
            return this.rows[index] !== undefined;
        }

        /**
         * Method that returns model on desired row
         *
         * @param {number} index Index of row
         * @return {Model} Model on desired row
         */
        public getRowByIndex(index: number): Model {
            return this.rows[index];
        }

        /**
         * Mehtod that add new row with desired rows
         *
         * @param {Object} values Container for values
         */
        public addRow(values: Object): void {
            let model: Model = new Model(this.name, this.definition);
            this.rows.push(model);
            this.fireOnAddRowToTableEvent(this.rows.length - 1, model);
            model.setValue(values);
        }

        /**
         * Method that removes all rows
         */
        public clearRows(): void {
            this.dispose();
            this.rows = [];
            this.fireOnClearTableEvent();
        }

        /**
         * Method that removes model on desired row
         *
         * @param {number} index Index of row
         */
        public removeRowByIndex(index: number): void {
            this.rows.splice(index, 1);
            this.fireOnRemoveRowFromTableEvent(index);
        }

        /**
         * Method that returns all current variables of object.
         *
         * @returns {Object} contains all variables of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["rows"] = [];
            for (let i in this.rows) {
                if (this.rows[i] !== undefined) {
                    trace["rows"].push(this.rows[i].getStackTrace());
                }
            }
            return trace;
        }

        /**
         * Method that validates all models in table.
         *
         * @returns {boolean} Result of validation
         */
        public validate(): boolean {
            let result: boolean = true;
            for (let i in this.rows) {
                if (this.rows.hasOwnProperty(i)) {
                    result = result && this.rows[i].validate();
                }
            }
            return result;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            for (let i in this.rows) {
                if (this.rows[i] !== undefined) {
                    this.rows[i].dispose();
                }
            }
            this.clearObservers();
        }

        /**
         * Method that fires event when new row is added
         *
         * @param {number} index Index of new row
         * @param {Model} model Newly added model
         */
        protected fireOnAddRowToTableEvent(index: number, model: Model): void {
            let event: OnAddRowToTable = new OnAddRowToTable(this, index, model);
            this.notifyObservers(event);
        }

        /**
         * Method that fires event when row is removed
         *
         * @param {number} index Index of new row
         */
        protected fireOnRemoveRowFromTableEvent(index: number): void {
            let event: OnRemoveRowFromTable = new OnRemoveRowFromTable(this, index);
            this.notifyObservers(event);
        }

        /**
         * Method that fires event when row is cleared
         */
        protected fireOnClearTableEvent(): void {
            let event: OnClearTable = new OnClearTable(this);
            this.notifyObservers(event);
        }

    }
}


