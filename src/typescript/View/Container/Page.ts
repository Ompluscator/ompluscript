/// <reference path="../Component/Container.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Container = Ompluscript.View.Component.Container;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export class Page extends Container {
        
        public static TYPE_PAGE: string = Page["name"];

        constructor(name: string, layoutDefinition: Object = undefined, children: Object[] = undefined, styles: Object = undefined) {
            super(name, layoutDefinition, children, styles);
        }
        
    }

}
