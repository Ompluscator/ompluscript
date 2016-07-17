/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/Page.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../Layout/Layout.ts" />
/// <reference path="ContainerConfiguration.ts" />
/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Page = Ompluscript.View.Container.Page;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Container.Container;
    import Layout = Ompluscript.View.Layout.Layout;

    /**
     * Class that contains functionality for page configuration.
     *
     * @class PageConfiguration
     */
    export class PageConfiguration extends ContainerConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Page.TYPE_PAGE;
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
         * @param {Component[]} children List of children
         * @returns {IBase} New instance
         */
        public create(definition: Object, children: Component[] = undefined): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let layout: Layout = <Layout>super.createChild(definition, Container.PARAMETER_LAYOUT);
            if (children === undefined) {
                children = <Component[]>super.createChildren(
                    definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance()
                );
            }
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new Page(name, layout, children, styles);
        }
    }
}
