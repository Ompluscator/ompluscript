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
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines password input
     *
     * @class PasswordInput
     */
    export class PasswordInput extends TextInput {

        /**
         * @type {string} TYPE_PASSWORD_INPUT Type of password input
         */
        public static TYPE_PASSWORD_INPUT: string = "PasswordInput";

        /**
         * @type {string} INPUT_PASSWORD Type of password input HTML element
         */
        public static INPUT_PASSWORD: string = "password";

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
            super(name, stringAttribute, placeholder, styles, PasswordInput.INPUT_PASSWORD);
        }

        /**
         * Method that should be called when class object should be cloned.
         */
        public clone(): IBase {
            return new PasswordInput(this.name, <String>this.attribute, this.placeholder, this.styles);
        }
    }

}
