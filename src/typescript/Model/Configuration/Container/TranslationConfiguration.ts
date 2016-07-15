/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="../Proxy/AjaxProxyConfiguration.ts" />
/// <reference path="../Proxy/LocalStorageProxyConfiguration.ts" />
/// <reference path="../Proxy/SessionStorageProxyConfiguration.ts" />
/// <reference path="../../Container/Translation.ts" />
/// <reference path="../../Proxy/Proxy.ts" />

/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Container
 */
module Ompluscript.Model.Configuration.Container {
    "use strict";
    
    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import GroupConfiguration = Ompluscript.Core.Configuration.GroupConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
    import SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
    import LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;
    import Translation = Ompluscript.Model.Container.Translation;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Proxy = Ompluscript.Model.Proxy.Proxy;

    /**
     * Class that contains functionality for translation configuration.
     *
     * @class TranslationConfiguration
     */
    export class TranslationConfiguration extends GroupConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Translation.TYPE_TRANSLATION;
        }

        /**
         * Class constructor
         * 
         * Sets up configuration for child elements and
         * calls constructor of superclass.
         * 
         * @constructs
         */
        constructor() {
            let proxies: Configuration[] = [
                Configuration.getInstance(AjaxProxyConfiguration),
                Configuration.getInstance(SessionStorageProxyConfiguration),
                Configuration.getInstance(LocalStorageProxyConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_PROXIES] = proxies;
            super(configurations);
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
            if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                errors.push.apply(errors, super.getErrorsForChildren(definition, Container.PARAMETER_PROXIES));
            }
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let proxies: Proxy[] = <Proxy[]>super.createChildren(definition, Container.PARAMETER_PROXIES);
            return new Translation(proxies);
        }
    }
}
