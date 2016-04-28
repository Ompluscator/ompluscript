/// <reference path="Component.ts" />
/// <reference path="Layout.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Component {
    "use strict";

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export abstract class Container extends Layout {
        
        protected layout: Layout;
        
        constructor(name: string, layout: Layout) {
            super(name);
            this.layout = layout;
        }

        public addChild(component: Component): void {
            super.addChild(component);
            this.layout.addChild(component);
        }

        public removeChild(component: Component): void {
            super.removeChild(component);
            this.layout.removeChild(component);
        }

        public clearChildren(): void {
            super.clearChildren();
            this.layout.clearChildren();
        }

        public render(): HTMLElement {
            this.clear();
            this.appendChild(this.layout);
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
    }

}
