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
    export abstract class PasswordInput extends TextInput {

        constructor(name: string, stringAttribute: String = undefined) {
            super(name, stringAttribute, Input.INPUT_PASSWORD);
        }
    }

}
