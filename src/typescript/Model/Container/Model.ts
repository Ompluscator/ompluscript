/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Attribute/Boolean.ts" />
/// <reference path="../Attribute/Datetime.ts" />
/// <reference path="../Attribute/MultipleChoice.ts" />
/// <reference path="../Attribute/Number.ts" />
/// <reference path="../Attribute/SingleChoice.ts" />
/// <reference path="../Attribute/String.ts" />
/// <reference path="Container.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.Model
 */
module Ompluscript.Model.Container {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import BooleanAttribute = Ompluscript.Model.Attribute.Boolean;
    import NumberAttribute = Ompluscript.Model.Attribute.Number;
    import StringAttribute = Ompluscript.Model.Attribute.String;
    import Datetime = Ompluscript.Model.Attribute.Datetime;
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    import MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
    import Choice = Ompluscript.Model.Attribute.Choice;

    /**
     * Class that contains functionality for Model.
     *
     * @class Model
     */
    export class Model extends Container {

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
         * @param {Object[]} definition Definition for all attributes
         * @constructs
         */
        constructor(name: string, definition: Object[]) {
            super(name, definition);
            this.attributes = {};
            for (let i in this.definition) {
                if (this.definition.hasOwnProperty(i)) {
                    this.addAttribute(this.definition[i]);
                }
            }
        }

        /**
         * Method that returns attribute by its name.
         *
         * @param {string} name Name of attribute
         * @returns {Attribute}
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
            let trace: Object = {
                attributes: {},
                name: this.name,
            };
            for (let i in this.attributes) {
                if (this.attributes.hasOwnProperty(i)) {
                    trace["attributes"][i] = this.attributes[i].getStackTrace();
                }
            }
            return trace;
        }

        /**
         * Method that creates attribute from its definition
         *
         * @param {Object} definition
         */
        private addAttribute(definition: Object): void {
            switch (definition[Attribute.PARAMETER_TYPE]) {
                case Attribute.TYPE_BOOLEAN:
                    this.addBoolean(definition);
                    break;
                case Attribute.TYPE_NUMBER:
                    this.addNumber(definition);
                    break;
                case Attribute.TYPE_STRING:
                    this.addString(definition);
                    break;
                case Attribute.TYPE_DATETIME:
                    this.addDatetime(definition);
                    break;
                case Attribute.TYPE_SINGLE_CHOICE:
                    this.addSingleChoice(definition);
                    break;
                case Attribute.TYPE_MULTIPLE_CHOICE:
                    this.addMultipleChoice(definition);
                    break;
                default:
                    break;
            }
        }

        /**
         * Method that adds Boolean attribute to model.
         *
         * @param {Object} definition
         */
        private addBoolean(definition: Object): void {
            let name: string = definition[Attribute.PARAMETER_NAME];
            let value: boolean = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            this.attributes[name] = new BooleanAttribute(name, value, required);
        }

        /**
         * Method that adds Number attribute to model.
         *
         * @param definition
         */
        private addNumber(definition: Object): void {
            let name: string = definition[Attribute.PARAMETER_NAME];
            let value: number = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimum: number = definition[Attribute.PARAMETER_MINIMUM];
            let includeMinimum: boolean = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
            let maximum: number = definition[Attribute.PARAMETER_MAXIMUM];
            let includeMaximum: boolean = definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
            this.attributes[name] = new NumberAttribute(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
        }

        /**
         * Method that adds String attribute to model.
         *
         * @param definition
         */
        private addString(definition: Object): void {
            let name: string = definition[Attribute.PARAMETER_NAME];
            let value: string = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimumLength: number = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
            let maximumLength: number = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
            let pattern: RegExp = definition[StringAttribute.PARAMETER_PATTERN];
            this.attributes[name] = new StringAttribute(name, value, required, minimumLength, maximumLength, pattern);
        }

        /**
         * Method that adds Datetime attribute to model.
         *
         * @param definition
         */
        private addDatetime(definition: Object): void {
            let name: string = definition[Attribute.PARAMETER_NAME];
            let value: string = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimum: string = definition[Attribute.PARAMETER_MINIMUM];
            let maximum: string = definition[Attribute.PARAMETER_MAXIMUM];
            this.attributes[name] = new Datetime(name, value, required, minimum, maximum);
        }

        /**
         * Method that adds SingleChoice attribute to model.
         *
         * @param definition
         */
        private addSingleChoice(definition: Object): void {
            let name: string = definition[Attribute.PARAMETER_NAME];
            let value: number = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let choices: number[] = definition[Choice.PARAMETER_CHOICES];
            this.attributes[name] = new SingleChoice(name, value, required, choices);
        }

        /**
         * Method that adds Multiple attribute to model.
         *
         * @param definition
         */
        private addMultipleChoice(definition: Object): void {
            let name: string = definition[Attribute.PARAMETER_NAME];
            let value: number[] = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let choices: number[] = definition[Choice.PARAMETER_CHOICES];
            this.attributes[name] = new MultipleChoice(name, value, required, choices);
        }

    }
}


