/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="ApplicationControllerEvent.ts" />

/**
 * Module that contains controller's events
 * 
 * @module Ompluscript.Controller.Event
 */
module Ompluscript.Controller.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines event when component has been loaded
     * 
     * @class OnComponentLoad
     */
    export class OnComponentLoad extends ApplicationControllerEvent {

        /**
         * @type {string} component Name of component
         */
        private component: string;
        
        /**
         * Class constructor
         *
         * Calls superclass' constructor
         *
         * @param {IBase} sender Object that fired event
         * @param {string} component Name of component
         * @constructs
         */
        constructor(sender: IBase, component: string) {
            super(sender, ApplicationControllerEvent.ON_COMPONENT_LOAD);
            this.component = component;
        }

        /**
         * Method that returns name of component
         * 
         * @returns {string} Name of component
         */
        public getComponent(): string {
            return this.component;
        }
    }
}
