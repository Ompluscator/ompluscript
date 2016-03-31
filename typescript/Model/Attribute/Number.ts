/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    export class Number extends AbstractAttribute<number> {

        private minimum: number;
        private maximum: number;

        constructor(name: string, value: number = undefined, required: boolean = false,
                    minimum: number = undefined, maximum: number = undefined) {
            super(name, value, required);
            this.minimum = minimum;
            this.maximum = maximum;
        }

        public getMinimum(): number {
            return this.minimum;
        }

        public getMaximum(): number {
            return this.maximum;
        }

        public validate(): void {
            if ((this.required === true && this.value === undefined) || typeof this.value !== "number") {
                throw new TypeError("Attribute " + this.name + " is not a number.");
            } else if (this.value !== undefined && this.minimum !== undefined && this.value < this.minimum) {
                throw new RangeError("Attribute " + this.name + " is less than minimum allowed number.");
            } else if (this.value !== undefined && this.maximum !== undefined && this.value > this.maximum) {
                throw new RangeError("Attribute " + this.name + " is greater than maximum allowed number.");
            }
        }

        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["minimum"] = this.minimum;
            trace["maximum"] = this.maximum;
            return trace;
        }

    }

}
