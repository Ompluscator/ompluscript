/// <reference path="../Component/Container.ts" />
/// <reference path="../Layout/NullLayout.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Component {
    "use strict";
    
    import NullLayout = Ompluscript.View.Layout.NullLayout;

    /**
     * Class that defines basic container
     *
     * @class Container
     */
    export class Page extends Container {

        protected layout: Layout;

        constructor(name: string, layout: Layout = new NullLayout(), styles: Object = {}) {
            super(name, layout, styles);
        }
        
    }

}
