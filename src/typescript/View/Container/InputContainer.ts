/// <reference path="../Field/Input.ts" />
/// <reference path="../Field/Label.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../../Model/Event/AttributeEvent.ts" />
/// <reference path="../../Model/Event/OnInvalidAttribute.ts" />
/// <reference path="../../Model/Event/OnUpdateAttribute.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";

    import Input = Ompluscript.View.Field.Input;
    import Component = Ompluscript.View.Component.Component;
    import Label = Ompluscript.View.Field.Label;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OEvent = Ompluscript.Core.Observer.OEvent;
    import AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
    import OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
    import OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;

    /**
     * Class that defines input container
     *
     * @class InputContainer
     */
    export class InputContainer extends Container implements IObserver {
        /**
         * @type {string} CLASS_INPUT_CONTAINER Class of HTML div element for input container
         */
        public static CLASS_INPUT_CONTAINER: string = "input-container";

        /**
         * @type {string} CLASS_ERROR Class of HTML input container element for error
         */
        public static CLASS_ERROR: string = "error";

        /**
         * @tupe {Label} label Label field for displaying errors
         */
        private label: Label;

        /**
         * @tupe {Input} input Input field
         */
        private input: Input;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {Input} input Input that should used
         * @constructs
         */
        constructor(input: Input) {
            let label: Label = new Label(input.getName() + "Error");
            let children: Component[] = [label, input];
            super(input.getName(), undefined, children);
            this.addClass(InputContainer.CLASS_INPUT_CONTAINER);
            this.label = label;
            this.input = input;
            input.getBindingAttribute().addObserverByType(this, AttributeEvent.ON_INVALID_ATTRIBUTE);
            input.getBindingAttribute().addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            if (event instanceof OnInvalidAttribute) {
                let onInvalidAttribute: OnInvalidAttribute = <OnInvalidAttribute>event;
                this.label.setTextAsset(this.name + "." + onInvalidAttribute.getValidationCode());
                this.label.getParent().addClass(InputContainer.CLASS_ERROR);
            } else if (event instanceof OnUpdateAttribute) {
                if (this.input.getBindingAttribute().validate()) {
                    this.label.getParent().removeClass(InputContainer.CLASS_ERROR);
                }
            }
        }

        /**
         * Method that hides error label.
         */
        public clearError(): void {
            this.label.getParent().removeClass(InputContainer.CLASS_ERROR);
        }
    }
}
