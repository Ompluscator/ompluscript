/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="ComponentConfiguration.ts" />
/// <reference path="../Layout/TableLayout.ts" />

module Ompluscript.View.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import TableLayout = Ompluscript.View.Layout.TableLayout;

    export class TableLayoutConfiguration extends ComponentConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === TableLayout.TYPE_LINEAR_LAYOUT;
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_ROWS));
            errors.push(this.shouldBeNumber(definition, TableLayout.PARAMETER_CELLS));
            return this.filterErrors(errors);
        }

        public create(definition: Object): IBase {
            let rows: number = definition[TableLayout.PARAMETER_ROWS];
            let cells: number = definition[TableLayout.PARAMETER_CELLS];
            return new TableLayout(rows, cells);
        }
    }
}
