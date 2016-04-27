/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="AttributeEvent.ts" />

module Ompluscript.Model.Event {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class OnUpdateChoices extends AttributeEvent {
        
        protected oldChoices: number[];
        
        protected newChoices: number[];
        
        constructor(sender: IBase, oldChoices: number[], newChoices: number[]) {
            super(sender, AttributeEvent.ON_UPDATE_CHOICES);
            this.oldChoices = oldChoices;
            this.newChoices = newChoices;
        }
        
        public getOldChoices(): number[] {
            return this.oldChoices;
        }
        
        public getNewChoices(): number[] {
            return this.newChoices;
        }
        
    }

}
