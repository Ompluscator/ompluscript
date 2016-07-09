/// <reference path="../Component/Component.ts" />
/// <reference path="Page.ts" />

module Ompluscript.View.Component {
    "use strict";

    export class Viewport extends Component {

        public static VIEWPORT_CLASS: string = "viewport";

        protected pages: Page[];

        protected activePageIndex: number;

        constructor(name: string, pages: Page[]) {
            super(name, undefined);
            this.pages = pages;
            this.activePageIndex = 0;
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
