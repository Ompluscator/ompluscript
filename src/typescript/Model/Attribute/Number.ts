/// <reference path="Unit.ts" />
/// <reference path="../../Core/Utils/General.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    import General = Ompluscript.Core.Utils.General;

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
         * @param {string} name Name of attribute
         * @param {number} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {number} minimum Minimum allowed value of string
         * @param {boolean} includeMinimum Defines if value can be equal to maximum
         * @param {number} maximum Maximum allowed value of string
         * @param {boolean} includeMaximum Defines if value can be equal to maximum
         * @constructs
         */
        constructor(name: string, value: number = undefined, required: boolean = false,
                    minimum: number = undefined, includeMinimum: boolean = false, 
                    maximum: number = undefined, includeMaximum: boolean = false) {
            super("number", name, value, required);
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
                        General.throwControlledException(RangeError, Number, this.name, Unit.ERROR_BELOW_MINIMUM);
                    } else if (this.includeMinimum === true && this.value < this.minimum) {
                        General.throwControlledException(RangeError, Number, this.name, Unit.ERROR_BELOW_MINIMUM);
                    }
                }
                if (this.maximum !== undefined ) {
                    if (this.includeMaximum === false && this.value >= this.maximum) {
                        General.throwControlledException(RangeError, Number, this.name, Unit.ERROR_OVER_MAXIMUM);
                    } else if (this.includeMaximum === true && this.value > this.maximum) {
                        General.throwControlledException(RangeError, Number, this.name, Unit.ERROR_OVER_MAXIMUM);
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
