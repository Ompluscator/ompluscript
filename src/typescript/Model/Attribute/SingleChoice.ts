/// <reference path="Choice.ts" />

/**
 * Module that contains Attribute classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains functionality for SingleChoice attribute.
     *
     * @class SingleChoice
     */
    export class SingleChoice extends Choice<number> {

        /**
         * @type {string} TYPE_SINGLE_CHOICE SingleChoice type name.
         */
        public static TYPE_SINGLE_CHOICE: string = "SingleChoice";

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets allowed choices.
         *
         * @param {string} name Name of attribute
         * @param {number} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {number[]} choices Allowed choices
         * @constructs
         */
        constructor(name: string, value: number = undefined, required: boolean = false, choices: number[] = []) {
            super(name, value, required, choices);
        }

        /**
         * Method that validates number value.
         *
         * @returns {boolean} Validation result
         */
        public validate(): boolean {
            if (super.validate()) {
                if (this.value !== undefined && this.choices.indexOf(this.value) === -1) {
                    this.error = Choice.ERROR_VALUE_NOT_ALLOWED;
                    return false;
                }
                return true;
            }
            return false;
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            let choices: number[] = undefined;
            if (Array.isArray(this.choices)) {
                choices = [];
                for (let i: number = 0; i < this.choices.length; i++) {
                    choices.push(this.choices[i]);
                }
            }
            return new SingleChoice(this.name, undefined, this.required, choices);
        }
    }

}
