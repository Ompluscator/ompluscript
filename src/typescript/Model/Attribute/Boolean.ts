/// <reference path="Unit.ts" />

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
    export class Boolean extends Unit<boolean> {

        /**
         * Class constructor.
         *
         * Calls superclass constructor.
         *
         * @param {string} name Name of attribute
         * @param {boolean} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @constructs
         */
        constructor(name: string, value: boolean = undefined, required: boolean = false) {
            super("boolean", name, value, required);
        }

    }

}
