/// <reference path="Attribute.ts" />

/**
 * Module that contains Attribute classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    /**
     * Class that contains functionality for Datetime attribute.
     *
     * @class Datetime
     */
    export class Datetime extends Attribute<string> {

        /**
         * @type {string} minimum Minimum allowed value of the date, stored as string
         */
        private minimum: string;

        /**
         * @type {string} maximum Maximum allowed value of the date, stored as string
         */
        private maximum: string;

        /**
         * @type {Date} minimumObject Minimum allowed value of the date, stored as Date object
         */
        private minimumObject: Date;

        /**
         * @type {Date} maximumObject Maximum allowed value of the date, stored as Date object
         */
        private maximumObject: Date;

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets minimum and maximum allowed Date value.
         *
         * @param {string} name Name of attribute
         * @param {string} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {number} minimum Minimum allowed value of string
         * @param {number} maximum Maximum allowed value of string
         */
        constructor(name: string, value: string = undefined, required: boolean = false,
                    minimum: string = undefined, maximum: string = undefined) {
            super("string", name, value, required);
            this.minimum = minimum;
            this.maximum = maximum;
            if (minimum !== undefined) {
                this.minimumObject = new Date(minimum);
            }
            if (maximum !== undefined) {
                this.maximumObject = new Date(maximum);
            }
        }

        /**
         * Method that returns attributes value as a Date object
         *
         * @returns {Date} Value as a Date object
         */
        public getDateObject(): Date {
            return new Date(this.value);
        }

        /**
         * Method that returns minimum allowed value of datetime, as string.
         *
         * @returns {string|undefined} Minimum allowed value of datetime, as string
         */
        public getMinimum(): string {
            return this.minimum;
        }

        /**
         * Method that returns minimum allowed value of datetime, as Date object.
         *
         * @returns {Date|undefined} Minimum allowed value of datetime, as Date object
         */
        public getMinimumDateObject(): Date {
            return this.minimumObject;
        }

        /**
         * Method that returns maximum allowed value of datetime, as string.
         *
         * @returns {string|undefined} Maximum allowed value of datetime, as string
         */
        public getMaximum(): string {
            return this.maximum;
        }

        /**
         * Method that returns maximum allowed value of datetime, as Date object.
         *
         * @returns {Date|undefined} Maximum allowed value of datetime, as Date object
         */
        public getMaximumDateObject(): Date {
            return this.maximumObject;
        }

        /**
         * Method that validates datetime value.
         *
         * @return {boolean} Validation result
         */
        public validate(): boolean {
            if (super.validate()) {
                if (this.value !== undefined && isNaN(this.getDateObject().getTime())) {
                    this.error = Attribute.ERROR_WRONG_TYPE;
                    return false;
                }
                if (this.value !== undefined && this.minimum !== undefined
                    && this.getDateObject().getTime() < this.minimumObject.getTime()) {
                    this.error = Attribute.ERROR_BELOW_MINIMUM;
                    return false;
                } else if (this.value !== undefined && this.maximum !== undefined
                    && this.getDateObject().getTime() > this.maximumObject.getTime()) {
                    this.error = Attribute.ERROR_OVER_MAXIMUM;
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
            trace[Attribute.PARAMETER_MINIMUM] = this.minimum;
            trace["minimumObject"] = this.minimumObject;
            trace[Attribute.PARAMETER_MAXIMUM] = this.maximum;
            trace["maximumObject"] = this.maximumObject;
            return trace;
        }

    }

}
