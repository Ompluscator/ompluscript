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
     * Class that defines basic component
     *
     * @class Component
     */
    export abstract class Component extends Observable {

        public static ATTRIBUTE_ID: string = "id";

        public static ATTRIBUTE_CLASS: string = "class";

        protected htmlElement: HTMLElement;

        protected name: string;

        constructor(name: string) {
            super();
            this.name = name;
            this.htmlElement = undefined;
            this.initializeHtmlElement();
        }

        public hasClass(name: string): boolean {
            let classes: string[] = this.extractClasses();
            return classes.indexOf(name) > -1;
        }

        public addClass(name: string): void {
            if (!this.hasClass(name)) {
                let classes: string[] = this.extractClasses();
                classes.push(name);
                let value: string = classes.join(" ").trim();
                this.setAttribute(Component.ATTRIBUTE_CLASS, value);
            }
        }

        public removeClass(name: string): void {
            if (this.hasClass(name)) {
                let classes: string[] = this.extractClasses();
                let index: number = classes.indexOf(name);
                classes.splice(index, 1);
                let value: string = classes.join(" ").trim();
                this.setAttribute(Component.ATTRIBUTE_CLASS, value);
            }
        }

        public toggleClass(name: string): void {
            if (this.hasClass(name)) {
                this.removeClass(name);
            } else {
                this.addClass(name);
            }
        }

        public setId(id: string): void {
            this.setAttribute(Component.ATTRIBUTE_ID, id);
        }

        public getId(): string {
            return this.getAttribute(Component.ATTRIBUTE_ID);
        }

        public setAttribute(name: string, value: string): void {
            this.htmlElement.setAttribute(name, value);
        }

        public getAttribute(name: string): string {
            return this.htmlElement.getAttribute(name);
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

        public abstract render(): HTMLElement;

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

        protected abstract initializeHtmlElement(): void;
    }

}
