/// <reference path="Input.ts" />
/// <reference path="../../Model/Attribute/String.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import Number = Ompluscript.Model.Attribute.Number;

    /**
     * Class that defines number input
     *
     * @class NumberInput
     */
    export class NumberInput extends Input {

        /**
         * @type {string} TYPE_NUMBER_INPUT Type of number input
         */
        public static TYPE_NUMBER_INPUT: string = NumberInput["name"];

        /**
         * @type {string} INPUT_NUMBER Type of number input HTML element
         */
        public static INPUT_NUMBER: string = "number";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {Number} numberAttribute Attribute for binding with
         * @param {string} placeholder Placeholder asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, numberAttribute: Number = undefined, placeholder: string = undefined, styles: Object = {}) {
            super(name, numberAttribute, placeholder, styles, NumberInput.INPUT_NUMBER);
        }

        /**
         * Method that returns value of input HTML element
         *
         * @returns {any} value for input HTML element
         */
        public getValue(): any {
            let value: string = this.htmlElement["value"];
            if (typeof value === "string") {
                if (isNaN(parseInt(value, 10))) {
                    if (typeof value === "string" && value.length === 0) {
                        return undefined;
                    }
                    return value;
                }
                return parseInt(value, 10);
            }
            return undefined;
        }

        /**
         * Method that defines event for updating input value
         */
        protected addOnUpdateInputEvent(): void {
            let that: NumberInput = this;
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getValue());
            };
            that.htmlElement.addEventListener(TextInput.EVENT_KEY_UP, listener, false);
        }

        /**
         * Method that sets new value of input HTML element
         *
         * @param {any} value New value for input HTML element
         */
        protected updateValue(value: number): void {
            if (value === undefined) {
                this.htmlElement["value"] = "";
            } else {
                this.htmlElement["value"] = value.toString();
            }
        }
    }

}
