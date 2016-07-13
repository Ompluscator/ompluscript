/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="AttributeConfiguration.ts" />
/// <reference path="../Attribute/Attribute.ts" />
/// <reference path="../Attribute/Datetime.ts" />

module Ompluscript.Model.Configuration {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Datetime = Ompluscript.Model.Attribute.Datetime;
    import Attribute = Ompluscript.Model.Attribute.Attribute;
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    
    export class DatetimeConfiguration extends AttributeConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Datetime.TYPE_DATETIME;
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeDatetime(definition, Attribute.PARAMETER_MINIMUM));
            errors.push(this.shouldBeDatetime(definition, Attribute.PARAMETER_MAXIMUM));
            errors = this.filterErrors(errors);
            if (errors.length === 0) {
                let minimum: Date = new Date(definition[Attribute.PARAMETER_MINIMUM]);
                let maximum: Date = new Date(definition[Attribute.PARAMETER_MAXIMUM]);
                if (minimum !== undefined && maximum !== undefined) {
                    errors.push(this.mustBeGreater(
                        definition, Attribute.PARAMETER_MINIMUM, Attribute.PARAMETER_MAXIMUM, minimum, maximum, true
                    ));
                }
            }
            return this.filterErrors(errors);
        }

        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let value: string = definition[Attribute.PARAMETER_VALUE];
            let required: boolean = definition[Attribute.PARAMETER_REQUIRED];
            let minimum: string = definition[Attribute.PARAMETER_MINIMUM];
            let maximum: string = definition[Attribute.PARAMETER_MAXIMUM];
            return new Datetime(name, value, required, minimum, maximum);
        }
    }
}
