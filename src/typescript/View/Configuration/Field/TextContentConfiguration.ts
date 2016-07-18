/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Field/TextContent.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
    import TextContent = Ompluscript.View.Field.TextContent;

    /**
     * Abstract class that contains functionality for text content configuration.
     *
     * @class TextContentConfiguration
     */
    export abstract class TextContentConfiguration extends ComponentConfiguration {


        /**
         * Class constructor.
         * 
         * Calls constructor of superclass.
         * 
         * @constructs
         */
        constructor() {
            super(undefined);
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeString(definition, TextContent.PARAMETER_TEXT));
            return this.filterErrors(errors);
        }
    }
}
