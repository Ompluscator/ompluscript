/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/Event.ts" />

module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Event = Ompluscript.Core.Observer.Event;

    export abstract class AttributeEvent extends Event {

        public static ON_UPDATE_ATTRIBUTE: string = "onUpdateAttribute";

        public static ON_INVALID_ATTRIBUTE: string = "onInvalidAttribute";

        public static ON_UPDATE_CHOICES: string = "onUpdateChoices";

        constructor(sender: IBase, type: string) {
            super(sender, type);
        }

    }

}
