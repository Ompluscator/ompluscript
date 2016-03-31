/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    export class String extends AbstractAttribute<string> {

        private minimumLength: number;
        private maximumLength: number;

        constructor(name: string, value: string = undefined, required: boolean = false, 
                    minimumLength: number = undefined, maximumLength: number = undefined) {
            super(name, value, required);
            this.minimumLength = minimumLength;
            this.maximumLength = maximumLength;
        }
        
        public getMinimumLength(): number {
            return this.minimumLength;
        }
        
        public getMaximumLength(): number {
            return this.maximumLength;
        }

        public validate(): void {
            if ((this.required === true && this.value === undefined) || typeof this.value !== "string") {
                throw new TypeError("Attribute " + this.name + " is not a string.");
            } else if (this.value !== undefined && this.minimumLength !== undefined && this.value.length < this.minimumLength) {
                throw new RangeError("Attribute " + this.name + " is string with less length than minimum allowed.");
            } else if (this.value !== undefined && this.maximumLength !== undefined && this.value.length > this.maximumLength) {
                throw new RangeError("Attribute " + this.name + " is string with greater length than maximum allowed.");
            }
        }

        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["minimumLength"] = this.minimumLength;
            trace["maximumLength"] = this.maximumLength;
            return trace;
        }

    }

}
