/// <reference path="Attribute.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    import Attribute = Ompluscript.Model.Attribute.Attribute;

    /**
     * Class that contains functionality for Number attribute.
     *
     * @class Number
     */
    export class Number extends Attribute<number> {

        /**
         * @type {string} PARAMETER_INCLUDE_MINIMUM Include minimum parameter name.
         */
        public static PARAMETER_INCLUDE_MINIMUM: string = "includeMinimum";

        /**
         * @type {string} PARAMETER_INCLUDE_MAXIMUM Include maximum parameter name.
         */
        public static PARAMETER_INCLUDE_MAXIMUM: string = "includeMaximum";

        /**
         * @type {string} TYPE_NUMBER Number type name.
         */
        public static TYPE_NUMBER: string = Number["name"];

        /**
         * @type {number} minimum Minimum allowed value of the number
         */
        private minimum: number;

        /**
         * @type {boolean} includeMinimum Defines if value can be equal to minimum
         */
        private includeMinimum: boolean;

        /**
         * @type {number} maximum Maximum allowed value of the number
         */
        private maximum: number;

        /**
         * @type {boolean} includeMaximum Defines if value can be equal to maximum
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
            this.includeMinimum = false;
            if (includeMinimum === true) {
                this.includeMinimum = true;
            }
            this.includeMaximum = false;
            if (includeMaximum === true) {
                this.includeMaximum = true;
            }
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
         * @returns {boolean} Validation result
         */
        public validate(): boolean {
            if (super.validate()) {
                if (this.value !== undefined) {
                    if (this.minimum !== undefined) {
                        if (this.includeMinimum === false && this.value <= this.minimum) {
                            this.error = Attribute.ERROR_BELOW_MINIMUM;
                            return false;
                        } else if (this.includeMinimum === true && this.value < this.minimum) {
                            this.error = Attribute.ERROR_BELOW_MINIMUM;
                            return false;
                        }
                    }
                    if (this.maximum !== undefined) {
                        if (this.includeMaximum === false && this.value >= this.maximum) {
                            this.error = Attribute.ERROR_OVER_MAXIMUM;
                            return false;
                        } else if (this.includeMaximum === true && this.value > this.maximum) {
                            this.error = Attribute.ERROR_OVER_MAXIMUM;
                            return false;
                        }
                    }
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
            trace[Number.PARAMETER_INCLUDE_MINIMUM] = this.includeMinimum;
            trace[Attribute.PARAMETER_MAXIMUM] = this.maximum;
            trace[Number.PARAMETER_INCLUDE_MAXIMUM] = this.includeMaximum;
            return trace;
        }

    }

}
