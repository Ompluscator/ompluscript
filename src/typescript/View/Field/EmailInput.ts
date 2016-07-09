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
    export abstract class EmailInput extends TextInput {

        constructor(name: string, stringAttribute: String = undefined, styles: Object = {}) {
            super(name, stringAttribute, Input.INPUT_EMAIL, styles);
        }
    }

}
