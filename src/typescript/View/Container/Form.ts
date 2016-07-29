/// <reference path="Container.ts" />
/// <reference path="InputContainer.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Component/Component.ts" />
/// <reference path="../Field/Button.ts" />
/// <reference path="../../Core/Observer/IObserver.ts" />
/// <reference path="../../Core/Observer/OEvent.ts" />
/// <reference path="../Event/FieldEvent.ts" />
/// <reference path="../Event/OnFieldClick.ts" />
/// <reference path="../../Model/Event/OnDoneProxy.ts" />
/// <reference path="../../Model/Proxy/AjaxProxy.ts" />
/// <reference path="../Event/OnFormFail.ts" />
/// <reference path="../Event/OnFieldFocus.ts" />
/// <reference path="../Event/OnFieldBlur.ts" />
/// <reference path="../Event/OnFormSubmit.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Layout = Ompluscript.View.Layout.Layout;
    import Component = Ompluscript.View.Component.Component;
    import Model = Ompluscript.Model.Container.Model;
    import Button = Ompluscript.View.Field.Button;
    import Input = Ompluscript.View.Field.Input;
    import IObserver = Ompluscript.Core.Observer.IObserver;
    import OEvent = Ompluscript.Core.Observer.OEvent;
    import FieldEvent = Ompluscript.View.Event.FieldEvent;
    import OnFieldClick = Ompluscript.View.Event.OnFieldClick;
    import OnDoneProxy = Ompluscript.Model.Event.OnDoneProxy;
    import AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    import OnFormSubmit = Ompluscript.View.Event.OnFormSubmit;
    import OnFormFail = Ompluscript.View.Event.OnFormFail;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import FormEvent = Ompluscript.View.Event.FormEvent;
    import Label = Ompluscript.View.Field.Label;
    import OnFieldFocus = Ompluscript.View.Event.OnFieldFocus;
    import OnFieldBlur = Ompluscript.View.Event.OnFieldBlur;
    
    /**
     * Class that defines form
     *
     * @class Form
     */
    export class Form extends Container implements IObserver {

        /**
         * @type {string} TYPE_FORM Type of form
         */
        public static TYPE_FORM: string = "Form";

        /**
         * @type {string} PARAMETER_MODEL Name of model parameter
         */
        public static PARAMETER_MODEL: string = "model";

        /**
         * @type {string} PARAMETER_PROXY Name of proxy parameter
         */
        public static PARAMETER_PROXY: string = "proxy";

        /**
         * @type {string} PARAMETER_BUTTON_ASSET Name of button asset parameter
         */
        public static PARAMETER_BUTTON_ASSET: string = "buttonAsset";

        /**
         * @type {string} CLASS_FORM Class of HTML div element for form
         */
        public static CLASS_FORM: string = "form";

        /**
         * @type {string} CLASS_STATUS Class of HTML label element for status
         */
        public static CLASS_STATUS: string = "status";

        /**
         * @type {string} CLASS_SHOW Class of HTML labe element for showing
         */
        public static CLASS_SHOW: string = "show";

        /**
         * @type {string} proxy Type of proxy
         */
        private proxy: string;

        /**
         * @type {Model} model Model that contains attributes for form
         */
        private model: Model;

        /**
         * @type {Button} button Submit button in form
         */
        private button: Button;

        /**
         * @type {Label} label Status label in form
         */
        private label: Label;

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {string} name Name of container
         * @param {Layout} layout Layout for container
         * @param {string} proxy Type of proxy
         * @param {string} buttonAsset Asset name for button
         * @param {Model} model Model that contains attributes for form
         * @param {Input[]} inputs List of input components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, layout: Layout = undefined, proxy: string, buttonAsset: string, 
                    model: Model, inputs: Input[] = [], styles: Object = undefined) {
            let button: Button = new Button(name + "Submit", buttonAsset);
            let containers: Component[] = [];
            let label: Label = new Label(name + "Status");
            containers.push(label);
            for (let i: number = 0; i < inputs.length; i++) {
                containers.push(new InputContainer(inputs[i]));
            }
            containers.push(button);
            super(name, layout, containers, styles);
            for (let i: number = 0; i < inputs.length; i++) {
                inputs[i].addObserverByType(this, FieldEvent.ON_FIELD_FOCUS);
                inputs[i].addObserverByType(this, FieldEvent.ON_FIELD_BLUR);
            }
            this.addClass(Form.CLASS_FORM);
            this.proxy = proxy;
            this.model = model;
            this.button = button;
            this.label = label;
            this.button.addObserverByType(this, FieldEvent.ON_FIELD_CLICK);
            this.model.addObserverByType(this, OnDoneProxy.ON_DONE_PROXY);
        }

        /**
         * Method that defines event handler for desired event.
         *
         * @param {OEvent} event
         */
        public update(event: OEvent): void {
            if (event instanceof OnFieldClick) {
                this.submit();
            } else if (event instanceof OnDoneProxy) {
                let onDoneProxy: OnDoneProxy = <OnDoneProxy>event;
                this.handleResponse(onDoneProxy);
            } else if (event instanceof OnFieldFocus) {
                let onFieldFocus: OnFieldFocus = <OnFieldFocus>event;
                this.showLabel(<Input>onFieldFocus.getSender());
            } else if (event instanceof OnFieldBlur) {
                let onFieldBlur: OnFieldBlur = <OnFieldBlur>event;
                this.hideLabel(<Input>onFieldBlur.getSender());
            }
        }

        /**
         * Method that sets assets for status label and displays it.
         * 
         * @param {string} asset Asset name
         */
        public setStatusAsset(asset: string): void {
            this.label.setTextAsset(asset);
            this.label.addClass(Form.CLASS_STATUS);
        }

        /**
         * Method that resets form content and model.
         */
        public reset(): void {
            this.model.resetValues();
            this.label.removeClass(Form.CLASS_STATUS);
            for (let i: number = 0; i < this.children.length; i++) {
                if (this.children[i] instanceof InputContainer) {
                    (<InputContainer>this.children[i]).clearError();
                }
            }
        }

        /**
         * Method that attach handler for form submit
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFormSubmitEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FormEvent.ON_FORM_SUBMIT, callback);
        }

        /**
         * Method that attach handler for form fail
         *
         * @param {IBase} observer Observer that handles event
         * @param {Function} callback Event handler
         */
        public attachOnFormFailEvent(observer: IBase, callback: Function): void {
            this.addGenericObserverByType(observer, FormEvent.ON_FORM_FAIL, callback);
        }

        /**
         * Method that runs proxy as form submission.
         */
        protected submit(): void {
            if (this.model.validate() === true) {
                switch (this.proxy) {
                    case OnDoneProxy.TYPE_SAVED:
                        this.model.getProxy(AjaxProxy.TYPE_AJAX_PROXY).save();
                        break;
                    case OnDoneProxy.TYPE_UPDATED:
                        this.model.getProxy(AjaxProxy.TYPE_AJAX_PROXY).update();
                        break;
                    case OnDoneProxy.TYPE_DELETED:
                        this.model.getProxy(AjaxProxy.TYPE_AJAX_PROXY).delete();
                        break;
                    default:
                        return;
                }
            } else {
                this.model.fireEventIfInvalid();
            }
        }

        /**
         * Method that handles response from proxy
         * 
         * @param {OnDoneProxy} onDoneProxy Proxy response
         */
        protected handleResponse(onDoneProxy: OnDoneProxy): void {
            if (onDoneProxy.getAction() === this.proxy) {
                this.setStatusAsset(this.name + "." + this.proxy);
                this.fireOnFormSubmitEvent(onDoneProxy.getResponse());
            } else if (onDoneProxy.getAction() === OnDoneProxy.TYPE_FAILED) {
                this.setStatusAsset(this.name + "." + OnDoneProxy.TYPE_FAILED);
                this.fireOnFormFailEvent(onDoneProxy.getResponse());
            }
        }

        /**
         * Method that fires event when form is submitted
         * 
         * @param {Object} response Contains response for proxy
         */
        protected fireOnFormSubmitEvent(response: Object): void {
            let event: OnFormSubmit = new OnFormSubmit(this, response);
            this.notifyObservers(event);
        }

        /**
         * Method that fires event when form is failed
         * 
         * @param {Object} response Contains response for proxy
         */
        protected fireOnFormFailEvent(response: Object): void {
            let event: OnFormFail = new OnFormFail(this, response);
            this.notifyObservers(event);
        }

        /**
         * Method that shod=ws error label for desired input
         *
         * @param {Input} input
         */
        protected showLabel(input: Input): void {
            let inputContainer: InputContainer = <InputContainer>input.getParent();
            let label: Label = <Label>inputContainer.findChildrenByType("Label")[0];
            label.addClass(Form.CLASS_SHOW);
        }

        /**
         * Method that hides error label for desired input
         *
         * @param {Input} input
         */
        protected hideLabel(input: Input): void {
            let inputContainer: InputContainer = <InputContainer>input.getParent();
            let label: Label = <Label>inputContainer.findChildrenByType("Label")[0];
            label.removeClass(Form.CLASS_SHOW);
        }
    }
}
