/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="AttributeEvent.ts" />

module Ompluscript.Model.Event {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class OnUpdateAttribute extends AttributeEvent {
        
        protected oldValue: any;
        
        protected newValue: any;
        
        constructor(sender: IBase, oldValue: any, newValue: any) {
            super(sender, AttributeEvent.ON_UPDATE_ATTRIBUTE);
            this.oldValue = oldValue;
            this.newValue = newValue;
        }
        
        public getOldValue(): any {
            return this.oldValue;
        }
        
        public getNewValue(): any {
            return this.newValue;
        }
        
    }

}
