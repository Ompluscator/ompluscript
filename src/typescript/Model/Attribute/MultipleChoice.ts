/// <reference path="Choice.ts" />
/// <reference path="../Event/OnUpdateAttribute.ts" />
/// <reference path="../Event/OnInvalidAttribute.ts" />

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
         * Method that sets value of attribute
         *
         * @param {number[]} value Attribute's value
         */
        public setValue(value: number[]): void {
            let oldValue: number[] = this.value;
            if (Array.isArray(this.value) === true) {
                oldValue = this.value.slice(0);
            }
            this.value = value;
            this.fireOnUpdateAttributeEvent(oldValue, this.value);
            if (!this.validate()) {
                this.fireOnInvalidAttributeEvent(this.value, this.error);
            }
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
                return false;
            } else if (this.required === true &&  (Array.isArray(this.value) === false || this.value.length === 0)) {
                this.error = Attribute.ERROR_IS_REQUIRED;
                return false;
            }
            if (Array.isArray(this.value) === true) {
                for (let i in this.value) {
                    if (this.choices.indexOf(this.value[i]) === -1) {
                        this.error = Choice.ERROR_VALUE_NOT_ALLOWED;
                        return false;
                    }
                }
            }
            return true;
        }

    }

}
