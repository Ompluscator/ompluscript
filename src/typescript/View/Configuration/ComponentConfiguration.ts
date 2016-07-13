/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Component/Component.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Component = Ompluscript.View.Component.Component;

    export abstract class ComponentConfiguration extends Configuration {

        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeBoolean(definition, Component.PARAMETER_STYLES));
            return this.filterErrors(errors);
        }
    }
}
