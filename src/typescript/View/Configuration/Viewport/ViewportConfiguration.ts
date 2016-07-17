/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../Container/PageConfiguration.ts" />
/// <reference path="../../../Core/Configuration/ErrorConfiguration.ts" />
/// <reference path="../../Viewport/Viewport.ts" />
/// <reference path="../../Container/Page.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Viewport
 */
module Ompluscript.View.Configuration.Viewport {
    "use strict";
    
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import PageConfiguration = Ompluscript.View.Configuration.Container.PageConfiguration;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import Viewport = Ompluscript.View.Viewport.Viewport;
    import Page = Ompluscript.View.Container.Page;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Abstract class that contains functionality for layout configuration.
     *
     * @class ViewportConfiguration
     */
    export class ViewportConfiguration extends ComponentConfiguration {

        /**
         * Class constructor
         * 
         * Calls constructor of superclass.
         * 
         * @constructs
         */
        constructor() {
            let pages: Configuration[] = [
                Configuration.getInstance(PageConfiguration),
                Configuration.getInstance(ErrorConfiguration),
            ];
            let configurations: Object = {};
            configurations[Viewport.PARAMETER_PAGES] = pages;
            super(configurations);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Viewport.TYPE_VIEWPORT;
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public getErrors(definition: Object): string[] {
            definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeArray(definition, Viewport.PARAMETER_PAGES));
            if (Array.isArray(definition[Viewport.PARAMETER_PAGES])) {
                errors.push.apply(errors, super.getErrorsForChildren(
                    definition, Viewport.PARAMETER_PAGES, Ompluscript.View.Creator.getInstance())
                );
            }
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {Page[]} pages List of all pages
         * @returns {IBase} New instance
         */
        public create(definition: Object, pages: Page[] = undefined): IBase {
            if (pages === undefined) {
                pages = <Page[]> this.createChildren(
                    definition, Viewport.PARAMETER_PAGES, Ompluscript.View.Creator.getInstance()
                );
            }
            return new Viewport(pages);
        }
    }
}
