/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Attribute/Boolean.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import BooleanAttribute = Ompluscript.Model.Attribute.Boolean;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    
    export class BooleanConfiguration extends AttributeConfiguration {
        
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === BooleanAttribute.TYPE_BOOLEAN;
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeBoolean(definition, BooleanAttribute.PARAMETER_MUST_BE_TRUE));
            return this.filterErrors(errors);
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let value: boolean = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let mustBeTrue: boolean = definition[BooleanAttribute.PARAMETER_MUST_BE_TRUE];
            return new BooleanAttribute(name, value, required, mustBeTrue);
        }
    }
}
