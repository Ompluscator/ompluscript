/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="ComponentConfiguration.ts" />
/// <reference path="../Layout/RelativeLayout.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import RelativeLayout = Ompluscript.View.Layout.RelativeLayout;

    export class RelativeLayoutConfiguration extends ComponentConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === RelativeLayout.TYPE_RELATIVE_LAYOUT;
        }

        public create(definition: Object): IBase {
            return new RelativeLayout();
        }
    }
}
