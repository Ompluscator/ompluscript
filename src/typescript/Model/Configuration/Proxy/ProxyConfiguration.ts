/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
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

    /**
     * Abstract class that contains functionality for proxy configuration.
     *
     * @class ProxyConfiguration
     */
    export abstract class ProxyConfiguration extends Configuration {

        /**
         * Abstract method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {Container} container Container for which proxy is related to
         * @returns {IBase} New instance
         */
        public abstract create(definition: Object, container?: Container): IBase;
    }
}
