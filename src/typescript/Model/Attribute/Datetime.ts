/// <reference path="Unit.ts" />
/// <reference path="../../Core/Utils/General.ts" />

/**
 * Module that contains Attribute classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    import General = Ompluscript.Core.Utils.General;

    /**
     * Class that contains functionality for Datetime attribute.
     *
     * @class Datetime
     */
    export class Datetime extends Unit<string> {

        /**
         * @param {string} minimum Minimum allowed value of the date, stored as string
         */
        private minimum: string;

        /**
         * @param {string} maximum Maximum allowed value of the date, stored as string
         */
        private maximum: string;

        /**
         * @param {Date} minimumObject Minimum allowed value of the date, stored as Date object
         */
        private minimumObject: Date;

        /**
         * @param {Date} maximumObject Maximum allowed value of the date, stored as Date object
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
         * @throws {TypeError} When minimum and maximum are not in valid date format or in wrong order
         */
        constructor(name: string, value: string = undefined, required: boolean = false,
                    minimum: string = undefined, maximum: string = undefined) {
            super("string", name, value, required);
            this.minimum = minimum;
            this.maximum = maximum;
            if (minimum !== undefined) {
                this.minimumObject = new Date(minimum);
                if (isNaN(this.minimumObject.getTime())) {
                    General.throwConfigurationException(Datetime, {
                        minimum: minimum,
                    });
                }
            } else {
                this.minimumObject = undefined;
            }
            if (maximum !== undefined) {
                this.maximumObject = new Date(maximum);
                if (isNaN(this.maximumObject.getTime())) {
                    General.throwConfigurationException(Datetime, {
                        maximum: maximum,
                    });
                }
            } else {
                this.maximumObject = undefined;
            }
            if (this.minimumObject !== undefined && this.maximumObject !== undefined
                && this.minimumObject >= this.maximumObject) {
                General.throwConfigurationException(Datetime, {
                    maximum: maximum,
                    minimum: minimum,
                });
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
         * @throws {TypeError} when it's not in right datetime format
         * @throws {RangeError} when it's over its minimum or maximum value
         */
        public validate(): void {
            super.validate();
            if (this.value !== undefined && isNaN(this.getDateObject().getTime())) {
                General.throwControlledException(TypeError, Datetime, this.name, Unit.ERROR_WRONG_TYPE);
            }
            if (this.value !== undefined && this.minimum !== undefined
                && this.getDateObject().getTime() < this.minimumObject.getTime()) {
                General.throwControlledException(RangeError, Datetime, this.name, Unit.ERROR_BELOW_MINIMUM);
            } else if (this.value !== undefined && this.maximum !== undefined
                && this.getDateObject().getTime() > this.maximumObject.getTime()) {
                General.throwControlledException(RangeError, Datetime, this.name, Unit.ERROR_OVER_MAXIMUM);
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
            trace["minimumObject"] = this.minimumObject;
            trace["maximum"] = this.maximum;
            trace["maximumObject"] = this.maximumObject;
            return trace;
        }

    }

}
