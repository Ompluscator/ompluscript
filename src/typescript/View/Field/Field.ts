/// <reference path="../Component/Component.ts" />
/// <reference path="../../Model/Container/Translation.ts" />
/// <reference path="../../Model/Creator.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";
    
    import Component = Ompluscript.View.Component.Component;
    import Translation = Ompluscript.Model.Container.Translation;
    import Creator = Ompluscript.Model.Creator;

    /**
     * Class that defines basic field
     *
     * @class Field
     */
    export abstract class Field extends Component {

        /**
         * @type {Translation} translation Instance of translation
         */
        protected translation: Translation;

        /**
         * Class constructor.
         * 
         * Sets translation instance and calls constructor of superclass.
         * 
         * @param {string} name Name of component
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, styles: Object = {}) {
            super(name, styles);
            this.translation = Creator.getInstance().getTranslation();
        }

        /**
         * Method that returns HTML content of component
         * 
         * @returns {HTMLElement} HTML content of component
         */
        public render(): HTMLElement {
            return this.htmlElement;
        }

        /**
         * Method that determines if component contains translated content.
         */
        public abstract isTranslated(): boolean;
    }

}
