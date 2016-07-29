/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="TextContentConfiguration.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Field/TextContent.ts" />
/// <reference path="../../Field/Image.ts" />

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
    import Image = Ompluscript.View.Field.Image;
    import TextContent = Ompluscript.View.Field.TextContent;

    /**
     * Class that contains functionality for image configuration.
     *
     * @class ImageConfiguration
     */
    export class ImageConfiguration extends TextContentConfiguration {

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Image.TYPE_IMAGE;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.mustBeString(definition, Image.PARAMETER_SOURCE));
            return this.filterErrors(errors);
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
            let source: string = definition[Image.PARAMETER_SOURCE];
            let image: Image = new Image(name, source, text, styles);
            this.attachEvents(definition, image);
            return image;
        }
    }
}
