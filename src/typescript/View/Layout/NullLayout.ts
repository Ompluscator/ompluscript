/// <reference path="../Component/Layout.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";

    import Layout = Ompluscript.View.Component.Layout;

    /**
     * Class that defines null layout
     *
     * @class Container
     */
    export class NullLayout extends Layout {

        private static NULL_LAYOUT_CLASS: string = "null-layout";

        constructor() {
            super(NullLayout.NULL_LAYOUT_CLASS);
        }

        protected appendChild(component: Ompluscript.View.Component.Component): void {
            this.htmlElement.appendChild(component.render());
        }

        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }

        protected initializeHtmlElement(): void {
            super.initializeHtmlElement();
            this.addClass(NullLayout.NULL_LAYOUT_CLASS);
        }
    }

}
