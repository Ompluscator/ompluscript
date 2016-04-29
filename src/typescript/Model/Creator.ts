/// <reference path="Attribute/Attribute.ts" />
/// <reference path="Attribute/Number.ts" />
/// <reference path="Attribute/String.ts" />
/// <reference path="Attribute/Choice.ts" />
/// <reference path="Container/Container.ts" />
/// <reference path="Container/Model.ts" />
/// <reference path="Container/Table.ts" />

/**
 * Module that contains model' classes.
 *
 * @module Ompluscript.Model
 */
module Ompluscript.Model {
    "use strict";
    
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import NumberAttribute = Ompluscript.Model.Attribute.Number;
    import StringAttribute = Ompluscript.Model.Attribute.String;
    import Container = Ompluscript.Model.Container.Container;
    import Model = Ompluscript.Model.Container.Model;
    import Table = Ompluscript.Model.Container.Table;
    import Choice = Ompluscript.Model.Attribute.Choice;
    import Boolean = Ompluscript.Model.Attribute.Boolean;

    /**
     * Class that contains functionality for container creator.
     *
     * @class Creator
     */
    export class Creator {

        /**
         * @type {string} HAS_WRONG_VALUE Message for wrong value of definition.
         */
        public static HAS_WRONG_VALUE: string = " has wrong value.";

        /**
         * @type {string} MUST_BE_STRING Message for definition that should be string.
         */
        public static MUST_BE_STRING: string = " must be a string.";

        /**
         * @type {string} MUST_BE_BOOLEAN_OR_UNDEFINED Message for definition that should be boolean or undefined.
         */
        public static MUST_BE_BOOLEAN_OR_UNDEFINED: string = " must be a boolean or undefined.";

        /**
         * @type {string} MUST_BE_NUMBER_OR_UNDEFINED Message for definition that should be number or undefined.
         */
        public static MUST_BE_NUMBER_OR_UNDEFINED: string = " must be a number or undefined.";

        /**
         * @type {string} MUST_BE_REGEX_OR_UNDEFINED Message for definition that should be regex object or undefined.
         */
        public static MUST_BE_REGEX_OR_UNDEFINED: string = " must be a regex object or undefined.";

        /**
         * @type {string} MUST_BE_DATETIME_OR_UNDEFINED Message for definition that should be date format or undefined.
         */
        public static MUST_BE_DATETIME_OR_UNDEFINED: string = " must be in datetime format or undefined.";

        /**
         * @type {string} MUST_BE_ARRAY_OR_UNDEFINED Message for definition that should be array object or undefined.
         */
        public static MUST_BE_ARRAY_OR_UNDEFINED: string = " must be an array object or undefined.";

        /**
         * @type {string} MUST_BE_GREATER Message for definition that should greater than other.
         */
        public static MUST_BE_GREATER: string = " must be greater than ";

        /**
         * @type {Creator} instance Instance for singleton pattern
         */
        private static instance: Creator = new Creator();

        /**
         * @type {Object} definition Contains a map for all definitions
         */
        private definition: Object;

        /**
         * @type {Object[]} errors Contains errors for all definitions
         */
        private errors: Object[];

        /**
         * Method for singleton pattern
         *
         * @return {Creator} Instance for singleton pattern
         */
        public static getInstance(): Creator {
            return Creator.instance;
        }

        /**
         * Class constructor
         *
         * Initializes definition map and errors list
         */
        constructor() {
            this.definition = {};
            this.errors = [];
        }

        /**
         * Method that defines if there are errors in defintions
         *
         * @return {boolean} Defines if there are errors in defintions
         */
        public hasErrors(): boolean {
            return this.errors.length > 0;
        }

        /**
         * Method that returns all errors in definitions
         *
         * @return {Object[]} All errors in definitions
         */
        public getErrors(): Object[] {
            return this.errors;
        }

        /**
         * Method that resets map of definition and error list
         */
        public reset(): void {
            this.definition = [];
            this.errors = [];
        }

        /**
         * Method that defines different types of containers
         *
         * @param {string} name Name of container
         * @param {string} type Type of container
         * @param {Object[]} definition Definition for container
         */
        public define(name: string, type: string, definition: Object[] = []): void {
            let errors: string[] = [];
            for (let i in definition) {
                if (definition.hasOwnProperty(i)) {
                    try {
                        errors.push.apply(errors, this.checkConfiguration(definition[i]));
                    } catch (error) {
                        errors.push(JSON.parse(error.message));
                    }
                }
            }
            if (errors.length) {
                this.errors.push({
                    definition: definition,
                    errors: errors,
                    name: name,
                    type: type,
                });
            } else {
                this.definition[name] = {
                    definition: definition,
                    name: name,
                    type: type,
                };
            }
        }

        /**
         * Method that creates defined containers
         *
         * @param {string} name Name of container
         */
        public create(name: string): Container {
            if (this.definition.hasOwnProperty(name)) {
                if (this.definition[name].hasOwnProperty("type")) {
                    if (this.definition[name]["type"] === Container.CONTAINER_MODEL) {
                        return new Model(name, this.definition[name]["definition"]);
                    } else if (this.definition[name]["type"] === Container.CONTAINER_TABLE) {
                        return new Table(name, this.definition[name]["definition"]);
                    }
                }
            }
            return undefined;
        }

        /**
         * Method that validates basicAttribute configuration.
         *
         * @param {Object} attribute Attribute definition
         */
        private checkConfiguration(attribute: Object): string[] {
            let errors: string[] = [];
            let type: string = attribute[Attribute.PARAMETER_TYPE];
            let name: string = attribute[Attribute.PARAMETER_NAME];
            let required: boolean = attribute[Attribute.PARAMETER_REQUIRED];
            let mustBeTrue: number = attribute[Boolean.PARAMETER_MUST_BE_TRUE];
            let minimum: number = attribute[Attribute.PARAMETER_MINIMUM];
            let includeMinimum: boolean = attribute[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
            let maximum: number = attribute[Attribute.PARAMETER_MAXIMUM];
            let includeMaximum: boolean = attribute[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
            let minimumLength: number = attribute[StringAttribute.PARAMETER_MINIMUM_LENGTH];
            let maximumLength: number = attribute[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
            let pattern: RegExp = attribute[StringAttribute.PARAMETER_PATTERN];
            let minimumDate: string = attribute[Attribute.PARAMETER_MINIMUM];
            let maximumDate: string = attribute[Attribute.PARAMETER_MAXIMUM];
            let choices: number[] = attribute[Choice.PARAMETER_CHOICES];
            switch (type) {
                case Attribute.TYPE_BOOLEAN:
                    errors = this.checkBooleanConfiguration(name, required, mustBeTrue);
                    break;
                case Attribute.TYPE_NUMBER:
                    errors = this.checkNumberConfiguration(name, required, minimum, includeMinimum, maximum, includeMaximum);
                    break;
                case Attribute.TYPE_STRING:
                    errors = this.checkStringConfiguration(name, required, minimumLength, maximumLength, pattern);
                    break;
                case Attribute.TYPE_DATETIME:
                    errors = this.checkDatetimeConfiguration(name, required, minimumDate, maximumDate);
                    break;
                case Attribute.TYPE_SINGLE_CHOICE:
                case Attribute.TYPE_MULTIPLE_CHOICE:
                    errors = this.checkChoiceConfiguration(name, required, choices);
                    break;
                default:
                    errors.push(Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE);
                    break;
            }
            return errors;
        }

        /**
         * Method that validates basicAttribute configuration.
         *
         * @param {string} name Name parameter
         * @param {boolean} required Required parameter
         */
        private checkAttributeConfiguration(name: string, required: boolean): string[] {
            let errors: string[] = [];
            if (typeof name !== "string") {
                errors.push(Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING);
            }
            if (required !== undefined && typeof required !== "boolean") {
                errors.push(Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
            }
            return errors;
        }

        /**
         * Method that validates Number configuration.
         *
         * @param {string} name Name parameter
         * @param {boolean} required Required parameter
         * @param {mustBeTrue} mustBeTrue Must be true parameter
         */
        private checkBooleanConfiguration(name: string, required: boolean, mustBeTrue: number): string[] {
            let errors: string[] = this.checkAttributeConfiguration(name, required);
            if (mustBeTrue !== undefined && typeof mustBeTrue !== "boolean") {
                errors.push(Boolean.PARAMETER_MUST_BE_TRUE + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
            }
            return errors;
        }

        /**
         * Method that validates Number configuration.
         *
         * @param {string} name Name parameter
         * @param {boolean} required Required parameter
         * @param {number} minimum Minimum parameter
         * @param {boolean} includeMinimum Include minimum parameter
         * @param {number} maximum Maximum parameter
         * @param {boolean} includeMaximum Include maximum parameter
         */
        private checkNumberConfiguration(name: string, required: boolean, minimum: number,
                                         includeMinimum: boolean, maximum: number, includeMaximum: boolean): string[] {
            let errors: string[] = this.checkAttributeConfiguration(name, required);
            if (minimum !== undefined && typeof minimum !== "number") {
                errors.push(Attribute.PARAMETER_MINIMUM + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
            }
            if (maximum !== undefined && typeof maximum !== "number") {
                errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
            }
            if (includeMinimum !== undefined && typeof includeMinimum !== "boolean") {
                errors.push(NumberAttribute.PARAMETER_INCLUDE_MINIMUM + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
            }
            if (includeMaximum !== undefined && typeof includeMaximum !== "boolean") {
                errors.push(NumberAttribute.PARAMETER_INCLUDE_MAXIMUM + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
            }
            if (typeof minimum === "number" && typeof maximum === "number") {
                if (includeMinimum === true && includeMaximum === true && minimum > maximum) {
                    errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM);
                } else if ((includeMinimum !== true || includeMaximum !== true) && minimum >= maximum) {
                    errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM);
                }
            }
            return errors;
        }

        /**
         * Method that validates String configuration.
         *
         * @param {string} name Name parameter
         * @param {boolean} required Required parameter
         * @param {number} minimumLength Minimum length parameter
         * @param {number} maximumLength Maximum length parameter
         * @param {RegExp} pattern Pattern parameter
         */
        private checkStringConfiguration(name: string, required: boolean, minimumLength: number,
                                         maximumLength: number, pattern: RegExp): string[] {
            let errors: string[] = this.checkAttributeConfiguration(name, required);
            if (minimumLength !== undefined && typeof minimumLength !== "number") {
                errors.push(StringAttribute.PARAMETER_MINIMUM_LENGTH + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
            }
            if (maximumLength !== undefined && typeof maximumLength !== "number") {
                errors.push(StringAttribute.PARAMETER_MAXIMUM_LENGTH + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
            }
            if (typeof maximumLength === "number" && typeof minimumLength === "number" && minimumLength > maximumLength) {
                errors.push(StringAttribute.PARAMETER_MAXIMUM_LENGTH +
                    Creator.MUST_BE_GREATER + StringAttribute.PARAMETER_MINIMUM_LENGTH);
            }
            if (pattern !== undefined && !(pattern instanceof RegExp)) {
                errors.push(StringAttribute.PARAMETER_PATTERN + Creator.MUST_BE_REGEX_OR_UNDEFINED);
            }
            return errors;
        }

        /**
         * Method that validates Datetime configuration.
         *
         * @param {string} name Name parameter
         * @param {boolean} required Required parameter
         * @param {string} minimum Minimum parameter
         * @param {string} maximum Maximum parameter
         */
        private checkDatetimeConfiguration(name: string, required: boolean, minimum: string, maximum: string): string[] {
            let errors: string[] = this.checkAttributeConfiguration(name, required);
            let minimumObject: Date = undefined;
            let maximumObject: Date = undefined;
            if ((minimum !== undefined && typeof minimum !== "string") || (
                typeof minimum === "string" && isNaN(new Date(minimum).getTime()))) {
                errors.push(Attribute.PARAMETER_MINIMUM + Creator.MUST_BE_DATETIME_OR_UNDEFINED);
            } else {
                minimumObject = new Date(minimum);
            }
            if ((maximum !== undefined && typeof maximum !== "string") || (
                typeof maximum === "string" && isNaN(new Date(maximum).getTime()))) {
                errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_DATETIME_OR_UNDEFINED);
            } else {
                maximumObject = new Date(maximum);
            }
            if (minimumObject !== undefined && maximumObject !== undefined && minimumObject >= maximumObject) {
                errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM);
            }
            return errors;
        }

        /**
         * Method that validates Choice configuration.
         *
         * @param {string} name Name parameter
         * @param {boolean} required Required parameter
         * @param {number} choices Minimum parameter
         */
        private checkChoiceConfiguration(name: string, required: boolean, choices: number[]): string[] {
            let errors: string[] = this.checkAttributeConfiguration(name, required);
            if (choices !== undefined && !Array.isArray(choices)) {
                errors.push(Choice.PARAMETER_CHOICES + Creator.MUST_BE_ARRAY_OR_UNDEFINED);
            }
            return errors;
        }

    }

    /**
     * Method that defines different types of containers
     *
     * @param {string} name Name of container
     * @param {string} type Type of container
     * @param {Object[]} definition Definition for container
     */
    export function define(name: string, type: string, definition: Object[] = []): void {
        Creator.getInstance().define(name, type, definition);
    }

    /**
     * Method that creates defined containers
     *
     * @param {string} name Name of container
     */
    export function create(name: string): Container {
        return Creator.getInstance().create(name);
    }
}


