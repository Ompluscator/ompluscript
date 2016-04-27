/// <reference path="../Interfaces/IBase.ts" />

module Ompluscript.Core.Observer {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    export abstract class Event {
        
        protected sender: IBase;
        
        protected type: string;

        constructor(sender: IBase, type: string) {
            this.sender = sender;
            this.type = type;
        }
        
        public getSender(): IBase {
            return this.sender;
        }

        public getType(): string {
            return this.type;
        }
        
    }

}
