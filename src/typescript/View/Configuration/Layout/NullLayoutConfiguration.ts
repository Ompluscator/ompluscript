/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="LayoutConfiguration.ts" />
/// <reference path="../../Layout/NullLayout.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Layout
 */
module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import NullLayout = Ompluscript.View.Layout.NullLayout;

    /**
     * Class that contains functionality for null layout configuration.
     *
     * @class NullLayoutConfiguration
     */
    export class NullLayoutConfiguration extends LayoutConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === NullLayout.TYPE_NULL_LAYOUT;
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            return new NullLayout();
        }
    }
}
