/// <reference path="../../core/IBase.ts" />

module Ompluscript.Model.Attribute {
    "use strict";

    import IBase = Ompluscript.Core.IBase;

    export abstract class AbstractAttribute<T> implements IBase {
        
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
