/// <reference path="../../Core/Observer/Observable.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Event/OnDoneProxyEvent.ts" />
/// <reference path="../Configuration/AjaxProxyConfiguration.ts" />
/// <reference path="../Configuration/LocalStorageProxyConfiguration.ts" />
/// <reference path="../Configuration/SessionStorageProxyConfiguration.ts" />
/// <reference path="../Configuration/ProxyConfiguration.ts" />
/// <reference path="../Proxy/Proxy.ts" />

/**
 * Module that contains container classes.
 *
 * @module Ompluscript.Model.Container
 */
module Ompluscript.Model.Container {
    "use strict";

    import Observable = Ompluscript.Core.Observer.Observable;
    import OnDoneProxyEvent = Ompluscript.Model.Event.OnDoneProxyEvent;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import AjaxProxyConfiguration = Ompluscript.Model.Configuration.AjaxProxyConfiguration;
    import SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.SessionStorageProxyConfiguration;
    import LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.LocalStorageProxyConfiguration;
    import Proxy = Ompluscript.Model.Proxy.Proxy;
    import ProxyConfiguration = Ompluscript.Model.Configuration.ProxyConfiguration;

    /**
     * Class that contains functionality for Container.
     *
     * @class Container
     */
    export abstract class Container extends Observable {

        /**
         * @type {string} PARAMETER_DEFINITION Definition parameter name.
         */
        public static PARAMETER_DEFINITION: string = "definition";

        /**
         * @type {string} PARAMETER_PROXIES Proxies parameter name.
         */
        public static PARAMETER_PROXIES: string = "proxies";

        /**
         * @type {string} name Defines name of model.
         */
        protected name: string;

        /**
         * @type {Object[]} definition Definition for all attributes.
         */
        protected definition: Object[];

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
         * @param {Object[]} definition Definition for all attributes
         * @param {Object[]} proxies Definitions for all proxies
         * @constructs
         */
        constructor(name: string, definition: Object[] = [], proxies: Object[] = undefined) {
            super();
            this.name = name;
            this.definition = definition;
            this.proxies = {};
            this.createProxies(proxies);
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
                definition: this.definition,
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
            if (action === OnDoneProxyEvent.TYPE_SELECTED) {
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
         * Method that fires event when proxy is done
         *
         * @param {string} action Proxy action that was performed
         * @param {Object} response Result from proxy
         */
        protected fireOnDoneProxyEvent(action: string, response: Object): void {
            let event: OnDoneProxyEvent = new OnDoneProxyEvent(this, action, response);
            this.notifyObservers(event);
        }

        /**
         * Method that creates proxies from defintion
         * 
         * @param {Object[]} proxies Definition for proxies
         */
        private createProxies(proxies: Object[] = undefined): void {
            if (proxies !== undefined) {
                let configurations: ProxyConfiguration[] = [
                    Configuration.getInstance(AjaxProxyConfiguration),
                    Configuration.getInstance(SessionStorageProxyConfiguration),
                    Configuration.getInstance(LocalStorageProxyConfiguration),
                ];
                for (let i: number = 0; i < proxies.length; i++) {
                    for (let j: number = 0; j < configurations.length; j++) {
                        if (configurations[j].isRelatedTo(proxies[i])) {
                            this.proxies[proxies[i][Configuration.PARAMETER_TYPE]] = <Proxy>configurations[j].create(proxies[i], this);
                            break;
                        }
                    }
                }
            }
        }

    }
}


