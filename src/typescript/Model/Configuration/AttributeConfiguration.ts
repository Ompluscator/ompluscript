/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Attribute/Attribute.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Attribute = Ompluscript.Model.Attribute.Attribute;

    export abstract class AttributeConfiguration extends Configuration {

        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME));
            errors.push(this.shouldBeBoolean(definition, Attribute.PARAMETER_REQUIRED));
            return this.filterErrors(errors);
        }
    }
}
