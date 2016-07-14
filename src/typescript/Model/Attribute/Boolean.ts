/// <reference path="Attribute.ts" />

/**
 * Module that contains attributes' classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    /**
     * Class that contains functionality for Boolean attribute.
     *
     * @class Boolean
     */
    export class Boolean extends Attribute<boolean> {

        /**
         * @type {string} PARAMETER_MUST_BE_TRUE Must be true parameter name.
         */
        public static PARAMETER_MUST_BE_TRUE: string = "mustBeTrue";

        /**
         * @type {string} TYPE_BOOLEAN Boolean type name.
         */
        public static TYPE_BOOLEAN: string = Boolean["name"];

        /**
         * @type {number} ERROR_MUST_BE_TRUE Error code for value that is not true.
         */
        public static ERROR_MUST_BE_TRUE: number = 204;

        /**
         * @type {boolean} mustBeTrue Defines if value must be true
         */
        protected mustBeTrue: boolean;

        /**
         * Class constructor.
         *
         * Calls superclass constructor.
         *
         * @param {string} name Name of attribute
         * @param {boolean} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {boolean} mustBeTrue Defines if value must be true
         * @constructs
         */
        constructor(name: string, value: boolean = undefined, required: boolean = false, mustBeTrue: boolean = false) {
            super("boolean", name, value, required);
            this.mustBeTrue = mustBeTrue;
        }
        
        public isMustBeTrue(): boolean {
            return this.mustBeTrue;
        }

        /**
         * Method that validates boolean value.
         *
         * @returns {boolean} Validation result
         */
        public validate(): boolean {
            if (super.validate()) {
                if (this.value !== true && this.mustBeTrue === true) {
                    this.error = Boolean.ERROR_MUST_BE_TRUE;
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
            trace[Boolean.PARAMETER_MUST_BE_TRUE] = this.mustBeTrue;
            return trace;
        }

    }

}
