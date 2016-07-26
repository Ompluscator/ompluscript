/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Interfaces/ICloneable.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../../Model/Container/Translation.ts" />
/// <reference path="../../Model/Creator.ts" />
/// <reference path="../Event/OnFieldClick.ts" />
/// <reference path="../Event/OnFieldFocus.ts" />
/// <reference path="../Event/OnFieldBlur.ts" />
/// <reference path="../Event/OnFieldMouseEnter.ts" />
/// <reference path="../Event/OnFieldMouseLeave.ts" />
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
    import ICloneable = Ompluscript.Core.Interfaces.ICloneable;
    import OnFieldFocus = Ompluscript.View.Event.OnFieldFocus;
    import OnFieldBlur = Ompluscript.View.Event.OnFieldBlur;
    import OnFieldMouseEnter = Ompluscript.View.Event.OnFieldMouseEnter;
    import OnFieldMouseLeave = Ompluscript.View.Event.OnFieldMouseLeave;

    /**
     * Class that defines basic field
     *
     * @class Field
     */
    export abstract class Field extends Component implements IObserver, ICloneable {

        /**
         * @type {string} PARAMETER_EVENTS Name of events parameter
         */
        public static PARAMETER_EVENTS: string = "events";

        /**
         * @type {string} PARAMETER_ON_FIELD_CLICK Defines event when it's clicked on field
         */
        public static PARAMETER_ON_FIELD_CLICK: string = "onFieldClick";

        /**
         * @type {string} PARAMETER_ON_FIELD_FOCUS Defines event when focus is on field
         */
        public static PARAMETER_ON_FIELD_FOCUS: string = "onFieldFocus";

        /**
         * @type {string} PARAMETER_ON_FIELD_BLUR Defines event when focus is lost from field
         */
        public static PARAMETER_ON_FIELD_BLUR: string = "onFieldBlur";

        /**
         * @type {string} PARAMETER_ON_FIELD_MOUSE_ENTER Defines event when mouse enters on field
         */
        public static PARAMETER_ON_FIELD_MOUSE_ENTER: string = "onFieldMouseEnter";

        /**
         * @type {string} PARAMETER_ON_FIELD_MOUSE_LEAVE Defines event when mouse leaves field
         */
        public static PARAMETER_ON_FIELD_MOUSE_LEAVE: string = "onFieldMouseLeave";

        /**
         * @type {string} EVENT_CLICK Name of event for click on field
         */
        public static EVENT_CLICK: string = "click";

        /**
         * @type {string} EVENT_FOCUS Name of event for focus on field
         */
        public static EVENT_FOCUS: string = "focus";

        /**
         * @type {string} EVENT_BLUR Name of event for blur on field
         */
        public static EVENT_BLUR: string = "blur";

        /**
         * @type {string} EVENT_MOUSE_ENTER Name of event for mouse enter on field
         */
        public static EVENT_MOUSE_ENTER: string = "mouseenter";

        /**
         * @type {string} EVENT_MOUSE_LEAVE Name of event for mouse leaves from field
         */
        public static EVENT_MOUSE_LEAVE: string = "mouseleave";

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
            this.addOnFieldFocusEvent();
            this.addOnFieldBlurEvent();
            this.addOnFieldMouseEnterEvent();
            this.addOnFieldMouseLeaveEvent();
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
         * Method that attach handler for focusing on field
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFieldFocusEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_FOCUS, callback);
        }

        /**
         * Method that attach handler for loosing focus from field
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFieldBlurEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_BLUR, callback);
        }

        /**
         * Method that attach handler for mouse entering on field
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFieldMouseEnterEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_MOUSE_ENTER, callback);
        }

        /**
         * Method that attach handler for mouse leaving from field
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFieldMouseLeaveEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FieldEvent.ON_FIELD_MOUSE_LEAVE, callback);
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
         * Method that should be called when class object should be cloned.
         */
        public abstract clone(): IBase;

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
         * Method that defines event for focusing on field
         */
        protected addOnFieldFocusEvent(): void {
            let that: Field = this;
            let listener: (event: Event) => void = function(event: Event): void {
                that.fireOnFieldFocusEvent(event);
            };
            that.htmlElement.addEventListener(Field.EVENT_FOCUS, listener, false);
        }

        /**
         * Method that defines event for remove focus on field
         */
        protected addOnFieldBlurEvent(): void {
            let that: Field = this;
            let listener: (event: Event) => void = function(event: Event): void {
                that.fireOnFieldBlurEvent(event);
            };
            that.htmlElement.addEventListener(Field.EVENT_BLUR, listener, false);
        }

        /**
         * Method that defines event for mouse entering on field
         */
        protected addOnFieldMouseEnterEvent(): void {
            let that: Field = this;
            let listener: (event: Event) => void = function(event: Event): void {
                that.fireOnFieldMouseEnterEvent(event);
            };
            that.htmlElement.addEventListener(Field.EVENT_MOUSE_ENTER, listener, false);
        }

        /**
         * Method that defines event for mouse leaving from field
         */
        protected addOnFieldMouseLeaveEvent(): void {
            let that: Field = this;
            let listener: (event: Event) => void = function(event: Event): void {
                that.fireOnFieldMouseLeaveEvent(event);
            };
            that.htmlElement.addEventListener(Field.EVENT_MOUSE_LEAVE, listener, false);
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

        /**
         * Method that fires event when HTML element is focused
         *
         * @param {OEvent} event Original event
         */
        protected fireOnFieldFocusEvent(event: Event): void {
            let oEvent: OnFieldFocus = new OnFieldFocus(this, event);
            this.notifyObservers(oEvent);
        }

        /**
         * Method that fires event when HTML element loose focus
         *
         * @param {OEvent} event Original event
         */
        protected fireOnFieldBlurEvent(event: Event): void {
            let oEvent: OnFieldBlur = new OnFieldBlur(this, event);
            this.notifyObservers(oEvent);
        }

        /**
         * Method that fires event when HTML element mouse is entering
         *
         * @param {OEvent} event Original event
         */
        protected fireOnFieldMouseEnterEvent(event: Event): void {
            let oEvent: OnFieldMouseEnter = new OnFieldMouseEnter(this, event);
            this.notifyObservers(oEvent);
        }

        /**
         * Method that fires event when HTML element mouse is leaving
         *
         * @param {OEvent} event Original event
         */
        protected fireOnFieldMouseLeaveEvent(event: Event): void {
            let oEvent: OnFieldMouseLeave = new OnFieldMouseLeave(this, event);
            this.notifyObservers(oEvent);
        }
    }

}
