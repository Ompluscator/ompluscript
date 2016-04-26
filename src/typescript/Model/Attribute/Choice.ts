/// <reference path="Attribute.ts" />

/**
 * Module that contains Attribute classes.
 *
 * @module Ompluscript.Model.Attribute
 */
module Ompluscript.Model.Attribute {
    "use strict";

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
         * @type {number} EVENT_UPDATE_CHOICES Event that occurs when choices are updated.
         */
        public static EVENT_UPDATE_CHOICES: number = 1011;

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
            this.choices = values;
            this.notifyObservers(Choice.EVENT_UPDATE_CHOICES);
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

    }

}
