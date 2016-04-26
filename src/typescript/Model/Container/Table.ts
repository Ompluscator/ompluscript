/// <reference path="Container.ts" />
/// <reference path="Model.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.Model
 */
module Ompluscript.Model.Container {
    "use strict";

    import Model = Ompluscript.Model.Container.Model;
    import Container = Ompluscript.Model.Container.Container;

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

        public count(): number {
            return this.rows.length;
        }

        public each(callback: Function): void {
            for (let i: number = 0; i < this.rows.length; i++) {
                callback(i, this.rows[i]);
            }
        }

        public hasRowOnIndex(index: number): boolean {
            return this.rows[index] !== undefined;
        }

        public getRowByIndex(index: number): Model {
            return this.rows[index];
        }

        public addRow(values: Object): void {
            for (let i: number = 0; i < this.definition["length"]; i++) {
                this.definition[i]["value"] = values[this.definition[i]["name"]];
            }
            let model: Model = new Model(this.name, this.definition);
            this.rows.push(model);
            for (let i: number = 0; i < this.definition["length"]; i++) {
                if (this.definition[i] !== undefined) {
                    delete this.definition[i]["value"];
                }
            }
        }

        public removeRowByIndex(index: number): void {
            this.rows.splice(index, 1);
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

    }
}


