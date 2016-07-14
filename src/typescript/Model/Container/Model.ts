/// <reference path="Container.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Proxy/Proxy.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Proxy = Ompluscript.Model.Proxy.Proxy;

    /**
     * Class that contains functionality for Model.
     *
     * @class Model
     */
    export class Model extends Container {

        /**
         * @type {string} TYPE_MODEL Model type.
         */
        public static TYPE_MODEL: string = Model["name"];

        /**
         * @type {Object} attributes Contains map for all attributes.
         */
        protected attributes: Object;

        /**
         * Class constructor.
         *
         * Sets name and creates all attributes from definition.
         *
         * @param {string} name Name of model
         * @param {Attribute<any>[]} attributes Definition for all attributes
         * @param {Object[]} proxies Definitions for all proxies
         * @constructs
         */
        constructor(name: string, attributes: Attribute<any>[] = undefined, proxies: Proxy[] = undefined) {
            super(name, proxies);
            this.attributes = {};
            if (Array.isArray(attributes)) {
                for (let i: number = 0; i < attributes.length; i++) {
                    this.attributes[attributes[i].getName()] = attributes[i];
                }
            }
        }

        /**
         * Method that returns if attribute exists
         * 
         * @param {string} name
         * @return {boolean} If attribute exists
         */
        public hasAttribute(name: string): boolean {
            return this.attributes.hasOwnProperty(name);
        }

        /**
         * Method that returns attribute by its name.
         *
         * @param {string} name Name of attribute
         * @returns {Attribute} Attribute by name
         */
        public getAttribute(name: string): Attribute<any> {
            return this.attributes[name];
        }

        /**
         * Method that validates all attributes in model.
         *
         * @returns {boolean} Result of validation
         */
        public validate(): boolean {
            let result: boolean = true;
            for (let i in this.attributes) {
                if (this.attributes.hasOwnProperty(i)) {
                    result = result && this.attributes[i].validate();
                }
            }
            return result;
        }

        /**
         * Method that returns all current variables of object.
         *
         * @returns {Object} contains all variables of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["attributes"] = {};
            for (let i in this.attributes) {
                if (this.attributes.hasOwnProperty(i)) {
                    trace["attributes"][i] = this.attributes[i].getStackTrace();
                }
            }
            return trace;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            for (let i in this.attributes) {
                if (this.attributes.hasOwnProperty(i)) {
                    this.attributes[i].dispose();
                }
            }
        }

        /**
         * Method that sets values into model.
         *
         * @param {Object} values
         */
        public setValues(values: Object): void {
            for (let key in values) {
                if (this.attributes.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                    this.attributes[key].setValue(values[key]);
                }
            }
        }

        /**
         * Method that returns values from model.
         *
         * @returns {Object}
         */
        public getValues(): Object {
            let values: Object = {};
            for (let key in this.attributes) {
                if (this.attributes.hasOwnProperty(key)) {
                    values[key] = this.attributes[key].getValue();
                }
            }
            return values;
        }
    }
}


