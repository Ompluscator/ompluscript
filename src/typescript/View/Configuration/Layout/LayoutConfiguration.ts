/// <reference path="../Component/ComponentConfiguration.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Layout
 */
module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;

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
    }
}
