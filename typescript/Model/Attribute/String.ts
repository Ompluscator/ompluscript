/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {


    export class String extends AbstractAttribute<string> {

        private minimumLength: number;
        private maximumLength: number;

        constructor(name: string, value: string, required: boolean, minimumLength: number, maximumLength: number) {
            super(name, value, required);
            this.minimumLength = minimumLength;
            this.maximumLength = maximumLength;
        }
        
        private getMinimumLength(): number {
            return this.minimumLength;
        }
        
        private getMaximumLength(): number {
            return this.maximumLength;
        }

        public validate(): void {
            if ((this.required === true && this.value === null) || typeof this.value !== 'string') {
                throw new TypeError('Attribute ' + this.name + ' is not a string.');
            } else if (this.value !== null && this.minimumLength !== null && this.value.length < this.minimumLength) {
                throw new RangeError('Attribute ' + this.name + ' is string with less length than minimum allowed.');
            } else if (this.value !== null && this.maximumLength !== null && this.value.length > this.maximumLength) {
                throw new RangeError('Attribute ' + this.name + ' is string with greater length than maximum allowed.');
            }
        }

    }

}