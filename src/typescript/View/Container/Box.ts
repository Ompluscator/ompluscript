/// <reference path="Container.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Component/Component.ts" />

/**
 * Module that contains containers
 *
 * @module Ompluscript.View.Container
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Layout = Ompluscript.View.Layout.Layout;
    import Component = Ompluscript.View.Component.Component;
    
    /**
     * Class that defines box
     *
     * @class Box
     */
        export class Box extends Container {

        /**
         * @type {string} TYPE_BOX Type of box
         */
        public static TYPE_BOX: string = Box["name"];

        /**
         * @type {string} CLASS_BOX Class of HTML div element for box
         */
        public static CLASS_BOX: string = "box";

        /**
         * Class constructor.
         *
         * Calls constructor of superclass
         *
         * @param {string} name Name of container
         * @param {Layout} layout Layout for container
         * @param {Component[]} children List of children components
         * @param {Object} styles Styles for container
         * @constructs
         */
        constructor(name: string, layout: Layout = undefined, children: Component[] = undefined, styles: Object = undefined) {
            super(name, layout, children, styles);
            this.addClass(Box.CLASS_BOX);
        }
    }
}
