/// <reference path="../../../Core/Interfaces/IBase.ts" />
/// <reference path="../../Component/Component.ts" />
/// <reference path="../../Container/Form.ts" />
/// <reference path="../../../Core/Configuration/Configuration.ts" />
/// <reference path="../../Container/Container.ts" />
/// <reference path="../../Layout/Layout.ts" />
/// <reference path="../../Field/Input.ts" />
/// <reference path="ContainerConfiguration.ts" />
/// <reference path="../Field/CheckBoxInputConfiguration.ts" />
/// <reference path="../Field/EmailInputConfiguration.ts" />
/// <reference path="../Field/NumberInputConfiguration.ts" />
/// <reference path="../Field/PasswordInputConfiguration.ts" />
/// <reference path="../Field/TextInputConfiguration.ts" />
/// <reference path="../Field/DateInputConfiguration.ts" />
/// <reference path="../Field/InputConfiguration.ts" />
/// <reference path="../Layout/NullLayoutConfiguration.ts" />
/// <reference path="../Layout/RelativeLayoutConfiguration.ts" />
/// <reference path="../Layout/LinearLayoutConfiguration.ts" />
/// <reference path="../Layout/TableLayoutConfiguration.ts" />
/// <reference path="../../../Model/Configuration/Container/ModelConfiguration.ts" />
/// <reference path="../../../Model/Container/Model.ts" />
/**
 * Module that contains containers' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Container
 */
module Ompluscript.View.Configuration.Container {
    "use strict";
    
    import Configuration = Ompluscript.Core.Configuration.Configuration;
    import Form = Ompluscript.View.Container.Form;
    import IBase = Ompluscript.Core.Interfaces.IBase;
    import Component = Ompluscript.View.Component.Component;
    import Container = Ompluscript.View.Container.Container;
    import Layout = Ompluscript.View.Layout.Layout;
    import ErrorConfiguration = Ompluscript.Core.Configuration.ErrorConfiguration;
    import NullLayoutConfiguration = Ompluscript.View.Configuration.Layout.NullLayoutConfiguration;
    import RelativeLayoutConfiguration = Ompluscript.View.Configuration.Layout.RelativeLayoutConfiguration;
    import LinearLayoutConfiguration = Ompluscript.View.Configuration.Layout.LinearLayoutConfiguration;
    import TableLayoutConfiguration = Ompluscript.View.Configuration.Layout.TableLayoutConfiguration;
    import CheckBoxInputConfiguration = Ompluscript.View.Configuration.Field.CheckBoxInputConfiguration;
    import EmailInputConfiguration = Ompluscript.View.Configuration.Field.EmailInputConfiguration;
    import NumberInputConfiguration = Ompluscript.View.Configuration.Field.NumberInputConfiguration;
    import PasswordInputConfiguration = Ompluscript.View.Configuration.Field.PasswordInputConfiguration;
    import TextInputConfiguration = Ompluscript.View.Configuration.Field.TextInputConfiguration;
    import DateInputConfiguration = Ompluscript.View.Configuration.Field.DateInputConfiguration;
    import ModelConfiguration = Ompluscript.Model.Configuration.Container.ModelConfiguration;
    import Model = Ompluscript.Model.Container.Model;
    import Input = Ompluscript.View.Field.Input;
    import InputConfiguration = Ompluscript.View.Configuration.Field.InputConfiguration;

    /**
     * Class that contains functionality for form configuration.
     *
     * @class FormConfiguration
     */
    export class FormConfiguration extends ContainerConfiguration {

        /**
         * Class constructor.
         *
         * Creates configuration list for children and layouts.
         * Calls constructor of superclass.
         *
         * @constructs
         */
        constructor() {
            let layouts: Object[] = [
                NullLayoutConfiguration,
                RelativeLayoutConfiguration,
                LinearLayoutConfiguration,
                TableLayoutConfiguration,
                ErrorConfiguration,
            ];
            let children: Object[] = [
                CheckBoxInputConfiguration,
                EmailInputConfiguration,
                NumberInputConfiguration,
                PasswordInputConfiguration,
                TextInputConfiguration,
                DateInputConfiguration,
                ErrorConfiguration,
            ];
            let model: Object[] = [
                ModelConfiguration,
            ];
            let configurations: Object = {};
            configurations[Container.PARAMETER_LAYOUT] = layouts;
            configurations[Container.PARAMETER_CHILDREN] = children;
            configurations[Form.PARAMETER_MODEL] = model;
            super(configurations);
        }

        /**
         * Method that decides if this configuration is related to this class.
         *
         * @param {Object} definition Class definition
         * @returns {boolean} Is related to this class
         */
        public isRelatedTo(definition: Object): boolean {
            return definition[Configuration.PARAMETER_TYPE] === Form.TYPE_FORM;
        }

        /**
         * Method that searches for errors in configuration
         *
         * @param {Object} definition Class definition
         * @returns {string[]} List of errors
         */
        public getErrors(definition: Object): string[] {
            let errors: string[] = super.getErrors(definition);
            errors.push(this.shouldBeStringOrObject(definition, Form.PARAMETER_MODEL));
            if (typeof definition[Form.PARAMETER_MODEL] === "object") {
                errors.push.apply(errors, super.getErrorsForChildren(definition, Form.PARAMETER_MODEL));
            }
            errors.push(this.mustBeString(definition, Form.PARAMETER_PROXY));
            errors.push(this.mustBeString(definition, Form.PARAMETER_BUTTON_ASSET));
            errors = this.filterErrors(errors);
            return this.filterErrors(errors);
        }

        /**
         * Method that creates new instance from configuration
         *
         * @param {Object} definition Class definition
         * @returns {IBase} New instance
         */
        public create(definition: Object): IBase {
            let name: string = definition[Configuration.PARAMETER_NAME];
            let layout: Layout = <Layout>super.createChild(definition, Container.PARAMETER_LAYOUT);
            let model: Model = <Model>super.createChild(definition, Form.PARAMETER_MODEL, Ompluscript.Model.Creator.getInstance());
            let styles: Object = definition[Component.PARAMETER_STYLES];
            let proxy: string = definition[Form.PARAMETER_PROXY];
            let buttonAsset: string = definition[Form.PARAMETER_BUTTON_ASSET];
            let inputs: Input[] = [];
            let children: Object[] = definition[Form.PARAMETER_CHILDREN];
            let configurations: {new ()}[] = this.configurations[Form.PARAMETER_CHILDREN];
            for (let i: number = 0; i < children.length; i++) {
                for (let j: number = 0; j < configurations.length; j++) {
                    let configuration: InputConfiguration = <InputConfiguration>Configuration.getInstance(configurations[j]);
                    if (configuration.isRelatedTo(children[i])) {
                        inputs.push(<Input>configuration.create(
                            children[i], model.getAttribute(children[i][Configuration.PARAMETER_NAME])
                        ));
                        break;
                    }
                }
            }
            return new Form(name, layout, proxy, buttonAsset, model, inputs, styles);
        }
    }
}
