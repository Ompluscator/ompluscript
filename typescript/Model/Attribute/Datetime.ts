/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {


    export class Datetime extends AbstractAttribute<string> {

        private minimum: Date;
        private maximum: Date;

        constructor(name: string, value: string, required: boolean, minimum: string, maximum: string) {
            super(name, value, required);
            this.minimum = new Date(minimum);
            this.maximum = new Date(maximum);
        }
        
        public getDateObject(): Date {
            return new Date(this.value)
        }

        public validate(): void {
            try {
                if (this.required === true && this.value === null) {
                    throw new TypeError('Attribute ' + this.name + ' is not in right date format.');
                } else if (this.value !== null) {
                    new Date(this.value);
                }
            } catch (ex) {
                throw new TypeError('Attribute ' + this.name + ' is not in right date format.');
            }
            if (this.value !== null && this.minimum !== null && this.getDateObject().getTime() < this.minimum.getTime()) {
                throw new RangeError('Attribute ' + this.name + ' is date with less value than minimum allowed.');
            } else if (this.value !== null && this.maximum !== null && this.getDateObject().getTime() > this.maximum.getTime()) {
                throw new RangeError('Attribute ' + this.name + ' is date with greater value than maximum allowed.');
            }
        }

    }

}