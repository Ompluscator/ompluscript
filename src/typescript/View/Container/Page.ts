/// <reference path="Container.ts" />
/// <reference path="../Layout/Layout.ts" />
/// <reference path="../Component/Component.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Layout = Ompluscript.View.Layout.Layout;
    import Component = Ompluscript.View.Component.Component;
    
    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export class Page extends Container {
        
        public static TYPE_PAGE: string = Page["name"];

        constructor(name: string, layout: Layout = undefined, children: Component[] = undefined, styles: Object = undefined) {
            super(name, layout, children, styles);
        }
        
    }

}
