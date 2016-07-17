/// <reference path="../Component/Component.ts" />
/// <reference path="../Container/Page.ts" />

/**
 * Module that contains viewport component
 *
 * @module Ompluscript.View.Viewport
 */
module Ompluscript.View.Viewport {
    "use strict";
    
    import Component = Ompluscript.View.Component.Component;
    import Page = Ompluscript.View.Container.Page;

    /**
     * Class that defines viewport component
     *
     * @class Viewport
     */
    export class Viewport extends Component {

        /**
         * @type {string} TYPE_VIEWPORT Type of viewport component
         */
        public static TYPE_VIEWPORT: string = Viewport["name"];

        /**
         * @type {string} PARAMETER_PAGES Name for pages parameter
         */
        public static PARAMETER_PAGES: string = "pages";

        /**
         * @type {string} CLASS_VIEWPORT Class of HTML body element
         */
        private static CLASS_VIEWPORT: string = "viewport";

        /**
         * @type {Page[]} pages List of all pages
         */
        protected pages: Page[];

        /**
         * @type {number} activePageIndex Index of active page
         */
        protected activePageIndex: number;

        /**
         * Class constructor.
         * 
         * Sets a list of all pages and calls constructor of superclass.
         * 
         * @param {Page[]} pages List of all pages
         */
        constructor(pages: Page[] = []) {
            super(Viewport.TYPE_VIEWPORT);
            this.pages = pages;
            if (pages.length > 0) {
                this.setActivePageIndex(0);
            }
        }

        /**
         * Method that returns page by it's index
         * 
         * @param {number} index Index for desired page
         * @returns {Page} Desired page
         */
        public getPageByIndex(index: number): Page {
            return this.pages[index];
        }

        /**
         * Method that returns index of desired page
         * 
         * @param {string} name Name of desired page
         * @returns {number} Index for desired page
         */
        public findPageIndexByName(name: string): number {
            for (let i: number = 0; i < this.pages.length; i++) {
                if (this.pages[i].getName() === name) {
                    return i;
                }
            }
            return undefined;
        }

        /**
         * Method that sets index of active page
         * 
         * @param {number} index Index of desired page
         */
        public setActivePageIndex(index: number): void {
            this.activePageIndex = index;
            for (let i: number = 0; i < this.pages.length; i++) {
                if (this.getPageByIndex(i).isActive() === true) {
                    this.getPageByIndex(i).setActive(false);
                }
            }
            this.getPageByIndex(index).setActive(true);
        }

        /**
         * Method that returns all current values of object.
         *
         * @returns {Object} contains all values of the object
         */
        public getStackTrace(): Object {
            let trace: Object = super.getStackTrace();
            trace["activePageIndex"] = this.activePageIndex;
            trace[Viewport.PARAMETER_PAGES] = [];
            for (let i: number = 0; i < this.pages.length; i++) {
                trace[Viewport.PARAMETER_PAGES].push(this.pages[i].getStackTrace());
            }
            return trace;
        }

        /**
         * Method that returns HTML content of component
         *
         * @returns {HTMLElement} HTML content of component
         */
        public render(): HTMLElement {
            this.clear();
            this.pages[this.activePageIndex].render();
            this.appendChild(this.pages[this.activePageIndex]);
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

        /**
         * Method that generates HTML content of component
         */
        protected initializeHtmlElement(): void {
            this.htmlElement = document.body;
            this.addClass(Viewport.CLASS_VIEWPORT);
        }
    }
}
