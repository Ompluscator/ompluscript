/// <reference path="../../Core/IBase.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.IBase;

    export abstract class AbstractAttribute<T> implements IBase {
        
        public static ERROR_WRONG_TYPE: string = "101";
        public static ERROR_IS_REQUIRED: string = "102";
        
        protected name: string;
        protected value: T;
        protected required: boolean;
        
        constructor(name: string, value: T = undefined, required: boolean = false) {
            this.name = name;
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
        
        public getName(): string {
            return this.name;
        }
        
        public isRequired(): boolean {
            return this.required;
        }
        
        public abstract validate(): void;
        
        public getStackTrace(): Object {
            let trace: Object = {
                name: this.name,
                required: this.required,
                value: this.value,
            };
            return trace;
        }

    }

}
