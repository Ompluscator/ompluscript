/// <reference path="Input.ts" />
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
     * Class that defines text input
     *
     * @class TextInput
     */
    export abstract class TextInput extends Input {

        constructor(name: string, stringAttribute: String = undefined) {
            super(name, Input.INPUT_TEXT, stringAttribute);
        }
    }

}
