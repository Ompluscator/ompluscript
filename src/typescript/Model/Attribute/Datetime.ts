/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    export class Datetime extends AbstractAttribute<string> {

        private minimum: Date;
        private maximum: Date;

        constructor(name: string, value: string = undefined, required: boolean = false,
                    minimum: string = undefined, maximum: string = undefined) {
            super(name, value, required);
            this.minimum = new Date(minimum);
            this.maximum = new Date(maximum);
        }
        
        public getDateObject(): Date {
            return new Date(this.value);
        }

        public getMinimum(): Date {
            return this.minimum;
        }

        public getMaximum(): Date {
            return this.maximum;
        }

        public validate(): void {
            try {
                if (this.required === true && this.value === undefined) {
                    throw new TypeError("Attribute " + this.name + " is not in right date format.");
                } else if (this.value !== undefined) {
                    this.getDateObject();
                }
            } catch (ex) {
                throw new TypeError("Attribute " + this.name + " is not in right date format.");
            }
            if (this.value !== undefined && this.minimum !== undefined && this.getDateObject().getTime() < this.minimum.getTime()) {
                throw new RangeError("Attribute " + this.name + " is date with less value than minimum allowed.");
            } else if (this.value !== undefined && this.maximum !== undefined && this.getDateObject().getTime() > this.maximum.getTime()) {
                throw new RangeError("Attribute " + this.name + " is date with greater value than maximum allowed.");
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
