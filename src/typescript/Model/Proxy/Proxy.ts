/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../Container/Container.ts" />

/**
 * Module that contains proxy classes.
 *
 * @module Ompluscript.Model.Proxy
 */
module Ompluscript.Model.Proxy {
    "use strict";

    import Container = Ompluscript.Model.Container.Container;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Abstract class that contains basic functionality for Proxy.
     *
     * @class Proxy
     */
    export abstract class Proxy implements IBase {

        /**
         * @type {string} name Name of the proxy
         */
        protected name: string;

        /**
         * @type {Container} container Container for which proxy refers
         */
        protected container: Container;

        /**
         * Class constructor
         *
         * Sets name of proxy and container.
         *
         * @param {string} name Name of proxy
         * @param {Container} container Container for which proxy refers
         * @constructs
         */
        constructor(name: string) {
            this.name = name;
        }

        /**
         * Method that sets container for proxy
         * 
         * @param {Container} container
         */
        public setContainer(container: Container): void {
            this.container = container;
        }
        
        /**
         * Method that returns name of proxy.
         *
         * @returns {string} Name of proxy
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {
                type: this.name,
            };
            return trace;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            return undefined;
        }

        /**
         * Method that should perform save request of proxy
         */
        public abstract save(): void;

        /**
         * Method that should perform update request of proxy
         */
        public abstract update(): void;

        /**
         * Method that should perform delete request of proxy
         */
        public abstract delete(): void;

        /**
         * Method that should perform query request of proxy
         *
         * @param {Object} query Contains parameters for request
         */
        public abstract select(query?: Object): void;

        /**
         * Method that finalize request after receiving answer from proxy
         *
         * @param {string} action
         * @param {Object} response
         */
        protected finish(action: string, response: Object): void {
            this.container.doneProxy(action, response);
        }

    }
}
