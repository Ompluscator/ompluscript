/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="ProxyConfiguration.ts" />
/// <reference path="../../Proxy/LocalStorageProxy.ts" />
/// <reference path="../../Container/Container.ts" />

/**
 * Module that contains proxies' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Proxy
 */
module Ompluscript.Model.Configuration.Proxy {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Container = Ompluscript.Model.Container.Container;
    import LocalStorageProxy = Ompluscript.Model.Proxy.LocalStorageProxy;

    /**
     * Class that contains functionality for local storage proxy configuration.
     *
     * @class LocalStorageProxyConfiguration
     */
    export class LocalStorageProxyConfiguration extends ProxyConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === LocalStorageProxy.TYPE_LOCAL_STORAGE_PROXY;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            return [];
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {Container} container Container for which proxy is related to
         * @returns {IBase} New instance
         */
        public create(definition: Object, container: Container = undefined): IBase {
            return new LocalStorageProxy(container);
        }
    }
}
