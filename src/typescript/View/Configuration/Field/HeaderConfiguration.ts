/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="TextContentConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/TextContent.ts" />
/// <reference path="../../Field/Header.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import TextContent = Ompluscript.View.Field.TextContent;
    import Header = Ompluscript.View.Field.Header;

    /**
     * Class that contains functionality for header configuration.
     *
     * @class HeaderConfiguration
     */
    export class HeaderConfiguration extends TextContentConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Header.TYPE_HEADER;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeString(definition, Header.PARAMETER_LEVEL));
            if (typeof definition[Header.PARAMETER_LEVEL] === "string") {
                let values: string[] = [
                    Header.LEVEL_FIRST,
                    Header.LEVEL_SECOND,
                    Header.LEVEL_THIRD,
                    Header.LEVEL_FOURTH,
                    Header.LEVEL_FIFTH,
                    Header.LEVEL_SIXTH,
                ];
                errors.push(this.mustBeValue(definition, Header.PARAMETER_LEVEL, values));
            }
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
            let name: string = definition[Configuration.PARAMETER_NAME];
            let text: string = definition[TextContent.PARAMETER_TEXT];
            let level: string = definition[Header.PARAMETER_LEVEL];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            let header: Header = new Header(name, text, level, styles);
            this.attachEvents(definition, header);
            return header;
        }
    }
}
