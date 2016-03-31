/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {

    export class Number extends AbstractAttribute<number> {

        private minimum: number;
        private maximum: number;

        constructor(name: string, value: number, required: boolean, minimum: number, maximum: number) {
            super(name, value, required);
            this.minimum = minimum;
            this.maximum = maximum;
        }

        public getMinimum(): number {
            return this.minimum;
        }

        public getMaximum(): number {
            return this.maximum;
        }

        public validate(): void {
            if ((this.required === true && this.value === null) || typeof this.value !== 'number') {
                throw new TypeError('Attribute ' + this.name + ' is not a number.');
            } else if (this.value !== null && this.minimum !== null && this.value < this.minimum) {
                throw new RangeError('Attribute ' + this.name + ' is less than minimum allowed number.');
            } else if (this.value !== null && this.maximum !== null && this.value > this.maximum) {
                throw new RangeError('Attribute ' + this.name + ' is greater than maximum allowed number.');
            }
        }

    }

}