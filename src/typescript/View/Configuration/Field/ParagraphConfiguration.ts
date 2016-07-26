/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="TextContentConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/TextContent.ts" />
/// <reference path="../../Field/Paragraph.ts" />

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
    import Paragraph = Ompluscript.View.Field.Paragraph;
    import TextContent = Ompluscript.View.Field.TextContent;

    /**
     * Class that contains functionality for paragraph configuration.
     *
     * @class ParagraphConfiguration
     */
    export class ParagraphConfiguration extends TextContentConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Paragraph.TYPE_PARAGRAPH;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            return this.filterErrors(super.getErrors(definition));
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let text: string = definition[TextContent.PARAMETER_TEXT];
            let styles: Object = definition[Component.PARAMETER_STYLES];
            let paragraph: Paragraph = new Paragraph(name, text, styles);
            this.attachEvents(definition, paragraph);
            return paragraph;
        }
    }
}
