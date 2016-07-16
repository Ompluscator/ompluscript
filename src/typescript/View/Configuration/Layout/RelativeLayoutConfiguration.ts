/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="LayoutConfiguration.ts" />
/// <reference path="../../Layout/RelativeLayout.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Layout
 */
module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import RelativeLayout = Ompluscript.View.Layout.RelativeLayout;

    /**
     * Class that contains functionality for relative layout configuration.
     *
     * @class RelativeLayoutConfiguration
     */
    export class RelativeLayoutConfiguration extends LayoutConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === RelativeLayout.TYPE_RELATIVE_LAYOUT;
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            return new RelativeLayout();
        }
    }
}
