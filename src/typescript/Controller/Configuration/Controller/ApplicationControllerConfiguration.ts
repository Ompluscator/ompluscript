/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="ControllerConfiguration.ts" />
/// <reference path="../../Controller/ApplicationController.ts" />

/**
 * Module that contains controller' configuration classes.
 *
 * @module Ompluscript.Controller.Configuration.Controller
 */
module Ompluscript.Controller.Configuration.Controller {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import ApplicationController = Ompluscript.Controller.Controller.ApplicationController;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Controller = Ompluscript.Controller.Controller.Controller;

    /**
     * Class that contains functionality for application controller configuration.
     *
     * @class ApplicationControllerConfiguration
     */
    export class ApplicationControllerConfiguration extends ControllerConfiguration {

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
            return definition[Configuration.PARAMETER_TYPE] === ApplicationController.TYPE_APPLICATION_CONTROLLER;
        }
        
        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeArray(definition, ApplicationController.PARAMETER_COMPONENTS));
            if (definition[Controller.PARAMETER_EVENTS] !== undefined) {
                errors.push(this.shouldBeFunction(
                    definition[Controller.PARAMETER_EVENTS], ApplicationController.PARAMETER_ON_APPLICATION_START
                ));
                errors.push(this.shouldBeFunction(
                    definition[Controller.PARAMETER_EVENTS], ApplicationController.PARAMETER_ON_COMPONENT_LOAD
                ));
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
            let components: string[] = definition[ApplicationController.PARAMETER_COMPONENTS];
            let applicationController: ApplicationController = new ApplicationController(components);
            if (definition[Controller.PARAMETER_EVENTS] !== undefined) {
                let onApplicationStart: Function =
                    definition[Controller.PARAMETER_EVENTS][ApplicationController.PARAMETER_ON_APPLICATION_START];
                if (onApplicationStart !== undefined) {
                    applicationController.attachOnApplicationStartEvent(onApplicationStart);
                }
                let onComponentLoad: Function =
                    definition[Controller.PARAMETER_EVENTS][ApplicationController.PARAMETER_ON_COMPONENT_LOAD];
                if (onComponentLoad !== undefined) {
                    applicationController.attachOnComponentLoadEvent(onComponentLoad);
                }
            }
            return applicationController;
        }
    }
}
