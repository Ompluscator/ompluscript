/// <reference path="Input.ts" />
/// <reference path="../../Model/Attribute/Boolean.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    import Boolean = Ompluscript.Model.Attribute.Boolean;

    /**
     * Class that defines text input
     *
     * @class TextInput
     */
    export class CheckBoxInput extends Input {

        public static EVENT_CHANGE: string = "change";

        constructor(name: string, booleanAttribute: Boolean = undefined, type: string = Input.INPUT_CHECK_BOX) {
            super(name, booleanAttribute, type);
        }

        public getValue(): boolean {
            return this.htmlElement["checked"];
        }

        protected addOnUpdateInputEvent(): void {
            let that: CheckBoxInput = this;
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getValue());
            };
            that.htmlElement.addEventListener(CheckBoxInput.EVENT_CHANGE, listener, false);
        }

        protected updateValue(value: boolean): void {
            this.htmlElement["checked"] = value;
        }
    }

}
