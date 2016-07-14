/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />
/// <reference path="../../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="../Attribute/BooleanConfiguration.ts" />
/// <reference path="../Attribute/DatetimeConfiguration.ts" />
/// <reference path="../Attribute/MultipleChoiceConfiguration.ts" />
/// <reference path="../Attribute/NumberConfiguration.ts" />
/// <reference path="../Attribute/SingleChoiceConfiguration.ts" />
/// <reference path="../Attribute/StringConfiguration.ts" />
/// <reference path="../Proxy/AjaxProxyConfiguration.ts" />
/// <reference path="../Proxy/LocalStorageProxyConfiguration.ts" />
/// <reference path="../Proxy/SessionStorageProxyConfiguration.ts" />

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
    import BooleanConfiguration = Ompluscript.Model.Configuration.Attribute.BooleanConfiguration;
    import DatetimeConfiguration = Ompluscript.Model.Configuration.Attribute.DatetimeConfiguration;
    import MultipleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.MultipleChoiceConfiguration;
    import NumberConfiguration = Ompluscript.Model.Configuration.Attribute.NumberConfiguration;
    import SingleChoiceConfiguration = Ompluscript.Model.Configuration.Attribute.SingleChoiceConfiguration;
    import StringConfiguration = Ompluscript.Model.Configuration.Attribute.StringConfiguration;
    import AjaxProxyConfiguration = Ompluscript.Model.Configuration.Proxy.AjaxProxyConfiguration;
    import SessionStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.SessionStorageProxyConfiguration;
    import LocalStorageProxyConfiguration = Ompluscript.Model.Configuration.Proxy.LocalStorageProxyConfiguration;

    /**
     * Class that contains functionality for container configuration.
     *
     * @class ContainerConfiguration
     */
    export abstract class ContainerConfiguration extends GroupConfiguration {

        /**
         * Class constructor
         * 
         * Sets up configuration for child elements and
         * calls constructor of superclass.
         * 
         * @constructs
         */
        constructor() {
            let definition: Configuration[] = [
                Configuration.getInstance(BooleanConfiguration),
                Configuration.getInstance(DatetimeConfiguration),
                Configuration.getInstance(MultipleChoiceConfiguration),
                Configuration.getInstance(NumberConfiguration),
                Configuration.getInstance(SingleChoiceConfiguration),
                Configuration.getInstance(StringConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let proxies: Configuration[] = [
                Configuration.getInstance(AjaxProxyConfiguration),
                Configuration.getInstance(SessionStorageProxyConfiguration),
                Configuration.getInstance(LocalStorageProxyConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_DEFINITION] = definition;
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
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_DEFINITION));
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_PROXIES));
            if (definition.hasOwnProperty(Container.PARAMETER_DEFINITION)) {
                errors.push.apply(errors, super.getErrors(definition, Container.PARAMETER_DEFINITION));
            }
            if (definition.hasOwnProperty(Container.PARAMETER_PROXIES)) {
                errors.push.apply(errors, super.getErrors(definition, Container.PARAMETER_PROXIES));
            }
            return this.filterErrors(errors);
        }
    }
}
