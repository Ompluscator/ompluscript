/// <reference path="../Component/Container.ts" />
/// <reference path="../Layout/NullLayout.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Container {
    "use strict";
    
    import Container = Ompluscript.View.Component.Container;
    import Layout = Ompluscript.View.Component.Layout;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export class Page extends Container {

        protected layout: Layout;

        constructor(name: string, definition: Object = {}) {
            super(name, definition);
        }
        
    }

}
