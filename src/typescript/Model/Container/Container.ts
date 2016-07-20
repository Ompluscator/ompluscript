/// <reference path="../../Core/Observer/Observable.ts" />
/// <reference path="../Event/OnDoneProxy.ts" />
/// <reference path="../Proxy/Proxy.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Observable = Ompluscript.Core.Observer.Observable;
    import OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
    import Proxy = Ompluscript.Model.Proxy.Proxy;

    /**
     * Class that contains functionality for Container.
     *
     * @class Container
     */
    export abstract class Container extends Observable {

        /**
         * @type {string} PARAMETER_ATTRIBUTES Attributes parameter name.
         */
        public static PARAMETER_ATTRIBUTES: string = "attributes";

        /**
         * @type {string} PARAMETER_PROXIES Proxies parameter name.
         */
        public static PARAMETER_PROXIES: string = "proxies";

        /**
         * @type {string} name Defines name of model.
         */
        protected name: string;

        /**
         * @type {Object} proxies List of all proxies inside container.
         */
        protected proxies: Object;

        /**
         * Class constructor
         * 
         * Sets name of container and definition for attributes.
         * 
         * @param {string} name Name of model
         * @param {Object[]} proxies Definitions for all proxies
         * @constructs
         */
        constructor(name: string, proxies: Proxy[] = undefined) {
            super();
            this.name = name;
            this.proxies = {};
            if (Array.isArray(proxies)) {
                for (let i: number = 0; i < proxies.length; i++) {
                    proxies[i].setContainer(this);
                    this.proxies[proxies[i].getName()] = proxies[i];
                }
            }
        }

        /**
         * Method that returns name of model.
         *
         * @returns {string} Name of model
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns if there is desired proxy
         *
         * @param {string} type
         * @returns {Proxy}
         */
        public hasProxy(type: string): boolean {
            return this.proxies.hasOwnProperty(type);
        }

        /**
         * Method that returns desired proxy
         * 
         * @param {string} type
         * @returns {Proxy}
         */
        public getProxy(type: string): Proxy {
            if (this.hasProxy(type)) {
                return this.proxies[type];
            }
            return undefined;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {
                name: this.name,
                proxies: [],
            };
            for (let key in this.proxies) {
                if (this.proxies.hasOwnProperty(key)) {
                    trace["proxies"].push(this.proxies[key].getStackTrace());
                }
            }
            return trace;
        }

        /**
         * Method that is when proxy is done
         *
         * @param {string} action Proxy action that was performed
         * @param {Object} response Result from proxy
         */
        public doneProxy(action: string, response: Object): void {
            if (action === OnDoneProxy.TYPE_SELECTED) {
                this.setValues(response);
            }
            this.fireOnDoneProxyEvent(action, response);
        }

        /**
         * Method that validates values of container.
         *
         * @returns {boolean} Result of validation
         */
        public abstract validate(): boolean;

        /**
         * Method that should be called before removing reference from object.
         */
        public abstract dispose(): void;

        /**
         * Method that sets values into container.
         * 
         * @param {Object} values
         */
        public abstract setValues(values: Object): void;

        /**
         * Method that returns values from container.
         * 
         * @returns {Object}
         */
        public abstract getValues(): Object;

        /**
         * Method that reset values in container.
         */
        public abstract resetValues(): void;

        /**
         * Method that fires event when proxy is done
         *
         * @param {string} action Proxy action that was performed
         * @param {Object} response Result from proxy
         */
        protected fireOnDoneProxyEvent(action: string, response: Object): void {
            let event: OnDoneProxy = new OnDoneProxy(this, action, response);
            this.notifyObservers(event);
        }
    }
}


