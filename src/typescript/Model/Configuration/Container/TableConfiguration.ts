/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="../../Container/Table.ts" />
/// <reference path="../../Attribute/Attribute.ts" />
/// <reference path="../../Proxy/Proxy.ts" />

/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.Model.Configuration.Container
 */
module Ompluscript.Model.Configuration.Container {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Table = Ompluscript.Model.Container.Table;
    import Container = Ompluscript.Model.Container.Container;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Proxy = Ompluscript.Model.Proxy.Proxy;

    /**
     * Class that contains functionality for model configuration.
     *
     * @class TableConfiguration
     */
    export class TableConfiguration extends ContainerConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Table.TYPE_TABLE;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            return this.filterErrors(super.getErrors(definition));
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let attributes: Attribute<any>[] = <Attribute<any>[]>super.createChildren(definition, Container.PARAMETER_ATTRIBUTES);
            let proxies: Proxy[] = <Proxy[]>super.createChildren(definition, Container.PARAMETER_PROXIES);
            return new Table(name, attributes, proxies);
        }
    }
}
