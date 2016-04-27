/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="AttributeEvent.ts" />

module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class OnInvalidAttribute extends AttributeEvent {
        
        protected value: any;

        protected validationCode: number;

        constructor(sender: IBase, value: any, validationCode: number) {
            super(sender, AttributeEvent.ON_INVALID_ATTRIBUTE);
            this.value = value;
            this.validationCode = validationCode;
        }

        public getValidationCode(): number {
            return this.validationCode;
        }
        
        public getValue(): any {
            return this.value;
        }

    }

}
