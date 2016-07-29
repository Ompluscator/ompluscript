/// <reference path="Container.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Paragraph.ts" />
/// <reference path="../Field/Header.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";

    import Component = Ompluscript.View.Component.Component;
    import Header = Ompluscript.View.Field.Header;
    import Paragraph = Ompluscript.View.Field.Paragraph;

    /**
     * Class that defines wrong configuration container
     *
     * @class WrongConfigurationContainer
     */
    export class WrongConfigurationContainer extends Container {

        /**
         * @type {string} TYPE_WRONG_CONFIGURATION_CONTAINER Type of wrong configuration container
         */
        public static TYPE_WRONG_CONFIGURATION_CONTAINER: string = "WrongConfigurationContainer";

        /**
         * @type {string} CLASS_PAGE Class of HTML div element for page
         */
        public static CLASS_WRONG_CONFIGURATION_CONTAINER: string = "wrong-configuration";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {Object} error Configuration error
         * @constructs
         */
        constructor(error: Object) {
            let children: Component[] = [];
            let title: string = error[Ompluscript.Core.Configuration.Creator.PARAMETER_TYPE]
                + ": " + error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME];
            children.push(new Header(error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME], title, Header.LEVEL_FIRST));
            for (let i: number = 0; i < error[Ompluscript.Core.Configuration.Creator.PARAMETER_ERRORS].length; i++) {
                let description: string = error[Ompluscript.Core.Configuration.Creator.PARAMETER_ERRORS][i];
                children.push(new Paragraph(description, description));
            }
            let definition: string = "<pre>" +
                JSON.stringify(error[Ompluscript.Core.Configuration.Creator.PARAMETER_DEFINITION], undefined, 2)
                + "</pre>";
            children.push(new Paragraph(error[Ompluscript.Core.Configuration.Creator.PARAMETER_NAME], definition));
            super(WrongConfigurationContainer.TYPE_WRONG_CONFIGURATION_CONTAINER, undefined, children);
            this.addClass(WrongConfigurationContainer.CLASS_WRONG_CONFIGURATION_CONTAINER);
        }
    }
}
