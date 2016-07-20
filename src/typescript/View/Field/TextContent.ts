/// <reference path="Field.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Model/Event/OnUpdateAsset.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;
    import OEvent = Ompluscript.Core.Observer.OEvent;

    /**
     * Class that defines basic text content element
     *
     * @class Text
     */
    export abstract class TextContent extends Field implements IObserver {

        /**
         * @type {string} PARAMETER_TEXT Name of text parameter
         */
        public static PARAMETER_TEXT: string = "text";

        /**
         * @type {string} text Text asset name
         */
        protected text: string;

        /**
         * @type {string} textContent Text asset value
         */
        protected textContent: string;

        /**
         * Class constructor.
         *
         * Sets translation instance and calls constructor of superclass.
         *
         * @param {string} name Name of component
         * @param {string} text Text asset name
         * @param {Object} styles Styles for component
         * @constructs
         */
        constructor(name: string, text: string, styles: Object = {}) {
            super(name, styles);
            this.text = text;
            this.attachToTranslation();
        }

        /**
         * Method that sets name of assets for translation and attach it
         * to translation container.
         *
         * @param {string} text Name of asset
         */
        public setTextAsset(text: string): void {
            this.detachFromTranslation();
            this.text = text;
            this.attachToTranslation();
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            if (event instanceof OnUpdateAsset && this.isTranslated()) {
                let onUpdateAsset: OnUpdateAsset = <OnUpdateAsset>event;
                this.updateText(onUpdateAsset.getNewValue());
            }
        }

        /**
         * Method that returns value for text HTML content
         *
         * @returns {string} value for text HTML content
         */
        public getTextContent(): string {
            if (this.textContent !== undefined) {
                return this.textContent;
            }
            return this.text;
        }

        /**
         * Method that determines if component contains translated content.
         *
         * @returns {boolean} if component contains translated content
         */
        public isTranslated(): boolean {
            return this.translation !== undefined && this.text !== undefined;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[TextContent.PARAMETER_TEXT] = this.text;
            return trace;
        }

        /**
         * Method that sets value for text HTML content
         *
         * @param {string} value for text HTML content
         */
        protected updateText(value: string): void {
            this.textContent = value;
            this.htmlElement.innerHTML = this.getTextContent();
        }

        /**
         * Method attach content to translation container.
         */
        public attachToTranslation(): void {
            if (this.isTranslated()) {
                this.translation.attachToAsset(this.text, this);
            }
        }

        /**
         * Method detach content from translation container.
         */
        public detachFromTranslation(): void {
            if (this.isTranslated()) {
                this.translation.detachFromAsset(this.text, this);
            }
        }
    }
}
