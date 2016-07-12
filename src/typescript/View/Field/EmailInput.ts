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
     * @class TextInput
     */
    export class EmailInput extends TextInput {

        public static TYPE_EMAIL_INPUT: string = EmailInput["name"];

        public static INPUT_EMAIL: string = "email";

        constructor(name: string, stringAttribute: String = undefined, styles: Object = {}) {
            super(name, stringAttribute, styles, EmailInput.INPUT_EMAIL);
        }
    }

}
