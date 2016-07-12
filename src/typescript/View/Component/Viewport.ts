/// <reference path="../Component/Component.ts" />
/// <reference path="../Container/Page.ts" />

module Ompluscript.View.Component {
    "use strict";
    
    import Component = Ompluscript.View.Component.Component;
    import Page = Ompluscript.View.Container.Page;

    export class Viewport extends Component {

        private static VIEWPORT_CLASS: string = "viewport";
        
        private static VIEWPORT: string = "viewport";

        protected pages: Page[];

        protected activePageIndex: number;

        constructor(pages: Page[]) {
            super(Viewport.VIEWPORT, undefined);
            this.pages = pages;
            this.activePageIndex = 0;
        }

        public getPageByIndex(index: number): Page {
            return this.pages[index];
        }

        public findPageIndexByName(name: string): number {
            for (let i: number = 0; i < this.pages.length; i++) {
                if (this.pages[i].getName() === name) {
                    return i;
                }
            }
            return undefined;
        }
        
        public setActivePageIndex(index: number): void {
            this.activePageIndex = index;
        }

        public render(): HTMLElement {
            this.clear();
            this.pages[this.activePageIndex].render();
            this.appendChild(this.pages[this.activePageIndex]);
            return this.htmlElement;
        }

        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }

        protected appendChild(component: Component): void {
            this.htmlElement.appendChild(component.render());
        }

        protected initializeHtmlElement(): void {
            this.htmlElement = document.body;
            this.addClass(Viewport.VIEWPORT_CLASS);
        }
    }
}
