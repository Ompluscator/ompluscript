/// <reference path="../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Core/Configuration/Configuration.ts" />
/// <reference path="ProxyConfiguration.ts" />
/// <reference path="../Proxy/AjaxProxy.ts" />
/// <reference path="../Container/Container.ts" />

module Ompluscript.Model.Configuration {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import AjaxProxy = Ompluscript.Model.Proxy.AjaxProxy;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Container = Ompluscript.Model.Container.Container;

    export class AjaxProxyConfiguration extends ProxyConfiguration {

        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === AjaxProxy.TYPE_AJAX_PROXY;
        }

        public getErrors(definition: Object): string[] {
            let errors: string[] = [];
            errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_SAVE_LINK));
            errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_UPDATE_LINK));
            errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_DELETE_LINK));
            errors.push(this.mustBeString(definition, AjaxProxy.PARAMETER_SELECT_LINK));
            return this.filterErrors(errors);
        }

        public create(definition: Object, container: Container = undefined): IBase {
            let saveLink: string = definition[AjaxProxy.PARAMETER_SAVE_LINK];
            let updateLink: string = definition[AjaxProxy.PARAMETER_UPDATE_LINK];
            let deleteLink: string = definition[AjaxProxy.PARAMETER_DELETE_LINK];
            let selectLink: string = definition[AjaxProxy.PARAMETER_SELECT_LINK];
            return new AjaxProxy(container, saveLink, updateLink, deleteLink, selectLink);
        }
    }
}
