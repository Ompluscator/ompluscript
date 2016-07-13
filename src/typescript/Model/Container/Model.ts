/// <reference path="Container.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Configuration/BooleanConfiguration.ts" />
/// <reference path="../Configuration/DatetimeConfiguration.ts" />
/// <reference path="../Configuration/MultipleChoiceConfiguration.ts" />
/// <reference path="../Configuration/NumberConfiguration.ts" />
/// <reference path="../Configuration/SingleChoiceConfiguration.ts" />
/// <reference path="../Configuration/StringConfiguration.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import BooleanConfiguration = Ompluscript.Model.Configuration.BooleanConfiguration;
    import DatetimeConfiguration = Ompluscript.Model.Configuration.DatetimeConfiguration;
    import MultipleChoiceConfiguration = Ompluscript.Model.Configuration.MultipleChoiceConfiguration;
    import NumberConfiguration = Ompluscript.Model.Configuration.NumberConfiguration;
    import SingleChoiceConfiguration = Ompluscript.Model.Configuration.SingleChoiceConfiguration;
    import StringConfiguration = Ompluscript.Model.Configuration.StringConfiguration;
    import Attribute = Ompluscript.Model.Attribute.Attribute;

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

        protected configurations: Configuration[];

        /**
         * Class constructor.
         *
         * Sets name and creates all attributes from definition.
         *
         * @param {string} name Name of model
         * @param {Object[]} definition Definition for all attributes
         * @constructs
         */
        constructor(name: string, definition: Object[]) {
            super(name, definition);
            this.configurations = [
                Configuration.getInstance(BooleanConfiguration),
                Configuration.getInstance(DatetimeConfiguration),
                Configuration.getInstance(MultipleChoiceConfiguration),
                Configuration.getInstance(NumberConfiguration),
                Configuration.getInstance(SingleChoiceConfiguration),
                Configuration.getInstance(StringConfiguration),
            ];
            this.attributes = {};
            for (let i: number = 0; i < this.definition.length; i++) {
                this.addAttribute(this.definition[i]);
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

        public setValues(values: Object): void {
            for (let key in values) {
                if (this.attributes.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                    this.attributes[key].setValue(values[key]);
                }
            }
        }

        public getValues(): Object {
            let values: Object = {};
            for (let key in this.attributes) {
                if (this.attributes.hasOwnProperty(key)) {
                    values[key] = this.attributes[key];
                }
            }
            return values;
        }

        /**
         * Method that creates attribute from its definition
         *
         * @param {Object} definition
         */
        private addAttribute(definition: Object): void {
            let name: string = definition[Configuration.PARAMETER_NAME];
            for (let i: number = 0; i < this.configurations.length; i++) {
                if (this.configurations[i].isRelatedTo(definition)) {
                    this.attributes[name] = this.configurations[i].create(definition);
                }
            }
        }
    }
}


