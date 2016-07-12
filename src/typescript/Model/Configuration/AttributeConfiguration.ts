/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="../Attribute/Attribute.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Attribute = Ompluscript.Model.Attribute.Attribute;

    export abstract class AttributeConfiguration extends Configuration {

        public getErrors(definition: Object, prefix: string): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, Configuration.PARAMETER_NAME, prefix));
            errors.push(this.shouldBeBoolean(definition, Attribute.PARAMETER_REQUIRED, prefix));
            return this.filterErrors(errors);
        }
    }
}
