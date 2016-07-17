/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="LayoutConfiguration.ts" />
/// <reference path="../../Layout/LinearLayout.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Layout
 */
module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import LinearLayout = Ompluscript.View.Layout.LinearLayout;

    /**
     * Class that contains functionality for linear layout configuration.
     *
     * @class LinearLayoutConfiguration
     */
    export class LinearLayoutConfiguration extends LayoutConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === LinearLayout.TYPE_LINEAR_LAYOUT;
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            let error: string = this.shouldBeString(definition, LinearLayout.PARAMETER_DIRECTION);
            if (error === undefined) {
                if (definition[LinearLayout.PARAMETER_DIRECTION]) {
                    let values: string[] = [LinearLayout.DIRECTION_VERTICAL, LinearLayout.DIRECTION_HORIZONTAL];
                    errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_DIRECTION, values));
                }
            } else {
                errors.push(error);
            }
            error = this.shouldBeString(definition, LinearLayout.PARAMETER_ALIGN);
            if (error === undefined) {
                if (definition[LinearLayout.PARAMETER_ALIGN]) {
                    let values: string[] = [LinearLayout.ALIGN_START, LinearLayout.ALIGN_CENTER, LinearLayout.ALIGN_END];
                    errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_ALIGN, values));
                }
            } else {
                errors.push(error);
            }
            errors.push(this.shouldBeBoolean(definition, LinearLayout.PARAMETER_REVERSE));
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @param {String} attribute Instance of binding attribute
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let direction: string = definition[LinearLayout.PARAMETER_DIRECTION];
            let reverse: boolean = definition[LinearLayout.PARAMETER_REVERSE];
            let align: string = definition[LinearLayout.PARAMETER_ALIGN];
            return new LinearLayout(direction, reverse, align);
        }
    }
}
