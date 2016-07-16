/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="LayoutConfiguration.ts" />
/// <reference path="../../Layout/TableLayout.ts" />

/**
 * Module that contains layouts' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Layout
 */
module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import TableLayout = Ompluscript.View.Layout.TableLayout;

    /**
     * Class that contains functionality for table layout configuration.
     *
     * @class TableLayoutConfiguration
     */
    export class TableLayoutConfiguration extends LayoutConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === TableLayout.TYPE_TABLE_LAYOUT;
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_ROWS));
            errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_CELLS));
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
            let rows: number = definition[TableLayout.PARAMETER_ROWS];
            let cells: number = definition[TableLayout.PARAMETER_CELLS];
            return new TableLayout(rows, cells);
        }
    }
}
