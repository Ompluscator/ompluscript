/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../../Model/Container/Translation.ts" />
/// <reference path="../../Model/Creator.ts" />
/// <reference path="../Event/OnFieldClick.ts" />
/// <reference path="../Event/FieldEvent.ts" />

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
    import OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    import FieldEvent = Ompluscript.View.Event.FieldEvent;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OEvent = Ompluscript.Core.Observer.OEvent;
    import IBase = Ompluscript.Core.Interfaces.IBase;

    /**
     * Class that defines basic field
     *
     * @class Field
     */
    export abstract class Field extends Component implements IObserver {

        /**
         * @type {string} PARAMETER_EVENTS Name of events parameter
         */
        public static PARAMETER_EVENTS: string = "events";

        /**
         * @type {string} PARAMETER_ON_FIELD_CLICK Defines event when it's clicked on field
         */
        public static PARAMETER_ON_FIELD_CLICK: string = "onFieldClick";

        /**
         * @type {string} EVENT_CLICK Name of event for click on field
         */
        public static EVENT_CLICK: string = "click";

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
            this.addOnFieldClickEvent();
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
         * Method that attach handler for clicking on field
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFieldClickEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_CLICK, callback);
        }

        /**
         * Method that determines if component contains translated content.
         */
        public abstract isTranslated(): boolean;

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public abstract update(event: OEvent): void;

        /**
         * Method that defines event for clicking on field
         */
        protected addOnFieldClickEvent(): void {
            let that: Field = this;
            let listener: (event: Event) => void = function(event: Event): void {
                that.fireOnFieldClickEvent(event);
            };
            that.htmlElement.addEventListener(Field.EVENT_CLICK, listener, false);
        }

        /**
         * Method that fires event when HTML element is clicked
         *
         * @param {OEvent} event Original event
         */
        protected fireOnFieldClickEvent(event: Event): void {
            let oEvent: OnFieldClick = new OnFieldClick(this, event);
            this.notifyObservers(oEvent);
        }
    }

}
