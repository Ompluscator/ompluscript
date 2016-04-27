/// <reference path="Attribute.ts" />
/// <reference path="../Event/OnUpdateChoices.ts" />

/**
 * Module that contains Attribute classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";
    import OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;

    /**
     * Class that contains functionality for Choice attribute.
     *
     * @class Choice
     */
    export class Choice<T> extends Attribute<T> {

        /**
         * @type {string} PARAMETER_VALUES Choices parameter name.
         */
        public static PARAMETER_CHOICES: string = "choices";

        /**
         * @type {number} ERROR_VALUE_NOT_ALLOWED Error code when not allowed value.
         */
        public static ERROR_VALUE_NOT_ALLOWED: number = 203;

        /**
         * @type {number[]} values Allowed values for choice
         */
        protected choices: number[];

        /**
         * Class constructor.
         *
         * Calls superclass constructor and sets allowed choices.
         *
         * @param {string} name Name of attribute
         * @param {T} value Attribute's value
         * @param {boolean} required Defines if value is required
         * @param {number[]} choices Allowed choices
         * @constructs
         */
        constructor(name: string, value: T = undefined, required: boolean = false, choices: number[] = []) {
            super("number", name, value, required);
            this.choices = choices;
        }

        /**
         * Method that returns allowed values for choice
         *
         * @returns {number[]} Allowed values
         */
        public getChoices(): number[] {
            return this.choices;
        }

        /**
         * Method that sets allowed values for choice
         * 
         * @param {number[]} values Allowed values
         */
        public setChoices(values: number[]): void {
            let oldChoices: number[] = this.choices.slice(0);
            this.choices = values;
            this.fireOnUpdateChoicesEvent(oldChoices, this.choices);
        }

        /**
         * Method that returns all current attributes of object.
         *
         * @returns {Object} contains all attributes of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[Choice.PARAMETER_CHOICES] = this.choices;
            return trace;
        }

        /**
         * Method that fires event when choices are updated
         * 
         * @param {number[]} oldChoices Old choices of attribute
         * @param {number[]} newChoices New choices of attribute
         */
        protected fireOnUpdateChoicesEvent(oldChoices: number[], newChoices: number[]): void {
            let event: OnUpdateChoices = new OnUpdateChoices(this, oldChoices, newChoices);
            this.notifyObservers(event);
        }

    }

}
