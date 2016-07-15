/// <reference path="Input.ts" />
/// <reference path="../../Model/Attribute/Boolean.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import Boolean = Ompluscript.Model.Attribute.Boolean;

    /**
     * Class that defines text input
     *
     * @class CheckBoxInput
     */
    export class CheckBoxInput extends Input {

        /**
         * @type {string} TYPE_TEXT_INPUT Type of check box input
         */
        public static TYPE_CHECK_BOX_INPUT: string = CheckBoxInput["name"];

        /**
         * @type {string} INPUT_CHECK_BOX Type of check box input HTML element
         */
        public static INPUT_CHECK_BOX: string = "checkbox";

        /**
         * @type {string} EVENT_KEY_PRESS Name of event when state of input is changed
         */
        public static EVENT_CHANGE: string = "change";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {Boolean} booleanAttribute Attribute for binding with
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, booleanAttribute: Boolean = undefined, styles: Object = {}) {
            super(name, booleanAttribute, undefined, styles, CheckBoxInput.INPUT_CHECK_BOX);
        }

        /**
         * Method that returns value of input HTML element
         *
         * @returns {any} value for input HTML element
         */
        public getValue(): boolean {
            return this.htmlElement["checked"];
        }

        /**
         * Method that defines event for updating input value
         */
        protected addOnUpdateInputEvent(): void {
            let that: CheckBoxInput = this;
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
        protected updateValue(value: boolean): void {
            this.htmlElement["checked"] = value;
        }
    }

}
