/// <reference path="Input.ts" />
/// <reference path="Label.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines text input
     *
     * @class TextInput
     */
    export class LabelInput extends Input {

        /**
         * @type {string} TYPE_LABEL_INPUT Type of label input
         */
        public static TYPE_LABEL_INPUT: string = "LabelInput";

        /**
         * @type {string} EVENT_KEY_UP Name of event for key u[ on input
         */
        public static EVENT_KEY_UP: string = "keyup";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {Attribute<any>} attribute Attribute for binding with
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, attribute: Attribute<any> = undefined, styles: Object = {}) {
            super(name, attribute, undefined, styles);
            this.removeAttribute(Input.ATTRIBUTE_TYPE);
            this.removeAttribute(Input.ATTRIBUTE_NAME);
        }

        /**
         * Method that returns value of input HTML element
         *
         * @returns {any} value for input HTML element
         */
        public getValue(): string {
            return this.htmlElement.innerHTML;
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            return new LabelInput(this.name, this.attribute, this.styles);
        }

        /**
         * Method that defines event for updating input value
         */
        protected addOnUpdateInputEvent(): void {
            return undefined;
        }

        /**
         * Method that sets new value of input HTML element
         *
         * @param {any} value New value for input HTML element
         */
        protected updateValue(value: any): void {
            if (value === undefined) {
                value = "";
            }
            this.htmlElement.innerHTML = value;
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Label.ELEMENT_LABEL);
        }
    }

}
