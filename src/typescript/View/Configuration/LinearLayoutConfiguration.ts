/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="ComponentConfiguration.ts" />
/// <reference path="../Layout/LinearLayout.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import LinearLayout = Ompluscript.View.Layout.LinearLayout;

    export class LinearLayoutConfiguration extends ComponentConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === LinearLayout.TYPE_LINEAR_LAYOUT;
        }

        public getErrors(definition: Object, prefix: string): string[] {
            let errors: string[] = super.getErrors(definition, prefix);
            let error: string = this.shouldBeString(definition, LinearLayout.PARAMETER_DIRECTION, prefix);
            if (error === undefined) {
                let values: string[] = [LinearLayout.DIRECTION_VERTICAL, LinearLayout.DIRECTION_HORIZONTAL];
                errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_DIRECTION, values, prefix));
            } else {
                errors.push(error);
            }
            error = this.shouldBeString(definition, LinearLayout.PARAMETER_ALIGN, prefix);
            if (error === undefined) {
                let values: string[] = [LinearLayout.ALIGN_START, LinearLayout.ALIGN_CENTER, LinearLayout.ALIGN_END];
                errors.push(this.mustBeValue(definition, LinearLayout.PARAMETER_ALIGN, values, prefix));
            } else {
                errors.push(error);
            }
            errors.push(this.shouldBeBoolean(definition, LinearLayout.PARAMETER_REVERSE, prefix));
            return this.filterErrors(errors);
        }

        public create(definition: Object): IBase {
            let direction: string = definition[LinearLayout.PARAMETER_DIRECTION];
            let reverse: boolean = definition[LinearLayout.PARAMETER_REVERSE];
            let align: string = definition[LinearLayout.PARAMETER_ALIGN];
            return new LinearLayout(direction, reverse, align);
        }
    }
}
