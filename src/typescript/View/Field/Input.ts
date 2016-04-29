/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/Event.ts" />
/// <reference path="../Component/Field.ts" />
/// <reference path="../../Model/Attribute/Attribute.ts" />
/// <reference path="../../Model/Event/AttributeEvent.ts" />
/// <reference path="../../Model/Event/OnUpdateAttribute.ts" />
/// <reference path="../Event/OnInputUpdate.ts" />

/**
 * Module that contains fields
 *
 * @module Ompluscript.View.Field
 */
module Ompluscript.View.Field {
    "use strict";

    import Field = Ompluscript.View.Component.Field;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
    import OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
    import Event = Ompluscript.Core.Observer.Event;
    import OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;

    /**
     * Class that defines basic input
     *
     * @class Input
     */
    export abstract class Input extends Field implements IObserver {

        public static FIELD_INPUT: string = "input";

        public static ATTRIBUTE_TYPE: string = "type";

        public static ATTRIBUTE_VALUE: string = "value";

        public static ATTRIBUTE_NAME: string = "name";

        public static INPUT_TEXT: string = "text";

        public static INPUT_PASSWORD: string = "password";

        public static INPUT_EMAIL: string = "email";

        public static INPUT_CHECK_BOX: string = "checkbox";

        protected attribute: Attribute<any>;

        constructor(name: string, attribute: Attribute<any> = undefined, type: string = Input.INPUT_TEXT) {
            super(name);
            this.setAttribute(Input.ATTRIBUTE_TYPE, type);
            this.setAttribute(Input.ATTRIBUTE_NAME, this.name);
            this.addClass(Input.FIELD_INPUT);
            this.attribute = undefined;
            this.setBinding(attribute);
            this.addObserverByType(this, OnUpdateInput.ON_UPDATE_INPUT);
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
            }
        }

        public setBinding(attribute: Attribute<any>): void {
            this.removeBinding();
            this.attribute = attribute;
            if (this.isBound()) {
                this.attribute.addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
            }
        }
        
        public isBound(): boolean {
            return this.attribute !== undefined;
        }

        public removeBinding(): void {
            if (this.isBound()) {
                this.attribute.deleteObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                this.attribute = undefined;
            }
        }

        public setValue(value: any): void {
            this.updateValue(value);
            if (this.isBound()) {
                this.attribute.setValue(value);
            }
        }

        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Input.FIELD_INPUT);
            this.addOnUpdateInputEvent();
        }

        protected fireOnUpdateInputEvent(value: any): void {
            let event: OnUpdateInput = new OnUpdateInput(this, value);
            this.notifyObservers(event);
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

        protected abstract addOnUpdateInputEvent(): void;

        protected abstract getValue(): any;

        protected abstract updateValue(value: any): void;
    }

}
