/// <reference path="../../Core/IBase.ts" />

module Ompluscript.Model.Attribute {

    import IBase = Ompluscript.Core.IBase;

    export abstract class AbstractAttribute<T> implements IBase {
        
        protected name: string;
        protected value: T;
        protected required: boolean;
        
        constructor(name: string, value: T, required: boolean) {
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
            let trace = {
                name: this.name,
                value: this.value,
                required: this. required
            };
            return trace;
        }

    }

}