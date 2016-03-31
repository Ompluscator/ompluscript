/// <reference path="AbstractAttribute.ts" />

module Ompluscript.Model.Attribute {


    export class Boolean extends AbstractAttribute<boolean> {

        public validate(): void {
            if ((this.required === true && this.value === null) || typeof this.value !== 'boolean') {
                throw new TypeError('Attribute ' + this.name + ' is not a boolean.');
            }
        }

    }

}