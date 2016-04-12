/// <reference path="../../Core/IBase.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.IBase;

    export class Unit<T> implements IBase {
        
        public static ERROR_WRONG_TYPE: string = "101";
        public static ERROR_IS_REQUIRED: string = "102";

        public static ERROR_BELOW_MINIMUM: string = "201";
        public static ERROR_OVER_MAXIMUM: string = "202";
        
        protected type: string;
        protected value: T;
        protected required: boolean;
        
        constructor(type: string, value: T = undefined, required: boolean = false) {
            this.type = type;
            this.value = value;
            this.required = required;
        }

        public setValue(value: T): void {
            this.value = value;
        }

        public getValue(): T {
            return this.value;
        }

        public resetValue(): void {
            this.value = undefined;
        }
        
        public isRequired(): boolean {
            return this.required;
        }
        
        public getStackTrace(): Object {
            let trace: Object = {
                required: this.required,
                type: this.type,
                value: this.value,
            };
            return trace;
        }

        public validate(): void {
            if (this.required === true && typeof this.value !== this.type) {
                throw new TypeError(Unit.ERROR_IS_REQUIRED);
            } else if (typeof this.value !== this.type && this.value !== undefined) {
                throw new TypeError(Unit.ERROR_WRONG_TYPE);
            }
        }

    }

}
