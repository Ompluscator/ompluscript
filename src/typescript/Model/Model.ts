/// <reference path="../Core/Interfaces/IBase.ts" />
/// <reference path="Attribute/Unit.ts" />
/// <reference path="Attribute/Boolean.ts" />
/// <reference path="Attribute/Datetime.ts" />
/// <reference path="Attribute/MultipleChoice.ts" />
/// <reference path="Attribute/Number.ts" />
/// <reference path="Attribute/SingleChoice.ts" />
/// <reference path="Attribute/String.ts" />

module Ompluscript.Model {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;
    import General = Ompluscript.Core.Utils.General;
    import Unit = Ompluscript.Model.Attribute.Unit;
    import BooleanUnit = Ompluscript.Model.Attribute.Boolean;
    import NumberUnit = Ompluscript.Model.Attribute.Number;
    import StringUnit = Ompluscript.Model.Attribute.String;
    import Datetime = Ompluscript.Model.Attribute.Datetime;
    import SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
    import MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;

    export class Model implements IBase {

        protected name: string;

        protected attributes: Object;

        constructor(name: string, attributes: Object[]) {
            this.name = name;
            this.attributes = {};
            for (let i in attributes) {
                if (attributes.hasOwnProperty(i)) {
                    this.addAttribute(attributes[i]);
                }
            }
        }

        public getAttribute(name: string): Unit<any> {
            return this.attributes[name];
        }

        public getName(): string {
            return this.name;
        }

        public getStackTrace(): Object {
            let trace: Object = {
                attributes: {},
                name: this.name,
            };
            for (let i in this.attributes) {
                if (this.attributes.hasOwnProperty(i)) {
                    trace["attributes"][i] = this.attributes[i];
                }
            }
            return trace;
        }

        private addAttribute(attribute: Object): void {
            switch (attribute[Unit.PARAMETER_TYPE]) {
                case Unit.TYPE_BOOLEAN:
                    this.addBoolean(attribute);
                    break;
                case Unit.TYPE_NUMBER:
                    this.addNumber(attribute);
                    break;
                case Unit.TYPE_STRING:
                    this.addString(attribute);
                    break;
                case Unit.TYPE_DATETIME:
                    this.addDatetime(attribute);
                    break;
                case Unit.TYPE_SINGLE_CHOICE:
                    this.addSingleChoice(attribute);
                    break;
                case Unit.TYPE_MULTIPLE_CHOICE:
                    this.addMultipleChoice(attribute);
                    break;
                default:
                    General.throwConfigurationException(Model, {
                        type: attribute[Unit.PARAMETER_TYPE],
                    });
                    break;
            }
        }

        private addBoolean(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: boolean = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            this.attributes[name] = new BooleanUnit(name, value, required);
        }

        private addNumber(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: number = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let minimum: number = attribute[Unit.PARAMETER_MINIMUM];
            let includeMinimum: boolean = attribute[NumberUnit.PARAMETER_INCLUDE_MINIMUM];
            let maximum: number = attribute[Unit.PARAMETER_MAXIMUM];
            let includeMaximum: boolean = attribute[NumberUnit.PARAMETER_INCLUDE_MAXIMUM];
            this.attributes[name] = new NumberUnit(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
        }

        private addString(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: string = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let minimumLength: number = attribute[StringUnit.PARAMETER_MINIMUM_LENGTH];
            let maximumLength: number = attribute[StringUnit.PARAMETER_MAXIMUM_LENGTH];
            let pattern: RegExp = attribute[StringUnit.PARAMETER_PATTERN];
            this.attributes[name] = new StringUnit(name, value, required, minimumLength, maximumLength, pattern);
        }

        private addDatetime(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: string = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let minimum: string = attribute[Unit.PARAMETER_MINIMUM];
            let maximum: string = attribute[Unit.PARAMETER_MAXIMUM];
            this.attributes[name] = new Datetime(name, value, required, minimum, maximum);
        }

        private addSingleChoice(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: number = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let values: number[] = attribute[Unit.PARAMETER_VALUES];
            this.attributes[name] = new SingleChoice(name, value, required, values);
        }

        private addMultipleChoice(attribute: Object): void {
            let name: string = attribute[Unit.PARAMETER_NAME];
            let value: number[] = attribute[Unit.PARAMETER_VALUE];
            let required: boolean = attribute[Unit.PARAMETER_REQUIRED];
            let values: number[] = attribute[Unit.PARAMETER_VALUES];
            this.attributes[name] = new MultipleChoice(name, value, required, values);
        }

    }
}


