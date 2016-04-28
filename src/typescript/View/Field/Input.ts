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

        public static EVENT_KEY_PRESS: string = "keypress";

        public static INPUT_TEXT: string = "text";

        protected type: string;
        
        protected attribute: Attribute<any>;

        constructor(name: string, type: string, attribute: Attribute<any> = undefined) {
            super(name);
            this.type = type;
            this.attribute = attribute;
            if (attribute !== undefined) {
                this.attribute.addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
            }
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
            } else if (event instanceof OnUpdateInput) {
                let onUpdateInput: OnUpdateInput = <OnUpdateInput>event;
                this.attribute.setValue(onUpdateInput.getValue());
            }
        }

        public setValue(value: any): void {
            this.updateValue(value);
            this.attribute.setValue(value);
        }

        protected initializeHtmlElement(): void {
            let that: Input = this;
            that.htmlElement = document.createElement(Input.FIELD_INPUT);
            that.setAttribute(Input.ATTRIBUTE_TYPE, that.type);
            let listener: () => void = function(): void {
                that.fireOnUpdateInputEvent(that.getAttribute(Input.ATTRIBUTE_VALUE));
            };
            that.htmlElement.addEventListener(Input.EVENT_KEY_PRESS, listener, false);
        }
        
        protected updateValue(value: any): void {
            this.setAttribute(Input.ATTRIBUTE_VALUE, value);
        }

        protected fireOnUpdateInputEvent(value: any): void {
            let event: OnUpdateInput = new OnUpdateInput(this, value);
            this.notifyObservers(event);
        }
    }

}
