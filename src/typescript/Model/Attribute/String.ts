/// <reference path="AbstractAttribute.ts" />

/**
 * Module that containes attributes' classes.
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
    export class String extends AbstractAttribute<string> {

        private minimumLength: number;
        private maximumLength: number;

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets minimum and maximum allowed string length.
         *
         * @param {string} name
         * @param {string} value
         * @param {boolean} required
         * @param {number} minimumLength
         * @param {number} maximumLength
         * @constructs
         */
        constructor(name: string, value: string = undefined, required: boolean = false, 
                    minimumLength: number = undefined, maximumLength: number = undefined) {
            super(name, value, required);
            this.minimumLength = minimumLength;
            this.maximumLength = maximumLength;
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
         * Method that validates string value.
         *
         * @throws {TypeError} when it's not string
         * @throws {RangeError} when it's over its minimum or maximum length
         */
        public validate(): void {
            if ((this.required === true && this.value === undefined) || typeof this.value !== "string") {
                throw new TypeError("Attribute " + this.name + " is not a string.");
            } else if (this.value !== undefined && this.minimumLength !== undefined && this.value.length < this.minimumLength) {
                throw new RangeError("Attribute " + this.name + " is string with less length than minimum allowed.");
            } else if (this.value !== undefined && this.maximumLength !== undefined && this.value.length > this.maximumLength) {
                throw new RangeError("Attribute " + this.name + " is string with greater length than maximum allowed.");
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
            return trace;
        }

    }

}
