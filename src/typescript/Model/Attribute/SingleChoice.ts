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
         * Class that contains functionality for SingleChoice attribute.
         *
         * @class SingleChoice
         */
        export class SingleChoice extends Unit<number> {

            /**
             * @param {number[]} values Allowed values for choice
             */
            private values: number[];

            /**
             * Class constructor.
             *
             * Calls superclass constructor and sets allowed choices.
             *
             * @param {string} name Name of attribute
             * @param {number} value Attribute's value
             * @param {boolean} required Defines if value is required
             * @param {number[]} values Allowed values
             */
            constructor(name: string, value: number = undefined, required: boolean = false, values: number[] = []) {
                super("number", name, value, required);
                this.values = values;
                if (this.values !== undefined && !Array.isArray(this.values)) {
                    General.throwConfigurationException(Unit, {
                        values: this.values,
                    });
                }
            }

            /**
             * Method that returns allowed values for choice
             *
             * @returns {number[]} Allowed values
             */
            public getChoices(): number[] {
                return this.values;
            }

            /**
             * Method that sets allowed values for choice
             * 
             * @param {number[]} values Allowed values
             */
            public setChoices(values: number[]): void {
                this.values = values;
            }

            /**
             * Method that validates number value.
             *
             * @throws {TypeError} when it's not in right number format
             * @throws {RangeError} when it has not allowed choice
             */
            public validate(): void {
                super.validate();
                if (this.value !== undefined && this.values.indexOf(this.value) === -1) {
                    General.throwControlledException(RangeError, SingleChoice, this.name, Unit.ERROR_VALUE_NOT_ALLOWED);
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
