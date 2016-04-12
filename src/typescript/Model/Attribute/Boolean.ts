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
         * @param {string} value
         * @param {boolean} required
         * @constructs
         */
        constructor(value: boolean = undefined, required: boolean = false) {
            super("boolean", value, required);
        }

    }

}
