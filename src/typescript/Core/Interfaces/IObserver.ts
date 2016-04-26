module Ompluscript.Core.Interfaces {
    "use strict";

    export interface IObserver {
        
        update(observable: Observable, type: number): number;
        
    }

}
