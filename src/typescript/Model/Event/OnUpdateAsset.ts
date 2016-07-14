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
     * Class that contains info for event when asset is updated
     *
     * @class OnUpdateAsset
     */
    export class OnUpdateAsset extends Event {

        /**
         * @type {string} ON_UPDATE_ASSET Defines event when asset is updated
         */
        public static ON_UPDATE_ASSET: string = "onUpdateAsset";

        /**
         * @type {any} oldValue Old value of asset
         */
        protected oldValue: string;

        /**
         * @type {any} newValue New value of asset
         */
        protected newValue: string;

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
        constructor(sender: IBase, oldValue: string, newValue: string) {
            super(sender, OnUpdateAsset.ON_UPDATE_ASSET);
            this.oldValue = oldValue;
            this.newValue = newValue;
        }

        /**
         * Method that returns old value of asset
         *
         * @return {any} Old value of asset
         */
        public getOldValue(): any {
            return this.oldValue;
        }

        /**
         * Method that returns new value of asset
         *
         * @return {any} New value of asset
         */
        public getNewValue(): any {
            return this.newValue;
        }
    }

}
