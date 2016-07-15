/// <reference path="../Component/ComponentConfiguration.ts" />

module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;

    export abstract class LayoutConfiguration extends ComponentConfiguration {

        constructor() {
            super(undefined);
        }
    }
}
