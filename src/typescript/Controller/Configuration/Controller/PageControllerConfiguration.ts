/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="ControllerConfiguration.ts" />
/// <reference path="../../Controller/PageController.ts" />
/// <reference path="../../../View/Container/Page.ts" />

/**
 * Module that contains controller' configuration classes.
 *
 * @module Ompluscript.Controller.Configuration.Controller
 */
module Ompluscript.Controller.Configuration.Controller {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import PageController = Ompluscript.Controller.Controller.PageController;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Page = Ompluscript.View.Container.Page;

    /**
     * Class that contains functionality for application controller configuration.
     *
     * @class PageControllerConfiguration
     */
    export class PageControllerConfiguration extends ControllerConfiguration {

        /**
         * Class constructor
         *
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            super(undefined);
        }
        
        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === PageController.TYPE_PAGE_CONTROLLER;
        }
        
        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeStringOrObject(definition, PageController.PARAMETER_PAGE));
            errors.push(this.shouldBeObject(definition, PageController.PARAMETER_ACTIONS));
            if (definition[PageController.PARAMETER_ACTIONS] !== undefined) {
                for (let key in definition[PageController.PARAMETER_ACTIONS]) {
                    if (definition[PageController.PARAMETER_ACTIONS].hasOwnProperty(key)) {
                        errors.push(this.shouldBeFunction(
                            definition[PageController.PARAMETER_ACTIONS], key
                        ));
                    }
                }
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
            let name: string = definition[Configuration.PARAMETER_NAME];
            let page: Page = definition[PageController.PARAMETER_PAGE];
            let pageController: PageController = new PageController(name, page);
            if (definition[PageController.PARAMETER_ACTIONS] !== undefined) {
                for (let key in definition[PageController.PARAMETER_ACTIONS]) {
                    if (definition[PageController.PARAMETER_ACTIONS].hasOwnProperty(key)) {
                        pageController.addAction(key, definition[PageController.PARAMETER_ACTIONS][key]);
                    }
                }
            }
            return pageController;
        }
    }
}
