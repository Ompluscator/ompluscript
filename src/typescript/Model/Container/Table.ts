/// <reference path="Container.ts" />
/// <reference path="Model.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Proxy/Proxy.ts" />
/// <reference path="../Event/OnAddRowToTable.ts" />
/// <reference path="../Event/OnRemoveRowFromTable.ts" />
/// <reference path="../Event/OnClearTable.ts" />
/// <reference path="../Event/OnUpdateTable.ts" />

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
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Proxy = Ompluscript.Model.Proxy.Proxy;
    import OnUpdateTable = Ompluscript.Model.Event.OnUpdateTable;

    /**
     * Class that contains functionality for Table.
     *
     * @class Model
     */
    export class Table extends Container {

        /**
         * @type {string} TYPE_TABLE Table type.
         */
        public static TYPE_TABLE: string = "Table";

        /**
         * @type {Model[]} rows Contains a list of models
         */
        protected rows: Model[];

        /**
         * @type {Attribute[]} attributes Contains a definition for columns
         */
        protected attributes: Attribute<any>[];

        /**
         * Class constructor.
         *
         * Sets name and attributes' configuration.
         *
         * @param {string} name Name of model
         * @param {Attribute<any>[]} attributes Attributes' configuration
         * @param {Object[]} proxies Definitions for all proxies
         * @constructs
         */
        constructor(name: string, attributes: Attribute<any>[] = undefined, proxies: Proxy[] = undefined) {
            super(name, proxies);
            this.rows = [];
            this.attributes = attributes;
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
            let attributes: Attribute<any>[] = undefined;
            if (this.attributes !== undefined) {
                attributes = [];
                for (let i: number = 0; i < this.attributes.length; i++) {
                    attributes.push(<Attribute<any>>this.attributes[i].clone());
                }
            }
            let model: Model = new Model(this.name, attributes);
            this.rows.push(model);
            this.fireOnAddRowToTableEvent(this.rows.length - 1, model);
            model.setValues(values);
        }

        /**
         * Method that removes all rows
         */
        public clearRows(): void {
            for (let i: number = 0; i < this.rows.length; i++) {
                this.rows[i].dispose();
            }
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
            trace["attributes"] = [];
            for (let i in this.attributes) {
                if (this.attributes.hasOwnProperty(i)) {
                    trace["attributes"][i] = this.attributes[i].getStackTrace();
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
            for (let i: number = 0; i < this.rows.length; i++) {
                this.rows[i].dispose();
            }
            this.clearObservers();
        }

        /**
         * Method that sets values into table.
         *
         * @param {Object} values
         */
        public setValues(values: Object): void {
            this.clearRows();
            if (Array.isArray(values)) {
                let rows: Object[] = <Object[]> values;
                for (let i: number = 0; i < rows.length; i++) {
                    this.addRow(rows[i]);
                }
            } else {
                this.addRow(values);
            }
            this.fireOnUpdateTableEvent();
        }

        /**
         * Method that returns values from table.
         *
         * @returns {Object}
         */
        public getValues(): Object {
            let values: Object[] = [];
            for (let i: number = 0; i < this.rows.length; i++) {
                values.push(this.rows[i].getValues());
            }
            return values;
        }

        /**
         * Method that reset values in container.
         *
         * @returns {Object}
         */
        public resetValues(): void {
            for (let i: number = 0; i < this.rows.length; i++) {
                this.rows[i].resetValues();
            }
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

        /**
         * Method that fires event when row is cleared
         */
        protected fireOnUpdateTableEvent(): void {
            let event: OnUpdateTable = new OnUpdateTable(this);
            this.notifyObservers(event);
        }
    }
}


