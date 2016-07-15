/// <reference path="Input.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import Attribute = Ompluscript.Model.Attribute.Attribute;

    /**
     * Class that defines text input
     *
     * @class TextInput
     */
    export class TextInput extends Input {

        /**
         * @type {string} TYPE_TEXT_INPUT Type of text input
         */
        public static TYPE_TEXT_INPUT: string = TextInput["name"];

        /**
         * @type {string} INPUT_TEXT Type of text input HTML element
         */
        public static INPUT_TEXT: string = "text";

        /**
         * @type {string} EVENT_KEY_PRESS Name of event for key press on input
         */
        public static EVENT_KEY_PRESS: string = "keypress";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {Attribute<any>} attribute Attribute for binding with
         * @param {string} placeholder Placeholder asset name
         * @param {Object} styles Styles for component
         * @param {string} type Type of HTML input element
         * @constructs
         */
        constructor(name: string, attribute: Attribute<any> = undefined, placeholder: string = undefined, 
                    styles: Object = {}, type: string = TextInput.INPUT_TEXT) {
            super(name, attribute, placeholder, styles, type);
        }

        /**
         * Method that returns value of input HTML element
         *
         * @returns {any} value for input HTML element
         */
        public getValue(): string {
            let value: string = this.getAttribute(Input.ATTRIBUTE_VALUE);
            if (typeof value === "string") {
                return value;
            }
            return undefined;
        }

        /**
         * Method that defines event for updating input value
         */
        protected addOnUpdateInputEvent(): void {
            let that: TextInput = this;
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getValue());
            };
            that.htmlElement.addEventListener(TextInput.EVENT_KEY_PRESS, listener, false);
        }

        /**
         * Method that sets new value of input HTML element
         *
         * @param {any} value New value for input HTML element
         */
        protected updateValue(value: any): void {
            this.setAttribute(Input.ATTRIBUTE_VALUE, value);
        }
    }

}
