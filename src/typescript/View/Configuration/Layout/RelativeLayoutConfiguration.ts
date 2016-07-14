/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Layout/RelativeLayout.ts" />

module Ompluscript.View.Configuration.Layout {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import RelativeLayout = Ompluscript.View.Layout.RelativeLayout;
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;

    export class RelativeLayoutConfiguration extends ComponentConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === RelativeLayout.TYPE_RELATIVE_LAYOUT;
        }

        public create(definition: Object): IBase {
            return new RelativeLayout();
        }
    }
}
