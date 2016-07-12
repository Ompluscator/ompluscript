/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="ComponentConfiguration.ts" />
/// <reference path="../Layout/NullLayout.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import NullLayout = Ompluscript.View.Layout.NullLayout;

    export class NullLayoutConfiguration extends ComponentConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === NullLayout.TYPE_NULL_LAYOUT;
        }

        public create(definition: Object): IBase {
            return new NullLayout();
        }
    }
}
