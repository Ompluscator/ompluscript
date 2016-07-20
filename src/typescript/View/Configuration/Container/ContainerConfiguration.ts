/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../../Core/Configuration/GroupConfiguration.ts" />

/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Container = Ompluscript.View.Container.Container;
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;

    /**
     * Abstract class that contains functionality for container configuration.
     *
     * @class InputConfiguration
     */
    export abstract class ContainerConfiguration extends ComponentConfiguration {

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeArray(definition, Container.PARAMETER_CHILDREN));
            if (Array.isArray(definition[Container.PARAMETER_CHILDREN])) {
                errors.push.apply(errors, super.getErrorsForChildren(
                    definition, Container.PARAMETER_CHILDREN, Ompluscript.View.Creator.getInstance())
                );
            }
            errors.push(this.shouldBeObject(definition, Container.PARAMETER_LAYOUT));
            if (typeof definition[Container.PARAMETER_LAYOUT] === "object") {
                errors.push.apply(errors, super.getErrorsForChildren(definition, Container.PARAMETER_LAYOUT));
            }
            return this.filterErrors(errors);
        }
    }
}
