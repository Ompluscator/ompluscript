/// <reference path="../Component/Component.ts" />

module Ompluscript.View.Layout {
    "use strict";
    
    import Component = Ompluscript.View.Component.Component;
    
    export abstract class Layout extends Component {

        public static DIV_ELEMENT: string = "div";

        public static LAYOUT_CLASS: string = "layout";
        
        protected children: Component[];

        constructor(name: string, styles: Object = undefined) {
            super(name, styles);
            this.children = [];
        }

        public addChild(component: Component): void {
            this.children.push(component);
        }

        public removeChild(component: Component): void {
            let index: number = this.children.indexOf(component);
            if (index > -1) {
                this.children.splice(index, 1);
            }
        }

        public getChildrenCount(): number {
            return this.children.length;
        }
        
        public clearChildren(): void {
            this.children = [];
        }

        public render(): HTMLElement {
            this.clear();
            for (let i: number = 0; i < this.children.length; i++) {
                if (this.children[i] !== undefined) {
                    this.appendChild(this.children[i]);
                }
            }
            return this.htmlElement;
        }

        protected initializeHtmlElement(): void {
            this.htmlElement = document.createElement(Layout.DIV_ELEMENT);
            this.addClass(Layout.LAYOUT_CLASS);
        }

        protected abstract appendChild(component: Component): void;

        protected abstract clear(): void;
        
    }
}
