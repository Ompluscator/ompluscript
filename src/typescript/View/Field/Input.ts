/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/Event.ts" />
/// <reference path="Field.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />
/// <reference path="../../Model/Event/AttributeEvent.ts" />
/// <reference path="../../Model/Event/OnUpdateAttribute.ts" />
/// <reference path="../Event/OnInputUpdate.ts" />
/// <reference path="../../Model/Event/OnUpdateAsset.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
    import OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    import Event = Ompluscript.Core.Observer.Event;
    import OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;
    import OnUpdateAsset = Ompluscript.Model.Event.OnUpdateAsset;

    /**
     * Class that defines basic input
     *
     * @class Input
     */
    export abstract class Input extends Field implements IObserver {

        /**
         * @type {string} PARAMETER_ATTRIBUTE Name of attribute parameter
         */
        public static PARAMETER_ATTRIBUTE: string = "attribute";

        /**
         * @type {string} PARAMETER_PLACEHOLDER Name of placeholder parameter
         */
        public static PARAMETER_PLACEHOLDER: string = "placeholder";

        /**
         * @type {string} ELEMENT_INPUT HTML input element
         */
        public static ELEMENT_INPUT: string = "input";

        /**
         * @type {string} CLASS_INPUT Class of HTML input element
         */
        public static CLASS_INPUT: string = "input";

        /**
         * @type {string} ATTRIBUTE_TYPE Name of type HTML attribute
         */
        public static ATTRIBUTE_TYPE: string = "type";

        /**
         * @type {string} ATTRIBUTE_VALUE Name of value HTML attribute
         */
        public static ATTRIBUTE_VALUE: string = "value";

        /**
         * @type {string} ATTRIBUTE_NAME Name of name HTML attribute
         */
        public static ATTRIBUTE_NAME: string = "name";

        /**
         * @type {string} ATTRIBUTE_PLACEHOLDER Name of placeholder HTML attribute
         */
        public static ATTRIBUTE_PLACEHOLDER: string = "placeholder";

        /**
         * @type {Attribute<any>} attribute Attribute for binding with
         */
        protected attribute: Attribute<any>;

        /**
         * @type {string} placeholder Placeholder asset name
         */
        protected placeholder: string;

        /**
         * @type {string} placeholderContent Placeholder asset value
         */
        protected placeholderContent: string;

        /**
         * Class constructor.
         * 
         * Sets binding with attribute and translation
         * and calls constructor of superclass.
         * 
         * @param {string} name Name of component
         * @param {Attribute<any>} attribute Attribute for binding with
         * @param {string} placeholder Placeholder asset name
         * @param {Object} styles Styles for component
         * @param {string} type Type of HTML input element
         * @constructs
         */
        constructor(name: string, attribute: Attribute<any> = undefined, placeholder: string = undefined, 
                    styles: Object = {}, type: string = undefined) {
            super(name, styles);
            this.setAttribute(Input.ATTRIBUTE_TYPE, type);
            this.setAttribute(Input.ATTRIBUTE_NAME, this.name);
            this.addClass(Input.CLASS_INPUT);
            this.attribute = undefined;
            this.setBinding(attribute);
            this.addObserverByType(this, OnUpdateInput.ON_UPDATE_INPUT);
            this.placeholder = placeholder;
            if (this.isTranslated()) {
                this.translation.attachToAsset(placeholder, this);
            }
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {Event} event
         */
        public update(event: Event): void {
            if (event instanceof OnUpdateAttribute) {
                let onUpdateAttribute: OnUpdateAttribute = <OnUpdateAttribute>event;
                this.updateValue(onUpdateAttribute.getNewValue());
            } else if (event instanceof OnUpdateInput && this.isBound()) {
                let onUpdateInput: OnUpdateInput = <OnUpdateInput>event;
                this.attribute.setValue(onUpdateInput.getValue());
            } else if (event instanceof OnUpdateAsset && this.isTranslated()) {
                let onUpdateAsset: OnUpdateAsset = <OnUpdateAsset>event;
                this.updatePlaceholder(onUpdateAsset.getNewValue());
            }
        }

        /**
         * Method that binds input with desired attribute
         * 
         * @param {Attribute<any>} attribute Attribute for binding with
         */
        public setBinding(attribute: Attribute<any>): void {
            this.removeBinding();
            this.attribute = attribute;
            if (this.isBound()) {
                this.attribute.addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
            }
        }

        /**
         * Method that returns if input is bound with any attribute
         * 
         * @returns {boolean} if input is bound with any attribute
         */
        public isBound(): boolean {
            return this.attribute !== undefined;
        }

        /**
         * Methode that returns an attribute for binding with
         * 
         * @returns {Attribute<any>} attribute Attribute for binding with
         */
        public getBindingAttribute(): Attribute<any> {
            return this.attribute;
        }

        /**
         * Method that removes binding with any attribute
         */
        public removeBinding(): void {
            if (this.isBound()) {
                this.attribute.deleteObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                this.attribute = undefined;
            }
        }

        /**
         * Method that sets value for input
         * 
         * @param {any} value
         */
        public setValue(value: any): void {
            this.updateValue(value);
            if (this.isBound()) {
                this.attribute.setValue(this.getValue());
            }
        }

        /**
         * Method that determines if component contains translated content.
         * 
         * @returns {boolean} if component contains translated content
         */
        public isTranslated(): boolean {
            return this.translation !== undefined && this.placeholder !== undefined;
        }

        /**
         * Method that returns value for placeholder HTML attribute
         * 
         * @returns {string} value for placeholder HTML attribute
         */
        public getPlaceholderContent(): string {
            if (this.placeholderContent !== undefined) {
                return this.placeholderContent;
            }
            return this.placeholder;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            if (this.isBound()) {
                trace["attribute"] = this.attribute.getStackTrace();
            } else {
                trace["attribute"] = undefined;
            }
            return trace;
        }

        /**
         * Method that sets value for placeholder HTML attribute
         * 
         * @param {string} value for placeholder HTML attribute
         */
        protected updatePlaceholder(value: string): void {
            this.placeholderContent = value;
            this.setAttribute(Input.ATTRIBUTE_PLACEHOLDER, this.getPlaceholderContent());
        }

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Input.ELEMENT_INPUT);
            this.addOnUpdateInputEvent();
        }

        /**
         * Method that fires event when value of input HTML element is updated
         * 
         * @param {string} value for input HTML element
         */
        protected fireOnUpdateInputEvent(value: any): void {
            let event: OnUpdateInput = new OnUpdateInput(this, value);
            this.notifyObservers(event);
        }

        /**
         * Method that defines event for updating input value
         */
        protected abstract addOnUpdateInputEvent(): void;

        /**
         * Method that returns value of input HTML element
         * 
         * @returns {any} value for input HTML element
         */
        protected abstract getValue(): any;

        /**
         * Method that sets new value of input HTML element
         * 
         * @param {any} value New value for input HTML element
         */
        protected abstract updateValue(value: any): void;
    }

}
