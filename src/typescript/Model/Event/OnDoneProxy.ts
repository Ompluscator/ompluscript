/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />

/**
 * Module that contains model's events
 * 
 * @module Ompluscript.Model.Event
 */
module Ompluscript.Model.Event {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import OEvent = Ompluscript.Core.Observer.OEvent;

    /**
     * Class that contains info for event when proxy is done
     *
     * @class OnDoneProxy
     */
    export class OnDoneProxy extends OEvent {

        /**
         * @type {string} ON_DONE_PROXY Defines event when proxy is done
         */
        public static ON_DONE_PROXY: string = "onDoneProxy";

        /**
         * @type {string} TYPE_SAVED Defines result for save proxy
         */
        public static TYPE_SAVED: string = "saved";

        /**
         * @type {string} TYPE_UPDATED Defines result for update proxy
         */
        public static TYPE_UPDATED: string = "updated";

        /**
         * @type {string} TYPE_DELETED Defines result for delete proxy
         */
        public static TYPE_DELETED: string = "deleted";

        /**
         * @type {string} TYPE_SELECTED Defines result for select proxy
         */
        public static TYPE_SELECTED: string = "selected";

        /**
         *
         * @type {string} TYPE_FAILED Defines result for fail proxy
         */
        public static TYPE_FAILED: string = "failed";

        /**
         * @type {string} action Contains result action for proxy
         */
        public action: string;

        /**
         * @type {Object} response Contains response for proxy
         */
        public response: Object;

        /**
         * Class constructor.
         * 
         * Sets result action and response and calls constructor of superclass.
         * 
         * @param {IBase} sender Object that fired event
         * @param {string} action Contains result action for proxy
         * @param {response} response Contains response for proxy
         * @constructs
         */
        constructor(sender: IBase, action: string, response: Object) {
            super(sender, OnDoneProxy.ON_DONE_PROXY);
            this.action = action;
            this.response = response;
        }

        /**
         * Method that returns result action for proxy
         * 
         * @returns {string}
         */
        public getAction(): string {
            return this.action;
        }

        /**
         * Method that returns response for proxy
         * 
         * @returns {Object}
         */
        public getResponse(): Object {
            return this.response;
        }
    }
}
