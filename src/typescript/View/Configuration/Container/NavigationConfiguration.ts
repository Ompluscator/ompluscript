/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/Navigation.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="ListConfiguration.ts" />

/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Navigation = Ompluscript.View.Container.Navigation;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Container.Container;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;

    /**
     * Class that contains functionality for list configuration.
     *
     * @class ListConfiguration
     */
    export class NavigationConfiguration extends ContainerConfiguration {

        /**
         * Class constructor.
         *
         * Creates configuration list for children and layouts.
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            let children: Object[] = [
                ListConfiguration,
                ErrorConfiguration,
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_CHILDREN] = children;
            super(configurations);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Navigation.TYPE_NAVIGATION;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
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
            if (children === undefined) {
                children = <Component[]>super.createChildren(
                    definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance()
                );
            }
            let styles: string = definition[Component.PARAMETER_STYLES];
            return new Navigation(children, styles);
        }
    }
}
