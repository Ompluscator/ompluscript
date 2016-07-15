/// <reference path="TextInput.ts" />
/// <reference path="../../Model/Attribute/String.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import String = Ompluscript.Model.Attribute.String;

    /**
     * Class that defines email input
     *
     * @class EmailInput
     */
    export class EmailInput extends TextInput {

        /**
         * @type {string} TYPE_EMAIL_INPUT Type of email input
         */
        public static TYPE_EMAIL_INPUT: string = EmailInput["name"];

        /**
         * @type {string} INPUT_EMAIL Type of email input HTML element
         */
        public static INPUT_EMAIL: string = "email";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {String} stringAttribute Attribute for binding with
         * @param {string} placeholder Placeholder asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, stringAttribute: String = undefined, placeholder: string = undefined, styles: Object = {}) {
            super(name, stringAttribute, placeholder, styles, EmailInput.INPUT_EMAIL);
        }
    }

}
