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
    export class TextInput extends Input {

        public static EVENT_KEY_PRESS: string = "keypress";

        constructor(name: string, stringAttribute: String = undefined, type: string = Input.INPUT_TEXT, styles: Object = {}) {
            super(name, stringAttribute, type, styles);
        }

        public getValue(): string {
            let value: string = this.getAttribute(Input.ATTRIBUTE_VALUE);
            if (typeof value === "string") {
                return value;
            }
            return undefined;
        }

        protected addOnUpdateInputEvent(): void {
            let that: TextInput = this;
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getValue());
            };
            that.htmlElement.addEventListener(TextInput.EVENT_KEY_PRESS, listener, false);
        }

        protected updateValue(value: any): void {
            this.setAttribute(Input.ATTRIBUTE_VALUE, value);
        }
    }

}
