/// <reference path="Unit.ts" />

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
    export class String extends Unit<string> {

        /**
         * @param {string} ERROR_BELOW_MINIMUM_LENGTH Error code for invalid minimum length of the string.
         */
        public static ERROR_BELOW_MINIMUM_LENGTH: string = "211";

        /**
         * @param {string} ERROR_OVER_MAXIMUM_LENGTH Error code for invalid maximum length of the string.
         */
        public static ERROR_OVER_MAXIMUM_LENGTH: string = "212";

        /**
         * @param {string} ERROR_PATTERN_NOT_MATCH Error code when string doesn't match pattern.
         */
        public static ERROR_PATTERN_NOT_MATCH: string = "221";

        /**
         * @param {number} minimumLength Minimum allowed length of the string
         */
        private minimumLength: number;

        /**
         * @param {number} maximumLength Maximum allowed length of the string
         */
        private maximumLength: number;

        /**
         * @param {RegExp} allowed pattern Pattern for string
         */
        private pattern: RegExp;

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets minimum and maximum allowed string length and
         * allowed pattern for string.
         *
         * @param {string} value
         * @param {boolean} required
         * @param {number} minimumLength
         * @param {number} maximumLength
         * @param {RegExp} pattern
         * @constructs
         */
        constructor(value: string = undefined, required: boolean = false, 
                    minimumLength: number = undefined, maximumLength: number = undefined,
                    pattern: RegExp = undefined) {
            super("string", value, required);
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
         * @throws {TypeError} when it's not string
         * @throws {RangeError} when it's over its minimum or maximum length
         */
        public validate(): void {
            super.validate();
            if (this.value !== undefined && this.minimumLength !== undefined && this.value.length < this.minimumLength) {
                throw new RangeError(String.ERROR_BELOW_MINIMUM_LENGTH);
            } else if (this.value !== undefined && this.maximumLength !== undefined && this.value.length > this.maximumLength) {
                throw new RangeError(String.ERROR_OVER_MAXIMUM_LENGTH);
            } else if (this.value !== undefined && this.pattern !== undefined && this.pattern.test(this.value) === false) {
                throw new RangeError(String.ERROR_PATTERN_NOT_MATCH);
            }
        }

        /**
         * Method that returns all current attributes of object.
         *
         * @returns {Object} contains all attributes of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["minimumLength"] = this.minimumLength;
            trace["maximumLength"] = this.maximumLength;
            trace["pattern"] = this.pattern;
            return trace;
        }

    }

}
