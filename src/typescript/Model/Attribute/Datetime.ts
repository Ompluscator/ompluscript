/// <reference path="Unit.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    export class Datetime extends Unit<string> {

        private minimum: Date;
        private maximum: Date;

        constructor(value: string = undefined, required: boolean = false,
                    minimum: string = undefined, maximum: string = undefined) {
            super("string", value, required);
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
                this.validate();
                if (this.value !== undefined) {
                    this.getDateObject();
                }
            } catch (ex) {
                throw new TypeError(Unit.ERROR_WRONG_TYPE);
            }
            if (this.value !== undefined && this.minimum !== undefined && this.getDateObject().getTime() < this.minimum.getTime()) {
                throw new RangeError(Unit.ERROR_BELOW_MINIMUM);
            } else if (this.value !== undefined && this.maximum !== undefined && this.getDateObject().getTime() > this.maximum.getTime()) {
                throw new RangeError(Unit.ERROR_OVER_MAXIMUM);
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
