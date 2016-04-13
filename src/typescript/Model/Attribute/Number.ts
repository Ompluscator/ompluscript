/// <reference path="Unit.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    /**
     * Class that contains functionality for Number attribute.
     *
     * @class Number
     */
    export class Number extends Unit<number> {

        /**
         * @param {number} minimum Minimum allowed value of the number
         */
        private minimum: number;

        /**
         * @param {boolean} includeMinimum Defines if value can be equal to minimum
         */
        private includeMinimum: boolean;

        /**
         * @param {number} maximum Maximum allowed value of the number
         */
        private maximum: number;

        /**
         * @param {boolean} includeMaximum Defines if value can be equal to maximum
         */
        private includeMaximum: boolean;

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets minimum and maximum allowed number value.
         *
         * @param {string} value
         * @param {boolean} required
         * @param {number} minimum
         * @param {boolean} includeMinimum
         * @param {number} maximum
         * @param {boolean} includeMaximum
         * @constructs
         */
        constructor(value: number = undefined, required: boolean = false,
                    minimum: number = undefined, includeMinimum: boolean = false, 
                    maximum: number = undefined, includeMaximum: boolean = false) {
            super("number", value, required);
            this.minimum = minimum;
            this.maximum = maximum;
            this.includeMinimum = includeMinimum;
            this.includeMaximum = includeMaximum;
            
        }

        /**
         * Method that returns minimum allowed value of number.
         *
         * @returns {number|undefined} minimum allowed value of number
         */
        public getMinimum(): number {
            return this.minimum;
        }

        /**
         * Method that returns maximum allowed value of number.
         *
         * @returns {number|undefined} maximum allowed value of number
         */
        public getMaximum(): number {
            return this.maximum;
        }

        /**
         * Method that validates number value.
         *
         * @throws {TypeError} when it's not number
         * @throws {RangeError} when it's over its minimum or maximum value
         */
        public validate(): void {
            super.validate();
            if (this.value !== undefined) {
                if (this.minimum !== undefined ) {
                    if (this.includeMinimum === false && this.value <= this.minimum) {
                        throw new RangeError(Unit.ERROR_BELOW_MINIMUM);
                    } else if (this.includeMinimum === true && this.value < this.minimum) {
                        throw new RangeError(Unit.ERROR_BELOW_MINIMUM);
                    }
                }
                if (this.maximum !== undefined ) {
                    if (this.includeMaximum === false && this.value >= this.maximum) {
                        throw new RangeError(Unit.ERROR_OVER_MAXIMUM);
                    } else if (this.includeMaximum === true && this.value > this.maximum) {
                        throw new RangeError(Unit.ERROR_OVER_MAXIMUM);
                    }
                }
            }
        }

        /**
         * Method that returns all current attributes of object.
         *
         * @returns {Object} contains all attributes of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["minimum"] = this.minimum;
            trace["includeMinimum"] = this.includeMinimum;
            trace["maximum"] = this.maximum;
            trace["includeMaximum"] = this.includeMaximum;
            return trace;
        }

    }

}
