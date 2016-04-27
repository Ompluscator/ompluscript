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

    /**
     * Class that defines basic attribute event
     * 
     * @class AttributeEvent
     */
    export abstract class AttributeEvent extends Event {

        /**
         * @type {string} ON_UPDATE_ATTRIBUTE Defines event when attribute is updated
         */
        public static ON_UPDATE_ATTRIBUTE: string = "onUpdateAttribute";

        /**
         * @type {string} ON_INVALID_ATTRIBUTE Defines event when attribute is invalid
         */
        public static ON_INVALID_ATTRIBUTE: string = "onInvalidAttribute";

        /**
         * @type {string} ON_UPDATE_CHOICES Defines event when choices is updated
         */
        public static ON_UPDATE_CHOICES: string = "onUpdateChoices";

        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {string} type Type of event
         * @constructs
         */
        constructor(sender: IBase, type: string) {
            super(sender, type);
        }

    }

}
