/// <reference path="Layout.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";

    /**
     * Class that defines null layout
     *
     * @class Container
     */
    export class RelativeLayout extends Layout {

        public static TYPE_RELATIVE_LAYOUT: string = RelativeLayout["name"];

        private static RELATIVE_LAYOUT_CLASS: string = "relative-layout";

        constructor() {
            super(RelativeLayout.RELATIVE_LAYOUT_CLASS);
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
            this.addClass(RelativeLayout.RELATIVE_LAYOUT_CLASS);
        }
    }

}
