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
     * Class that defines password input
     *
     * @class TextInput
     */
    export class PasswordInput extends TextInput {

        public static TYPE_PASSWORD_INPUT: string = PasswordInput["name"];

        public static INPUT_PASSWORD: string = "password";

        constructor(name: string, stringAttribute: String = undefined, styles: Object = {}) {
            super(name, stringAttribute, styles, PasswordInput.INPUT_PASSWORD);
        }
    }

}
