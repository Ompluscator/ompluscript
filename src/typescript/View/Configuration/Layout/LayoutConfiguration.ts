/// <reference path="../Component/ComponentConfiguration.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Layout
 */
module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
    import Configuration = Ompluscript.Core.Configuration.Configuration;

    /**
     * Abstract class that contains functionality for layout configuration.
     *
     * @class LayoutConfiguration
     */
    export abstract class LayoutConfiguration extends ComponentConfiguration {

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
        public getErrors(definition: Object): string[] {
            definition[Configuration.PARAMETER_NAME] = definition[Configuration.PARAMETER_TYPE];
            return this.filterErrors(super.getErrors(definition));
        }
    }
}
