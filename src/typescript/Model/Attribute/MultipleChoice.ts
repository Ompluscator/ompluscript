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
         * Class that contains functionality for MultipleChoice attribute.
         *
         * @class MultipleChoice
         */
        export class MultipleChoice extends Unit<number[]> {

            /**
             * @type {number[]} values Allowed values for choices
             */
            private values: number[];

            /**
             * Class constructor.
             *
             * Calls superclass constructor and sets allowed choices.
             *
             * @param {string} name Name of attribute
             * @param {number[]} value Attribute's value
             * @param {boolean} required Defines if value is required
             * @param {number[]} values Allowed values
             * @throws {SyntaxError} When values is not defined well
             * @constructs
             */
            constructor(name: string, value: number[] = undefined, required: boolean = false, values: number[] = []) {
                super("number", name, value, required);
                this.values = values;
                if (this.values !== undefined && !Array.isArray(this.values)) {
                    General.throwConfigurationException(MultipleChoice, {
                        values: this.values,
                    });
                }
            }

            /**
             * Method that returns allowed values for choices
             *
             * @returns {number[]} Allowed values
             */
            public getChoices(): number[] {
                return this.values;
            }

            /**
             * Method that sets allowed values for choices
             *
             * @param {number[]} values Allowed values
             */
            public setChoices(values: number[]): void {
                this.values = values;
            }

            /**
             * Method that validates number value.
             *
             * @throws {TypeError} when it's not in right array format
             * @throws {RangeError} when it has not allowed choice
             */
            public validate(): void {
                if (Array.isArray(this.value) === false && this.value !== undefined) {
                    General.throwControlledException(TypeError, Unit, this.name, Unit.ERROR_WRONG_TYPE);
                } else if (this.required === true &&  (Array.isArray(this.value) === false || this.value.length === 0)) {
                    General.throwControlledException(TypeError, Unit, this.name, Unit.ERROR_IS_REQUIRED);
                }
                if (Array.isArray(this.value) === true) {
                    for (let i in this.value) {
                        if (this.values.indexOf(this.value[i]) === -1) {
                            General.throwControlledException(RangeError, MultipleChoice, this.name, Unit.ERROR_VALUE_NOT_ALLOWED);
                        }
                    }
                }
            }

            /**
             * Method that returns all current attributes of object.
             *
             * @returns {Object} contains all attributes of the object
             */
            public getStackTrace(): Object {
                let trace: Object = super.getStackTrace();
                trace[Unit.PARAMETER_VALUES] = this.values;
                return trace;
            }

        }

    }
