/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

/**
 * Module that contains model's events
 * 
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Event = Ompluscript.Core.Observer.Event;

    export class OnDoneProxyEvent extends Event {

        public static ON_DONE_PROXY: string = "onDoneProxy";

        public static TYPE_SAVED: string = "saved";

        public static TYPE_UPDATED: string = "updated";

        public static TYPE_DELETED: string = "deleted";

        public static TYPE_SELECTED: string = "selected";

        public static TYPE_FAILED: string = "failed";

        public action: string;

        public response: Object;

        constructor(sender: IBase, action: string, response: Object) {
            super(sender, OnDoneProxyEvent.ON_DONE_PROXY);
            this.action = action;
            this.response = response;
        }
        
        public getAction(): string {
            return this.action;
        }
        
        public getResult(): Object {
            return this.response;
        }
    }

}
