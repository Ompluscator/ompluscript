/// <reference path="Layout.ts" />

/**
 * Module that contains layout components
 *
 * @module Ompluscript.View.Layout
 */
module Ompluscript.View.Layout {
    "use strict";

    import Component = Ompluscript.View.Component.Component;

    /**
     * Class that defines linear layout
     *
     * @class Container
     */
    export class LinearLayout extends Layout {

        public static TYPE_LINEAR_LAYOUT: string = LinearLayout["name"];
        
        public static PARAMETER_DIRECTION: string = "direction";

        public static PARAMETER_REVERSE: string = "reverse";

        public static PARAMETER_ALIGN: string = "align";

        public static DIRECTION_HORIZONTAL: string = "horizontal";

        public static DIRECTION_VERTICAL: string = "vertical";

        public static ALIGN_START: string = "start";

        public static ALIGN_END: string = "end";

        public static ALIGN_CENTER: string = "center";

        protected static LINEAR_LAYOUT_CLASS: string = "linear-layout";

        private static CLASS_PREFIX: string = "flex-";

        private static CLASS_REVERSE: string = "flex-";

        constructor(direction: string = LinearLayout.DIRECTION_HORIZONTAL, reverse: boolean = false,
                    align: string = LinearLayout.ALIGN_START) {
            super(LinearLayout.LINEAR_LAYOUT_CLASS);
            if (direction === undefined) {
                direction = LinearLayout.DIRECTION_HORIZONTAL;
            }
            if (reverse !== true) {
                reverse = false;
            }
            if (align === undefined) {
                align = LinearLayout.ALIGN_START;
            }
            this.setUpLayout(direction, reverse, align);
        }

        protected appendChild(component: Component): void {
            this.htmlElement.appendChild(component.render());
        }

        protected clear(): void {
            while (this.htmlElement.firstChild) {
                this.htmlElement.removeChild(this.htmlElement.firstChild);
            }
        }

        protected initializeHtmlElement(): void {
            super.initializeHtmlElement();
            this.addClass(LinearLayout.LINEAR_LAYOUT_CLASS);
        }

        protected setUpLayout(direction: string, reverse: boolean, align: string): void {
            this.addClass(LinearLayout.CLASS_PREFIX + direction);
            this.addClass(LinearLayout.CLASS_PREFIX + align);
            if (reverse === true) {
                this.addClass(LinearLayout.CLASS_PREFIX + LinearLayout.CLASS_REVERSE);
            }
        }
    }

}
