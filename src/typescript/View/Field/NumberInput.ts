/// <reference path="Input.ts" />
/// <reference path="../../Model/Attribute/String.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    import Number = Ompluscript.Model.Attribute.Number;

    /**
     * Class that defines number input
     *
     * @class NumberInput
     */
    export class NumberInput extends Input {

        public static EVENT_KEY_PRESS: string = "keypress";

        constructor(name: string, numberAttribute: Number = undefined, type: string = Input.INPUT_TEXT, styles: Object = {}) {
            super(name, numberAttribute, type, styles);
        }

        public getValue(): any {
            let value: string = this.getAttribute(Input.ATTRIBUTE_VALUE);
            if (typeof value === "string") {
                if (isNaN(parseInt(value, 10))) {
                    return value;
                }
                return parseInt(value, 10);
            }
            return undefined;
        }

        protected addOnUpdateInputEvent(): void {
            let that: NumberInput = this;
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getValue());
            };
            that.htmlElement.addEventListener(TextInput.EVENT_KEY_PRESS, listener, false);
        }

        protected updateValue(value: number): void {
            this.setAttribute(Input.ATTRIBUTE_VALUE, value.toString());
        }
    }

}
