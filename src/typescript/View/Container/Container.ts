/// <reference path="../Component/Component.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Layout/NullLayout.ts" />
/// <reference path="../Configuration/Layout/NullLayoutConfiguration.ts" />
/// <reference path="../Configuration/Layout/RelativeLayoutConfiguration.ts" />
/// <reference path="../Configuration/Layout/LinearLayoutConfiguration.ts" />
/// <reference path="../Configuration/Layout/TableLayoutConfiguration.ts" />
/// <reference path="../Configuration/Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Configuration/Field/EmailInputConfiguration.ts" />
/// <reference path="../Configuration/Field/NumberInputConfiguration.ts" />
/// <reference path="../Configuration/Field/PasswordInputConfiguration.ts" />
/// <reference path="../Configuration/Field/TextInputConfiguration.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";

    import Component = Ompluscript.View.Component.Component;
    import Layout = Ompluscript.View.Layout.Layout;
    import NullLayout = Ompluscript.View.Layout.NullLayout;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export abstract class Container extends Layout {

        /**
         * @type {string} PARAMETER_LAYOUT Name of layout parameter
         */
        public static PARAMETER_LAYOUT: string = "layout";

        /**
         * @param {Layout} layout Layout for container
         */
        protected layout: Layout;

        /**
         * Class constructor.
         * 
         * Sets children and layout and calls constructor
         * of superclass
         * 
         * @param {string} name Name of container
         * @param {Layout} layout Layout for container
         * @param {Component[]} children List of children components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, layout: Layout = undefined, children: Component[] = undefined, styles: Object = undefined) {
            super(name, styles);
            this.layout = layout;
            if (this.layout === undefined) {
                this.layout = new NullLayout();
            }
            if (Array.isArray(children)) {
                for (let i: number = 0; i < children.length; i++) {
                    this.addChild(children[i]);
                }
            }
            this.removeClass(Layout.CLASS_LAYOUT);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace[Container.PARAMETER_LAYOUT] = this.layout.getStackTrace();
            return trace;
        }

        /**
         * Method that returns HTML content of component
         *
         * @returns {HTMLElement} HTML content of component
         */
        public render(): HTMLElement {
            this.clear();
            this.layout.clearChildren();
            for (let i: number = 0; i < this.children.length; i++) {
                this.layout.addChild(this.children[i]);
            }
            this.appendChild(this.layout);
            return this.htmlElement;
        }

        /**
         * Method that defines how component's HTML content should be cleared
         */
        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }

        /**
         * Method that defines how component's HTML content should be added to DOM
         *
         * @param {Component} component That should be added
         */
        protected appendChild(component: Component): void {
            this.htmlElement.appendChild(component.render());
        }
    }

}
