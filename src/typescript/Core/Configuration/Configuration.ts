/// <reference path="../../Core/Interfaces/IBase.ts" />

/**
 * Module that contains base configuration classes.
 *
 * @module Ompluscript.Core.Configuration
 */
module Ompluscript.Core.Configuration {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Abstract lass that contains base functionality for configuration.
     *
     * @class Configuration
     */
    export abstract class Configuration {

        /**
         * @type {string} IS_WRONG_CONFIGURATION Message for wrong value of definition.
         */
        public static IS_WRONG_CONFIGURATION: string = "Is wrong configuration.";

        /**
         * @type {string} HAS_WRONG_VALUE Message for wrong value of definition.
         */
        public static HAS_WRONG_VALUE: string = " has wrong value.";

        /**
         * @type {string} MUST_BE_STRING Message for definition that should be string.
         */
        public static MUST_BE_STRING: string = " must be a string.";

        /**
         * @type {string} MUST_BE_STRING_OR_UNDEFINED Message for definition that should be string or undefined.
         */
        public static MUST_BE_STRING_OR_UNDEFINED: string = " must be a string or undefined.";

        /**
         * @type {string} MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED Message for definition that should be string or object or undefined.
         */
        public static MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED: string = " must be a string or object or undefined.";

        /**
         * @type {string} MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_UNDEFINED Message for definition that should be string or object or undefined.
         */
        public static MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED: string = " must be a string or object or boolean or undefined.";

        /**
         * @type {string} MUST_BE_BOOLEAN_OR_UNDEFINED Message for definition that should be boolean or undefined.
         */
        public static MUST_BE_BOOLEAN_OR_UNDEFINED: string = " must be a boolean or undefined.";

        /**
         * @type {string} MUST_BE_NUMBER Message for definition that should be number.
         */
        public static MUST_BE_NUMBER: string = " must be a number.";

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
         * @type {string} MUST_BE_OBJECT Message for definition that must be object.
         */
        public static MUST_BE_OBJECT: string = " must be an object.";

        /**
         * @type {string} MUST_BE_OBJECT_OR_UNDEFINED Message for definition that should be object or undefined.
         */
        public static MUST_BE_OBJECT_OR_UNDEFINED: string = " must be an object or undefined.";

        /**
         * @type {string} MUST_BE_FUNCTION_OR_UNDEFINED Message for definition that should be function or undefined.
         */
        public static MUST_BE_FUNCTION_OR_UNDEFINED: string = " must be a function or undefined.";

        /**
         * @type {string} MUST_BE_GREATER Message for definition that should greater than other.
         */
        public static MUST_BE_GREATER: string = " must be greater than ";

        /**
         * @type {string} MUST_BE_DEFINED Message for model definition that should defined.
         */
        public static MUST_BE_DEFINED: string = " must be defined.";

        /**
         * @type {string} IS_MISSING Message for definition that is missing.
         */
        public static IS_MISSING: string = " are missing.";

        /**
         * @type {string} PARAMETER_TYPE Type parameter name.
         */
        public static PARAMETER_TYPE: string = "type";

        /**
         * @type {string} PARAMETER_NAME Name parameter name.
         */
        public static PARAMETER_NAME: string = "name";

        /**
         * Method that returns configuration instance by its class
         *
         * @param {Function} configuration Class of configuration
         * @returns {Configuration} Configuration instances
         */
        public static getInstance(configuration: { new () }): Configuration {
            return new configuration;
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public abstract isRelatedTo(definition: Object): boolean;

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public abstract getErrors(definition: Object): string[];

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public abstract create(definition: Object): IBase;

        /**
         * Method that filters list of errors and removes undefined elements
         *
         * @param {string[]} errors List of errors
         * @returns {string[]} Filtered list of errors
         */
        protected filterErrors(errors: string[]): string[] {
            let filter: string[] = [];
            for (let i: number = 0; i < errors.length; i++) {
                if (errors[i] !== undefined) {
                    filter.push(errors[i]);
                }
            }
            if (filter.length > 0) {
                return filter;
            }
            return [];
        }

        /**
         * Method that checks if definition's parameter contains right value.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @param {any[]} values
         * @returns {string}
         */
        protected mustBeValue(definition: Object, key: string, values: any[]): string {
            if (values.indexOf(definition[key]) === -1) {
                return this.getName(definition, key) + Configuration.HAS_WRONG_VALUE;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is string type.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected mustBeString(definition: Object, key: string): string {
            if (typeof definition[key] !== "string") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is string type or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeString(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "string") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is string type or object or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeStringOrObject(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is string type or object or boolean or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeStringOrObjectBoolean(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "boolean"
                && typeof definition[key] !== "string" && typeof definition[key] !== "object") {
                return this.getName(definition, key) + Configuration.MUST_BE_STRING_OR_OBJECT_OR_BOOLEAN_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is boolean type or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeBoolean(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "boolean") {
                return this.getName(definition, key) + Configuration.MUST_BE_BOOLEAN_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is number type or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeNumber(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "number") {
                return this.getName(definition, key) + Configuration.MUST_BE_NUMBER_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is regex instance or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeRegex(definition: Object, key: string): string {
            if (definition[key] !== undefined && !(definition[key] instanceof RegExp)) {
                return this.getName(definition, key) + Configuration.MUST_BE_REGEX_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is date instance or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeDatetime(definition: Object, key: string): string {
            if (definition[key] !== undefined && (typeof definition[key] !== "string" || isNaN(new Date(definition[key]).getTime()))) {
                return this.getName(definition, key) + Configuration.MUST_BE_DATETIME_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is array type or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeArray(definition: Object, key: string): string {
            if (definition[key] !== undefined && !Array.isArray(definition[key])) {
                return this.getName(definition, key) + Configuration.MUST_BE_ARRAY_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is function type or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeFunction(definition: Object, key: string): string {
            let helper: Object = {};
            if (definition[key] !== undefined && helper.toString.call(definition[key]) !== "[object Function]") {
                return this.getName(definition, key) + Configuration.MUST_BE_FUNCTION_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is object or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected shouldBeObject(definition: Object, key: string): string {
            if (definition[key] !== undefined && typeof definition[key] !== "object") {
                return this.getName(definition, key) + Configuration.MUST_BE_OBJECT_OR_UNDEFINED;
            }
            return undefined;
        }

        /**
         * Method that checks if definition's parameter is boolean type or undefined.
         *
         * @param {Object} definition Class definition
         * @param {string} first First key in definition that should be used
         * @param {string} second Second key in definition that should be used
         * @param {any} firstValue Value of first parameter
         * @param {any} secondValue Value of second parameter
         * @param {boolean} include Defines if maximum and minimum values are included in comparation
         * @returns {string}
         */
        protected mustBeGreater(definition: Object, first: string, second: string, firstValue: any,
                                secondValue: any, include: boolean): string {
            if (firstValue !== undefined && secondValue !== undefined) {
                if (include === true && firstValue > secondValue) {
                    return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                        + this.getName(definition, first);
                } else if (include !== true && firstValue >= secondValue) {
                    return this.getName(definition, second) + Configuration.MUST_BE_GREATER
                        + this.getName(definition, first);
                }
            }
            return undefined;
        }

        /**
         * Method that returns full parameter name in definition
         *
         * @param {Object} definition Class definition
         * @param {string} key Key in definition that should be used
         * @returns {string}
         */
        protected getName(definition: Object, key: string): string {
            if (definition[Configuration.PARAMETER_NAME] !== undefined) {
                return definition[Configuration.PARAMETER_NAME] + "." + key;
            }
            return key;
        }
    }
}
