/// <reference path="../../Core/Observer/Observable.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Component {
    "use strict";

    import Observable = Ompluscript.Core.Observer.Observable;

    /**
     * Abstract class that defines basic component
     *
     * @class Component
     */
    export abstract class Component extends Observable {

        /**
         * @type {string} PARAMETER_TYPE Name of type parameter
         */
        public static PARAMETER_TYPE: string = "type";

        /**
         * @type {string} PARAMETER_STYLES Name of styles parameter
         */
        public static PARAMETER_STYLES: string = "styles";

        /**
         * @type {string} ATTRIBUTE_ID Name of id attribute
         */
        public static ATTRIBUTE_ID: string = "id";

        /**
         * @type {string} ATTRIBUTE_ID Name of class attribute
         */
        public static ATTRIBUTE_CLASS: string = "class";

        /**
         * @type {HTMLElement} htmlElement Contains HTML content of component
         */
        protected htmlElement: HTMLElement;

        /**
         * @type {string} name Defines name of component
         */
        protected name: string;

        /**
         * @type {Component} parent Component that contains this one
         */
        protected parent: Component;

        /**
         * @type {Object} styles Styles for container
         */
        protected styles: Object;

        /**
         * Class constructor.
         * 
         * Sets name and styles for component, and
         * initialize HTML content.
         * 
         * @param {string} name Name of component
         * @param {Object} styles Styles for container
         */
        constructor(name: string, styles: Object = undefined) {
            super();
            this.name = name;
            this.htmlElement = undefined;
            this.styles = styles;
            this.initializeHtmlElement();
            if (styles !== undefined) {
                for (let key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        this.setStyle(key, styles[key]);
                    }
                }
            }
        }

        /**
         * Method that returns if component has some value for class
         * 
         * @param {string} name Name of class
         * @returns {boolean} if component has some value for class
         */
        public hasClass(name: string): boolean {
            let classes: string[] = this.extractClasses();
            return classes.indexOf(name) > -1;
        }

        /**
         * Method that adds some value for class to component
         *
         * @param {string} name Name of class
         */
        public addClass(name: string): void {
            if (!this.hasClass(name)) {
                let classes: string[] = this.extractClasses();
                classes.push(name);
                let value: string = classes.join(" ").trim();
                this.setAttribute(Component.ATTRIBUTE_CLASS, value);
            }
        }

        /**
         * Method that removes some value for class to component
         *
         * @param {string} name Name of class
         */
        public removeClass(name: string): void {
            if (this.hasClass(name)) {
                let classes: string[] = this.extractClasses();
                let index: number = classes.indexOf(name);
                classes.splice(index, 1);
                let value: string = classes.join(" ").trim();
                this.setAttribute(Component.ATTRIBUTE_CLASS, value);
            }
        }
        
        /**
         * Method that adds or remove some value for class to component
         *
         * @param {string} name Name of class
         */
        public toggleClass(name: string): void {
            if (this.hasClass(name)) {
                this.removeClass(name);
            } else {
                this.addClass(name);
            }
        }

        /**
         * Method that sets some value for id of component 
         * 
         * @param {name} id Value for id of component
         */
        public setId(id: string): void {
            this.setAttribute(Component.ATTRIBUTE_ID, id);
        }

        /**
         * Method that returns some value for id of component
         * 
         * @returns {string} Value for id of component
         */
        public getId(): string {
            return this.getAttribute(Component.ATTRIBUTE_ID);
        }

        /**
         * Method that sets some value for desired attribute of component
         * 
         * @param {string} name Name of attribute
         * @param {string} value New value for attribute
         */
        public setAttribute(name: string, value: string): void {
            this.htmlElement.setAttribute(name, value);
        }

        /**
         * Method that returns value for desired attribute of component
         * 
         * @param {string} name Name of attribute
         * @returns {string} Value for attribute
         */
        public getAttribute(name: string): string {
            return this.htmlElement.getAttribute(name);
        }

        /**
         * Method that removes value for desired attribute of component
         *
         * @param {string} name Name of attribute
         */
        public removeAttribute(name: string): void {
            this.htmlElement.removeAttribute(name);
        }

        /**
         * Method that returns value for for desired style of component
         * 
         * @param {string} name Name of style
         * @returns {string} Value for style
         */
        public getStyle(name: string): string {
            return this.htmlElement.style.getPropertyValue(name);
        }

        /**
         * Method that sets value for for desired style of component
         * 
         * @param {string} name Name of style
         * @param {string} value Value for style
         */
        public setStyle(name: string, value: string): void {
            this.htmlElement.style.setProperty(name, value);
        }

        /**
         * Method that returns name of boject
         *
         * @returns {string} Object's name
         */
        public getName(): string {
            return this.name;
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = {
                html: this.htmlElement.outerHTML.replace(this.htmlElement.innerHTML, ""),
                name: this.name,
            };
            return trace;
        }

        /**
         * Method that should be called before removing reference from object.
         */
        public dispose(): void {
            if (this.htmlElement instanceof HTMLElement) {
                let parent: HTMLElement = this.htmlElement.parentElement;
                if (parent instanceof HTMLElement) {
                    parent.removeChild(this.htmlElement);
                }
            }
        }

        /**
         * Method that sets component that contains this one
         *
         * @param {Component} parent Component that contains this one
         */
        public setParent(parent: Component): void {
            this.parent = parent;
        }

        /**
         * Method that returns component that contains this one
         *
         * @returns {Component} Component that contains this one
         */
        public getParent(): Component {
            return this.parent;
        }

        /**
         * Method that removes component that contains this one
         */
        public removeParent(): void {
            this.parent = undefined;
        }

        /**
         * Method that returns all parent components depending on  name
         *
         * @param {string} name Name of component
         * @returns {Component[]} List of parent components by filter
         */
        public getParentsByName(name: string): Component[] {
            return this.getParents(name);
        }

        /**
         * Method that returns all parent components depending on type
         *
         * @param {string} type Type of component
         * @returns {Component[]} List of parent components by filter
         */
        public getParentsByType(type: string): Component[] {
            return this.getParents(undefined, type);
        }

        /**
         * Method that returns all parent components depending on type and name
         *
         * @param {string} name Name of component
         * @param {string} type Type of component
         * @returns {Component[]} List of parent components by filter
         */
        public getParents(name: string = undefined, type: string = undefined): Component[] {
            if (this.getParent() === undefined) {
                return [];
            }
            let parents: Component[] = [];
            if (name === undefined && type === undefined) {
                parents.push(this.getParent());
            } else if (name === this.getParent().getName() && type === undefined) {
                parents.push(this.getParent());
            } else if (name === undefined && type === this.getParent().constructor["name"]) {
                parents.push(this.getParent());
            } else if (name === this.getParent().getName() && type === this.getParent().constructor["name"]) {
                parents.push(this.getParent());
            }
            parents.push.apply(parents, this.getParent().getParents(name, type));
            return parents;
        }

        /**
         * Method that returns HTML content of component
         *
         * @returns {HTMLElement} HTML content of component
         */
        public abstract render(): HTMLElement;

        /**
         * Method that returns extracted classes of component as array
         * 
         * @returns {string[]} Array with all classes
         */
        protected extractClasses(): string[] {
            let classes: string[];
            let classValue: string = this.getAttribute(Component.ATTRIBUTE_CLASS);
            if (typeof classValue === "string") {
                classes = this.getAttribute(Component.ATTRIBUTE_CLASS).split(" ");
            } else {
                classes = [];
            }
            if (classes === [""]) {
                classes = [];
            }
            return classes;
        }

        /**
         * Method that generates HTML content of component
         */
        protected abstract initializeHtmlElement(): void;
    }

}
