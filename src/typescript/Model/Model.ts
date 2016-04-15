/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="../Core/Utils/General.ts" />
/// <reference path="Attribute/Unit.ts" />
/// <reference path="Attribute/Boolean.ts" />
/// <reference path="Attribute/Datetime.ts" />
/// <reference path="Attribute/MultipleChoice.ts" />
/// <reference path="Attribute/Number.ts" />
/// <reference path="Attribute/SingleChoice.ts" />
/// <reference path="Attribute/String.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.Model
 */
module Ompluscript.Model {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import General = Ompluscript.Core.Utils.General;
    import Unit = Ompluscript.Model.Attribute.Unit;
    import BooleanUnit = Ompluscript.Model.Attribute.Boolean;
    import NumberUnit = Ompluscript.Model.Attribute.Number;
    import StringUnit = Ompluscript.Model.Attribute.String;
    import Datetime = Ompluscript.Model.Attribute.Datetime;
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    import MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    /**
     * Class that contains functionality for Model.
     *
     * @class Model
     */
    export class Model implements IBase {

        /**
         * @type {string} name Defines name of model.
         */
        protected name: string;

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
         * @param {Object[]} attributes Definition for all attributes
         * @constructs
         */
        constructor(name: string, attributes: Object[]) {
            let errors: Object[] = [];
            
            this.name = name;
            this.attributes = {};
            for (let i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    try {
                        this.addAttribute(attributes[i]);
                    } catch (error) {
                        errors.push(JSON.parse(error.message));
                    }
                }
            }
            if (errors.length > 0) {
                General.throwConfigurationException(Model, errors);
            }
        }

        /**
         * Method that returns attribute by its name.
         *
         * @param {string} name Name of attribute
         * @returns {Unit}
         */
        public getAttribute(name: string): Unit<any> {
            return this.attributes[name];
        }

        /**
         * Method that returns name of model.
         *
         * @returns {string}
         */
        public getName(): string {
            return this.name;
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
         * @param {Object} attribute
         * @throws {SyntaxError} When attributes' definitions are wrong
         */
        private addAttribute(attribute: Object): void {
            switch (attribute[Unit.PARAMETER_TYPE]) {
                case Unit.TYPE_BOOLEAN:
                    this.addBoolean(attribute);
                    break;
                case Unit.TYPE_NUMBER:
                    this.addNumber(attribute);
                    break;
                case Unit.TYPE_STRING:
                    this.addString(attribute);
                    break;
                case Unit.TYPE_DATETIME:
                    this.addDatetime(attribute);
                    break;
                case Unit.TYPE_SINGLE_CHOICE:
                    this.addSingleChoice(attribute);
                    break;
                case Unit.TYPE_MULTIPLE_CHOICE:
                    this.addMultipleChoice(attribute);
                    break;
                default:
                    General.throwConfigurationException(Model, {
                        type: attribute[Unit.PARAMETER_TYPE],
                    });
                    break;
            }
        }

        /**
         * Method that adds Boolean attribute to model.
         *
         * @param attribute
         */
        private addBoolean(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: boolean = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            this.attributes[name] = new BooleanUnit(name, value, required);
        }

        /**
         * Method that adds Number attribute to model.
         *
         * @param attribute
         */
        private addNumber(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: number = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let minimum: number = attribute[Unit.PARAMETER_MINIMUM];
            let includeMinimum: boolean = attribute[NumberUnit.PARAMETER_INCLUDE_MINIMUM];
            let maximum: number = attribute[Unit.PARAMETER_MAXIMUM];
            let includeMaximum: boolean = attribute[NumberUnit.PARAMETER_INCLUDE_MAXIMUM];
            this.attributes[name] = new NumberUnit(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
        }

        /**
         * Method that adds String attribute to model.
         *
         * @param attribute
         */
        private addString(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: string = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let minimumLength: number = attribute[StringUnit.PARAMETER_MINIMUM_LENGTH];
            let maximumLength: number = attribute[StringUnit.PARAMETER_MAXIMUM_LENGTH];
            let pattern: RegExp = attribute[StringUnit.PARAMETER_PATTERN];
            this.attributes[name] = new StringUnit(name, value, required, minimumLength, maximumLength, pattern);
        }

        /**
         * Method that adds Datetime attribute to model.
         *
         * @param attribute
         */
        private addDatetime(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: string = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let minimum: string = attribute[Unit.PARAMETER_MINIMUM];
            let maximum: string = attribute[Unit.PARAMETER_MAXIMUM];
            this.attributes[name] = new Datetime(name, value, required, minimum, maximum);
        }

        /**
         * Method that adds SingleChoice attribute to model.
         *
         * @param attribute
         */
        private addSingleChoice(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: number = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let values: number[] = attribute[Unit.PARAMETER_VALUES];
            this.attributes[name] = new SingleChoice(name, value, required, values);
        }

        /**
         * Method that adds Multiple attribute to model.
         *
         * @param attribute
         */
        private addMultipleChoice(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: number[] = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let values: number[] = attribute[Unit.PARAMETER_VALUES];
            this.attributes[name] = new MultipleChoice(name, value, required, values);
        }

    }
}


