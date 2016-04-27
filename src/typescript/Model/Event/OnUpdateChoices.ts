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
     * Class that contains info for event when choices are updated
     *
     * @class OnUpdateChoices
     */
    export class OnUpdateChoices extends AttributeEvent {

        /**
         * @type {any} oldChoices Old choices of attribute
         */
        protected oldChoices: number[];

        /**
         * @type {any} newChoices New choices of attribute
         */
        protected newChoices: number[];

        /**
         * Class constructor
         *
         * Sets old and new choices of attribute.
         * Calls superclass' constructor.
         *
         * @param {IBase} sender Object that fired event
         * @param {any} oldChoices Old choices of attribute
         * @param {any} newChoices New choices of attribute
         * @constructs
         */
        constructor(sender: IBase, oldChoices: number[], newChoices: number[]) {
            super(sender, AttributeEvent.ON_UPDATE_CHOICES);
            this.oldChoices = oldChoices;
            this.newChoices = newChoices;
        }

        /**
         * Method that returns old choices of attribute
         * 
         * @return {number[]} Old choices of attribute
         */
        public getOldChoices(): number[] {
            return this.oldChoices;
        }

        /**
         * Method that returns new choices of attribute
         *
         * @return {number[]} New choices of attribute
         */
        public getNewChoices(): number[] {
            return this.newChoices;
        }
        
    }

}
