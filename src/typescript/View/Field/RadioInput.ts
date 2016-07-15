/// <reference path="Input.ts" />
/// <reference path="../../Model/Attribute/SingleChoice.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;

    /**
     * Class that defines text input
     *
     * @class RadioInput
     */
    export class RadioInput extends Input {

        /**
         * @type {string} TYPE_RADIO_INPUT Type of check box input
         */
        public static TYPE_RADIO_INPUT: string = RadioInput["name"];

        /**
         * @type {string} INPUT_RADIO Type of radio input HTML element
         */
        public static INPUT_RADIO: string = "radio";

        /**
         * @type {string} EVENT_KEY_PRESS Name of event when state of input is changed
         */
        public static EVENT_CHANGE: string = "change";

        /**
         * @type {number} value Value of radio input
         */
        private value: number;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {SingleChoice} singleChoiceAttribute Attribute for binding with
         * @param {string} placeholder Placeholder asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, singleChoiceAttribute: SingleChoice = undefined, value: number, styles: Object = {}) {
            super(name, singleChoiceAttribute, undefined, styles, RadioInput.INPUT_RADIO);
            this.value = value;
            if (singleChoiceAttribute !== undefined) {
                this.setAttribute(Input.ATTRIBUTE_VALUE, this.value + "");
                this.setAttribute(Input.ATTRIBUTE_NAME, singleChoiceAttribute.getName());
            }
        }

        /**
         * Method that returns value of input HTML element
         *
         * @returns {any} value for input HTML element
         */
        public getValue(): number {
            return this.htmlElement["checked"] === true ? this.value : undefined;
        }

        /**
         * Method that defines event for updating input value
         */
        protected addOnUpdateInputEvent(): void {
            let that: RadioInput = this;
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getValue());
            };
            that.htmlElement.addEventListener(CheckBoxInput.EVENT_CHANGE, listener, false);
        }

        /**
         * Method that sets new value of input HTML element
         *
         * @param {any} value New value for input HTML element
         */
        protected updateValue(value: number): void {
            this.htmlElement["checked"] = value === this.value;
        }
    }

}
