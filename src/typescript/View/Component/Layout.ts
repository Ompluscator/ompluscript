/// <reference path="Component.ts" />

module Ompluscript.View.Component {
    "use strict";
    
    export abstract class Layout extends Component {
        
        protected children: Component[];

        constructor(name: string) {
            super(name);
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

        protected abstract appendChild(component: Component): void;

        protected abstract clear(): void;
        
    }
}
