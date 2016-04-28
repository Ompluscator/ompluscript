/// <reference path="Component.ts" />

/**
 * Module that contains base components
 *
 * @module Ompluscript.View.Component
 */
module Ompluscript.View.Component {
    "use strict";

    /**
     * Class that defines basic field
     *
     * @class Field
     */
    export abstract class Field extends Component {

        constructor(name: string) {
            super(name);
        }

        public render(): HTMLElement {
            return this.htmlElement;
        }
    }

}
