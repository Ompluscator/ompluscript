/// <reference path="../Component/ComponentConfiguration.ts" />
/// <reference path="../../Field/Field.ts" />

/**
 * Module that contains fields' configuration classes.
 *
 * @module Ompluscript.View.Configuration.Field
 */
module Ompluscript.View.Configuration.Field {
    "use strict";
    
    import ComponentConfiguration = Ompluscript.View.Configuration.Component.ComponentConfiguration;
    import Field = Ompluscript.View.Field.Field;

    /**
     * Abstract class that contains functionality for field configuration.
     *
     * @class FieldConfiguration
     */
    export abstract class FieldConfiguration extends ComponentConfiguration {

        /**
         * Method that attach events from definition to feild
         * 
         * @param {Object} definition Field's definition
         * @param {Field} field Desired field
         */
        protected attachEvents(definition: Object, field: Field): void {
            if (definition[Field.PARAMETER_EVENTS] !== undefined) {
                let onFieldClick: Function =
                    definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_CLICK];
                if (onFieldClick !== undefined) {
                    field.attachOnFieldClickEvent(field, onFieldClick);
                }
                let onFieldFocus: Function =
                    definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_FOCUS];
                if (onFieldFocus !== undefined) {
                    field.attachOnFieldFocusEvent(field, onFieldFocus);
                }
                let onFieldBlur: Function =
                    definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_BLUR];
                if (onFieldBlur !== undefined) {
                    field.attachOnFieldBlurEvent(field, onFieldBlur);
                }
                let onFieldMouseEnter: Function =
                    definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_MOUSE_ENTER];
                if (onFieldMouseEnter !== undefined) {
                    field.attachOnFieldMouseEnterEvent(field, onFieldMouseEnter);
                }
                let onFieldMouseLeave: Function =
                    definition[Field.PARAMETER_EVENTS][Field.PARAMETER_ON_FIELD_MOUSE_LEAVE];
                if (onFieldMouseLeave !== undefined) {
                    field.attachOnFieldMouseLeaveEvent(field, onFieldMouseLeave);
                }
            }
        }
    }
}
