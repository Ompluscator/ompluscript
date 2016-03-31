/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    export class Boolean extends AbstractAttribute<boolean> {

        public validate(): void {
            if ((this.required === true && this.value === undefined) || typeof this.value !== "boolean") {
                throw new TypeError("Attribute " + this.name + " is not a boolean.");
            }
        }

    }

}
