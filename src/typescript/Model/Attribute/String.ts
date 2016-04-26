/// <reference path="Attribute.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";
    
    /**
     * Class that contains functionality for String attribute.
     *
     * @class String
     */
    export class String extends Attribute<string> {

        /**
         * @type {number} ERROR_BELOW_MINIMUM_LENGTH Error code for invalid minimum length of the string.
         */
        public static ERROR_BELOW_MINIMUM_LENGTH: number = 211;

        /**
         * @type {number} ERROR_OVER_MAXIMUM_LENGTH Error code for invalid maximum length of the string.
         */
        public static ERROR_OVER_MAXIMUM_LENGTH: number = 212;

        /**
         * @type {number} ERROR_PATTERN_NOT_MATCH Error code when string doesn't match pattern.
         */
        public static ERROR_PATTERN_NOT_MATCH: number = 221;

        /**
         * @type {string} PARAMETER_MINIMUM_LENGTH Minimum length parameter name.
         */
        public static PARAMETER_MINIMUM_LENGTH: string = "minimumLength";

        /**
         * @type {string} PARAMETER_MAXIMUM_LENGTH Maximum length parameter name.
         */
        public static PARAMETER_MAXIMUM_LENGTH: string = "maximumLength";

        /**
         * @type {string} PARAMETER_PATTERN Pattern parameter name.
         */
        public static PARAMETER_PATTERN: string = "pattern";

        /**
         * @type {number} minimumLength Minimum allowed length of the string
         */
        private minimumLength: number;

        /**
         * @type {number} maximumLength Maximum allowed length of the string
         */
        private maximumLength: number;

        /**
         * @type {RegExp} allowed pattern Pattern for string
         */
        private pattern: RegExp;

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets minimum and maximum allowed string length and
         * allowed pattern for string.
         *
         * @param {string} name Name of attribute
         * @param {string} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {number} minimumLength Minimum allowed length of string
         * @param {number} maximumLength Maximum allowed length of string
         * @param {RegExp} pattern
         * @constructs
         */
        constructor(name: string, value: string = undefined, required: boolean = false, 
                    minimumLength: number = undefined, maximumLength: number = undefined,
                    pattern: RegExp = undefined) {
            super("string", name, value, required);
            this.minimumLength = minimumLength;
            this.maximumLength = maximumLength;
            this.pattern = pattern;
        }

        /**
         * Method that returns minimum allowed length of string.
         *
         * @returns {number|undefined} minimum allowed length of string
         */
        public getMinimumLength(): number {
            return this.minimumLength;
        }

        /**
         * Method that returns maximum allowed length of string.
         *
         * @returns {number|undefined} maximum allowed length of string
         */
        public getMaximumLength(): number {
            return this.maximumLength;
        }

        /**
         * Method that returns allowed pattern for string.
         *
         * @returns {RegExp|undefined} allowed pattern for string
         */
        public getPattern(): RegExp {
            return this.pattern;
        }

        /**
         * Method that validates string value.
         *
         * @return {boolean} Validation result
         */
        public validate(): boolean {
            if (super.validate()) {
                if (this.value !== undefined && this.minimumLength !== undefined && this.value["length"] < this.minimumLength) {
                    this.error = String.ERROR_BELOW_MINIMUM_LENGTH;
                    this.notifyObservers(Attribute.EVENT_INVALID);
                    return false;
                } else if (this.value !== undefined && this.maximumLength !== undefined && this.value["length"] > this.maximumLength) {
                    this.error = String.ERROR_OVER_MAXIMUM_LENGTH;
                    this.notifyObservers(Attribute.EVENT_INVALID);
                    return false;
                } else if (this.value !== undefined && this.pattern !== undefined && this.pattern.test(this.value) === false) {
                    this.error = String.ERROR_PATTERN_NOT_MATCH;
                    this.notifyObservers(Attribute.EVENT_INVALID);
                    return false;
                }
                return true;
            }
            return false;
        }

        /**
         * Method that returns all current attributes of object.
         *
         * @returns {Object} contains all attributes of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[String.PARAMETER_MINIMUM_LENGTH] = this.minimumLength;
            trace[String.PARAMETER_MAXIMUM_LENGTH] = this.maximumLength;
            trace[String.PARAMETER_PATTERN] = this.pattern;
            return trace;
        }

    }

}
