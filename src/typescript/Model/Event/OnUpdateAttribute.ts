/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="AttributeEvent.ts" />

/**
 * Module that contains model's events
 *
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";
    
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that contains info for event when attribute is updated
     *
     * @class OnUpdateAttribute
     */
    export class OnUpdateAttribute extends AttributeEvent {

        /**
         * @type {any} oldValue Old value of attribute
         */
        protected oldValue: any;

        /**
         * @type {any} newValue New value of attribute
         */
        protected newValue: any;

        /**
         * Class constructor
         *
         * Sets old and new value of attribute.
         * Calls superclass' constructor.
         *
         * @param {IBase} sender Object that fired event
         * @param {any} oldValue Old value of attribute
         * @param {any} newValue New value of attribute
         * @constructs
         */
        constructor(sender: IBase, oldValue: any, newValue: any) {
            super(sender, AttributeEvent.ON_UPDATE_ATTRIBUTE);
            this.oldValue = oldValue;
            this.newValue = newValue;
        }

        /**
         * Method that returns old value of attribute
         * 
         * @return {any} Old value of attribute
         */
        public getOldValue(): any {
            return this.oldValue;
        }

        /**
         * Method that returns new value of attribute
         *
         * @return {any} New value of attribute
         */
        public getNewValue(): any {
            return this.newValue;
        }
        
    }

}
