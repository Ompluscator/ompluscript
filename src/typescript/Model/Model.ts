/// <reference path="../Core/Interfaces/IBase.ts" />

module Ompluscript.Model {
    "use strict";

    import IBase = Ompluscript.Core.Interfaces.IBase;

    export class Model implements IBase {

        public getName(): string {
            return "Model";
        }

        public getStackTrace(): string {
            return "Class Model";
        }

    }
}


