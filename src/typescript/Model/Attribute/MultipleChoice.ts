/// <reference path="Choice.ts" />

/**
 * Module that contains Attribute classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

    /**
     * Class that contains functionality for MultipleChoice attribute.
     *
     * @class MultipleChoice
     */
    export class MultipleChoice extends Choice<number[]> {

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets allowed choices.
         *
         * @param {string} name Name of attribute
         * @param {number[]} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {number[]} choices Allowed choices
         * @constructs
         */
        constructor(name: string, value: number[] = undefined, required: boolean = false, choices: number[] = []) {
            super(name, value, required, choices);
        }

        /**
         * Method that validates number value.
         *
         * @return {boolean} Validation result
         */
        public validate(): boolean {
            this.error = undefined;
            if (Array.isArray(this.value) === false && this.value !== undefined) {
                this.error = Attribute.ERROR_WRONG_TYPE;
                this.notifyObservers(Attribute.EVENT_INVALID);
                return false;
            } else if (this.required === true &&  (Array.isArray(this.value) === false || this.value.length === 0)) {
                this.error = Attribute.ERROR_IS_REQUIRED;
                this.notifyObservers(Attribute.EVENT_INVALID);
                return false;
            }
            if (Array.isArray(this.value) === true) {
                for (let i in this.value) {
                    if (this.choices.indexOf(this.value[i]) === -1) {
                        this.error = Choice.ERROR_VALUE_NOT_ALLOWED;
                        this.notifyObservers(Attribute.EVENT_INVALID);
                        return false;
                    }
                }
            }
            return true;
        }

    }

}
