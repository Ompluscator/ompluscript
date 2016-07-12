/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Attribute/String.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import StringAttribute = Ompluscript.Model.Attribute.String;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    
    export class StringConfiguration extends AttributeConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === StringAttribute.TYPE_STRING;
        }

        public getErrors(definition: Object, prefix: string): string[] {
            let errors: string[] = super.getErrors(definition, prefix);
            errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MINIMUM_LENGTH, prefix));
            errors.push(this.shouldBeNumber(definition, StringAttribute.PARAMETER_MAXIMUM_LENGTH, prefix));
            errors = this.filterErrors(errors);
            if (errors.length === 0) {
                let minimum: number = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                let maximum: number = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                let minimumKey: string = StringAttribute.PARAMETER_MINIMUM_LENGTH;
                let maximumKey: string = StringAttribute.PARAMETER_MAXIMUM_LENGTH;
                if (minimum !== undefined && maximum !== undefined) {
                    errors.push(this.mustBeGreater(
                        definition, minimumKey, maximumKey, minimum, maximum, true, prefix
                    ));
                }
            }
            errors.push(this.shouldBeRegex(definition, StringAttribute.PARAMETER_PATTERN, prefix));
            return this.filterErrors(errors);
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let value: string = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimumLength: number = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
            let maximumLength: number = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
            let pattern: RegExp = definition[StringAttribute.PARAMETER_PATTERN];
            return new StringAttribute(name, value, required, minimumLength, maximumLength, pattern);
        }
    }
}
