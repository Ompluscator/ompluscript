/// <reference path="Input.ts" />
/// <reference path="TextInput.ts" />
/// <reference path="../../Model/Attribute/String.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    import Datetime = Ompluscript.Model.Attribute.Datetime;

    /**
     * Class that defines number input
     *
     * @class DateInput
     */
    export class DateInput extends TextInput {

        /**
         * @type {string} TYPE_DATE_INPUT Type of date input
         */
        public static TYPE_DATE_INPUT: string = DateInput["name"];

        /**
         * @type {string} INPUT_DATE Type of date input HTML element
         */
        public static INPUT_DATE: string = "date";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {Datetime} datetimeAttribute Attribute for binding with
         * @param {string} placeholder Placeholder asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, datetimeAttribute: Datetime = undefined, placeholder: string = undefined, styles: Object = {}) {
            super(name, datetimeAttribute, placeholder, styles, DateInput.INPUT_DATE);
        }

    }

}
