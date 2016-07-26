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
         * Method that add new componenet into the list.
         *
         * @param {Component} component
         */
        public addChild(component: Component): void {
            component.setParent(this);
            super.addChild(component);
            this.layout.addChild(component);
        }

        /**
         * Method that removes component from the list.
         *
         * @param {Component} component
         */
        public removeChild(component: Component): void {
            component.removeParent();
            super.removeChild(component);
            this.layout.removeChild(component);
        }

        /**
         * Method that clears the list of components
         */
        public clearChildren(): void {
            for (let i: number = 0; i < this.children.length; i++) {
                this.children[i].removeParent();
            }
            super.clearChildren();
            this.layout.clearChildren();
        }

        /**
         * Method that returns all children components depending on name
         *
         * @param {string} name Name of component
         * @returns {Component[]} List of parent components by filter
         */
        public findChildrenByName(name: string): Component[] {
            return this.findChildren(name);
        }

        /**
         * Method that returns all children components depending on type
         *
         * @param {string} type Type of component
         * @returns {Component[]} List of parent components by filter
         */
        public findChildrenByType(type: string): Component[] {
            return this.findChildren(undefined, type);
        }

        /**
         * Method that returns all children components depending on type and name
         *
         * @param {string} name Name of component
         * @param {string} type Type of component
         * @returns {Component[]} List of parent components by filter
         */
        public findChildren(name: string = undefined, type: string = undefined): Component[] {
            if (this.getChildrenCount() === 0) {
                return [];
            }
            let children: Component[] = [];
            for (let i: number = 0; i < this.getChildrenCount(); i++) {
                if (name === undefined && type === undefined) {
                    children.push(this.children[i]);
                } else if (name === this.children[i].getName() && type === undefined) {
                    children.push(this.children[i]);
                } else if (name === undefined && type === this.children[i].constructor["name"]) {
                    children.push(this.children[i]);
                } else if (name === this.children[i].getName() && type === this.children[i].constructor["name"]) {
                    children.push(this.children[i]);
                }
                if (this.children[i] instanceof Container) {
                    let container: Container = <Container>this.children[i];
                    children.push.apply(children, container.findChildren(name, type));
                }
            }
            return children;
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
