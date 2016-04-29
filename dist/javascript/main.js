var Ompluscript;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Interfaces;
        (function (Interfaces) {
            "use strict";
        })(Interfaces = Core.Interfaces || (Core.Interfaces = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var Event = (function () {
                function Event(sender, type) {
                    this.sender = sender;
                    this.type = type;
                }
                Event.prototype.getSender = function () {
                    return this.sender;
                };
                Event.prototype.getType = function () {
                    return this.type;
                };
                return Event;
            }());
            Observer.Event = Event;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Core;
    (function (Core) {
        var Observer;
        (function (Observer) {
            "use strict";
            var Observable = (function () {
                function Observable() {
                    this.events = {};
                }
                Observable.prototype.addObserverByType = function (observer, type) {
                    if (!this.events.hasOwnProperty(type)) {
                        this.events[type] = [];
                    }
                    this.events[type].push(observer);
                };
                Observable.prototype.deleteObserverByType = function (observer, type) {
                    if (this.events.hasOwnProperty(type)) {
                        for (var i in this.events[type]) {
                            if (this.events[type].hasOwnProperty(i) && this.events[type][i] === observer) {
                                this.events[type].splice(i, 1);
                            }
                        }
                    }
                };
                Observable.prototype.clearObservers = function () {
                    this.events = {};
                };
                Observable.prototype.clearObserversByType = function (type) {
                    if (this.events.hasOwnProperty(type)) {
                        this.events[type] = [];
                    }
                };
                Observable.prototype.dispose = function () {
                    this.clearObservers();
                };
                Observable.prototype.notifyObservers = function (event) {
                    if (this.events[event.getType()] !== undefined) {
                        for (var i in this.events[event.getType()]) {
                            if (this.events[event.getType()].hasOwnProperty(i)) {
                                this.events[event.getType()][i].update(event);
                            }
                        }
                    }
                };
                return Observable;
            }());
            Observer.Observable = Observable;
        })(Observer = Core.Observer || (Core.Observer = {}));
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_1) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var AttributeEvent = (function (_super) {
                __extends(AttributeEvent, _super);
                function AttributeEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                AttributeEvent.ON_UPDATE_ATTRIBUTE = "onUpdateAttribute";
                AttributeEvent.ON_INVALID_ATTRIBUTE = "onInvalidAttribute";
                AttributeEvent.ON_UPDATE_CHOICES = "onUpdateChoices";
                return AttributeEvent;
            }(Event));
            Event_1.AttributeEvent = AttributeEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateAttribute = (function (_super) {
                __extends(OnUpdateAttribute, _super);
                function OnUpdateAttribute(sender, oldValue, newValue) {
                    _super.call(this, sender, Event.AttributeEvent.ON_UPDATE_ATTRIBUTE);
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                }
                OnUpdateAttribute.prototype.getOldValue = function () {
                    return this.oldValue;
                };
                OnUpdateAttribute.prototype.getNewValue = function () {
                    return this.newValue;
                };
                return OnUpdateAttribute;
            }(Event.AttributeEvent));
            Event.OnUpdateAttribute = OnUpdateAttribute;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnInvalidAttribute = (function (_super) {
                __extends(OnInvalidAttribute, _super);
                function OnInvalidAttribute(sender, value, validationCode) {
                    _super.call(this, sender, Event.AttributeEvent.ON_INVALID_ATTRIBUTE);
                    this.value = value;
                    this.validationCode = validationCode;
                }
                OnInvalidAttribute.prototype.getValidationCode = function () {
                    return this.validationCode;
                };
                OnInvalidAttribute.prototype.getValue = function () {
                    return this.value;
                };
                return OnInvalidAttribute;
            }(Event.AttributeEvent));
            Event.OnInvalidAttribute = OnInvalidAttribute;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnInvalidAttribute = Ompluscript.Model.Event.OnInvalidAttribute;
            var Attribute = (function (_super) {
                __extends(Attribute, _super);
                function Attribute(type, name, value, required) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    _super.call(this);
                    this.type = type;
                    this.name = name;
                    this.value = value;
                    this.required = false;
                    if (required === true) {
                        this.required = true;
                    }
                }
                Attribute.prototype.setValue = function (value) {
                    var oldValue = this.value;
                    this.value = value;
                    this.fireOnUpdateAttributeEvent(oldValue, this.value);
                    if (!this.validate()) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                Attribute.prototype.getValue = function () {
                    return this.value;
                };
                Attribute.prototype.resetValue = function () {
                    this.setValue(undefined);
                };
                Attribute.prototype.isRequired = function () {
                    return this.required;
                };
                Attribute.prototype.getName = function () {
                    return this.name;
                };
                Attribute.prototype.getError = function () {
                    return this.error;
                };
                Attribute.prototype.validate = function () {
                    this.error = undefined;
                    if (typeof this.value !== this.type && this.value !== undefined) {
                        this.error = Attribute.ERROR_WRONG_TYPE;
                        return false;
                    }
                    else if (this.required === true && typeof this.value !== this.type) {
                        this.error = Attribute.ERROR_IS_REQUIRED;
                        return false;
                    }
                    return true;
                };
                Attribute.prototype.getStackTrace = function () {
                    var trace = {
                        name: this.name,
                        required: this.required,
                        type: this.type,
                        value: this.value,
                    };
                    return trace;
                };
                Attribute.prototype.fireOnUpdateAttributeEvent = function (oldValue, newValue) {
                    var event = new OnUpdateAttribute(this, oldValue, newValue);
                    this.notifyObservers(event);
                };
                Attribute.prototype.fireOnInvalidAttributeEvent = function (value, validationCode) {
                    var event = new OnInvalidAttribute(this, value, validationCode);
                    this.notifyObservers(event);
                };
                Attribute.ERROR_WRONG_TYPE = 101;
                Attribute.ERROR_IS_REQUIRED = 102;
                Attribute.ERROR_BELOW_MINIMUM = 201;
                Attribute.ERROR_OVER_MAXIMUM = 202;
                Attribute.TYPE_BOOLEAN = "boolean";
                Attribute.TYPE_NUMBER = "number";
                Attribute.TYPE_STRING = "string";
                Attribute.TYPE_DATETIME = "datetime";
                Attribute.TYPE_SINGLE_CHOICE = "singleChoice";
                Attribute.TYPE_MULTIPLE_CHOICE = "multipleChoice";
                Attribute.PARAMETER_TYPE = "type";
                Attribute.PARAMETER_NAME = "name";
                Attribute.PARAMETER_REQUIRED = "required";
                Attribute.PARAMETER_VALUE = "value";
                Attribute.PARAMETER_MINIMUM = "minimum";
                Attribute.PARAMETER_MAXIMUM = "maximum";
                return Attribute;
            }(Observable));
            Attribute_1.Attribute = Attribute;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Boolean = (function (_super) {
                __extends(Boolean, _super);
                function Boolean(name, value, required, mustBeTrue) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (mustBeTrue === void 0) { mustBeTrue = false; }
                    _super.call(this, "boolean", name, value, required);
                    this.mustBeTrue = false;
                    if (mustBeTrue === true) {
                        this.mustBeTrue = true;
                    }
                }
                Boolean.prototype.isMustBeTrue = function () {
                    return this.mustBeTrue;
                };
                Boolean.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== true && this.mustBeTrue === true) {
                            this.error = Boolean.ERROR_MUST_BE_TRUE;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                Boolean.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Boolean.PARAMETER_MUST_BE_TRUE] = this.mustBeTrue;
                    return trace;
                };
                Boolean.PARAMETER_MUST_BE_TRUE = "mustBeTrue";
                Boolean.ERROR_MUST_BE_TRUE = 204;
                return Boolean;
            }(Attribute.Attribute));
            Attribute.Boolean = Boolean;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnUpdateChoices = (function (_super) {
                __extends(OnUpdateChoices, _super);
                function OnUpdateChoices(sender, oldChoices, newChoices) {
                    _super.call(this, sender, Event.AttributeEvent.ON_UPDATE_CHOICES);
                    this.oldChoices = oldChoices;
                    this.newChoices = newChoices;
                }
                OnUpdateChoices.prototype.getOldChoices = function () {
                    return this.oldChoices;
                };
                OnUpdateChoices.prototype.getNewChoices = function () {
                    return this.newChoices;
                };
                return OnUpdateChoices;
            }(Event.AttributeEvent));
            Event.OnUpdateChoices = OnUpdateChoices;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var OnUpdateChoices = Ompluscript.Model.Event.OnUpdateChoices;
            var Choice = (function (_super) {
                __extends(Choice, _super);
                function Choice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, "number", name, value, required);
                    this.choices = choices;
                }
                Choice.prototype.getChoices = function () {
                    return this.choices;
                };
                Choice.prototype.setChoices = function (values) {
                    var oldChoices = this.choices.slice(0);
                    this.choices = values;
                    this.fireOnUpdateChoicesEvent(oldChoices, this.choices);
                };
                Choice.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Choice.PARAMETER_CHOICES] = this.choices;
                    return trace;
                };
                Choice.prototype.fireOnUpdateChoicesEvent = function (oldChoices, newChoices) {
                    var event = new OnUpdateChoices(this, oldChoices, newChoices);
                    this.notifyObservers(event);
                };
                Choice.PARAMETER_CHOICES = "choices";
                Choice.ERROR_VALUE_NOT_ALLOWED = 203;
                return Choice;
            }(Attribute.Attribute));
            Attribute.Choice = Choice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Datetime = (function (_super) {
                __extends(Datetime, _super);
                function Datetime(name, value, required, minimum, maximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (maximum === void 0) { maximum = undefined; }
                    _super.call(this, "string", name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                    if (minimum !== undefined) {
                        this.minimumObject = new Date(minimum);
                    }
                    if (maximum !== undefined) {
                        this.maximumObject = new Date(maximum);
                    }
                }
                Datetime.prototype.getDateObject = function () {
                    return new Date(this.value);
                };
                Datetime.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Datetime.prototype.getMinimumDateObject = function () {
                    return this.minimumObject;
                };
                Datetime.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Datetime.prototype.getMaximumDateObject = function () {
                    return this.maximumObject;
                };
                Datetime.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && isNaN(this.getDateObject().getTime())) {
                            this.error = Attribute.Attribute.ERROR_WRONG_TYPE;
                            return false;
                        }
                        if (this.value !== undefined && this.minimum !== undefined
                            && this.getDateObject().getTime() < this.minimumObject.getTime()) {
                            this.error = Attribute.Attribute.ERROR_BELOW_MINIMUM;
                            return false;
                        }
                        else if (this.value !== undefined && this.maximum !== undefined
                            && this.getDateObject().getTime() > this.maximumObject.getTime()) {
                            this.error = Attribute.Attribute.ERROR_OVER_MAXIMUM;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                Datetime.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Attribute.Attribute.PARAMETER_MINIMUM] = this.minimum;
                    trace["minimumObject"] = this.minimumObject;
                    trace[Attribute.Attribute.PARAMETER_MAXIMUM] = this.maximum;
                    trace["maximumObject"] = this.maximumObject;
                    return trace;
                };
                return Datetime;
            }(Attribute.Attribute));
            Attribute.Datetime = Datetime;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var MultipleChoice = (function (_super) {
                __extends(MultipleChoice, _super);
                function MultipleChoice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, name, value, required, choices);
                }
                MultipleChoice.prototype.setValue = function (value) {
                    var oldValue = this.value;
                    if (Array.isArray(this.value) === true) {
                        oldValue = this.value.slice(0);
                    }
                    this.value = value;
                    this.fireOnUpdateAttributeEvent(oldValue, this.value);
                    if (!this.validate()) {
                        this.fireOnInvalidAttributeEvent(this.value, this.error);
                    }
                };
                MultipleChoice.prototype.validate = function () {
                    this.error = undefined;
                    if (Array.isArray(this.value) === false && this.value !== undefined) {
                        this.error = Attribute.Attribute.ERROR_WRONG_TYPE;
                        return false;
                    }
                    else if (this.required === true && (Array.isArray(this.value) === false || this.value.length === 0)) {
                        this.error = Attribute.Attribute.ERROR_IS_REQUIRED;
                        return false;
                    }
                    if (Array.isArray(this.value) === true) {
                        for (var i in this.value) {
                            if (this.choices.indexOf(this.value[i]) === -1) {
                                this.error = Attribute.Choice.ERROR_VALUE_NOT_ALLOWED;
                                return false;
                            }
                        }
                    }
                    return true;
                };
                return MultipleChoice;
            }(Attribute.Choice));
            Attribute.MultipleChoice = MultipleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Number = (function (_super) {
                __extends(Number, _super);
                function Number(name, value, required, minimum, includeMinimum, maximum, includeMaximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (includeMinimum === void 0) { includeMinimum = false; }
                    if (maximum === void 0) { maximum = undefined; }
                    if (includeMaximum === void 0) { includeMaximum = false; }
                    _super.call(this, "number", name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                    this.includeMinimum = false;
                    if (includeMinimum === true) {
                        this.includeMinimum = true;
                    }
                    this.includeMaximum = false;
                    if (includeMaximum === true) {
                        this.includeMaximum = true;
                    }
                }
                Number.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Number.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Number.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined) {
                            if (this.minimum !== undefined) {
                                if (this.includeMinimum === false && this.value <= this.minimum) {
                                    this.error = Attribute.Attribute.ERROR_BELOW_MINIMUM;
                                    return false;
                                }
                                else if (this.includeMinimum === true && this.value < this.minimum) {
                                    this.error = Attribute.Attribute.ERROR_BELOW_MINIMUM;
                                    return false;
                                }
                            }
                            if (this.maximum !== undefined) {
                                if (this.includeMaximum === false && this.value >= this.maximum) {
                                    this.error = Attribute.Attribute.ERROR_OVER_MAXIMUM;
                                    return false;
                                }
                                else if (this.includeMaximum === true && this.value > this.maximum) {
                                    this.error = Attribute.Attribute.ERROR_OVER_MAXIMUM;
                                    return false;
                                }
                            }
                        }
                        return true;
                    }
                    return false;
                };
                Number.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[Attribute.Attribute.PARAMETER_MINIMUM] = this.minimum;
                    trace[Number.PARAMETER_INCLUDE_MINIMUM] = this.includeMinimum;
                    trace[Attribute.Attribute.PARAMETER_MAXIMUM] = this.maximum;
                    trace[Number.PARAMETER_INCLUDE_MAXIMUM] = this.includeMaximum;
                    return trace;
                };
                Number.PARAMETER_INCLUDE_MINIMUM = "includeMinimum";
                Number.PARAMETER_INCLUDE_MAXIMUM = "includeMaximum";
                return Number;
            }(Attribute.Attribute));
            Attribute.Number = Number;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var SingleChoice = (function (_super) {
                __extends(SingleChoice, _super);
                function SingleChoice(name, value, required, choices) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (choices === void 0) { choices = []; }
                    _super.call(this, name, value, required, choices);
                }
                SingleChoice.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && this.choices.indexOf(this.value) === -1) {
                            this.error = Attribute.Choice.ERROR_VALUE_NOT_ALLOWED;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                return SingleChoice;
            }(Attribute.Choice));
            Attribute.SingleChoice = SingleChoice;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var String = (function (_super) {
                __extends(String, _super);
                function String(name, value, required, minimumLength, maximumLength, pattern) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimumLength === void 0) { minimumLength = undefined; }
                    if (maximumLength === void 0) { maximumLength = undefined; }
                    if (pattern === void 0) { pattern = undefined; }
                    _super.call(this, "string", name, value, required);
                    this.minimumLength = minimumLength;
                    this.maximumLength = maximumLength;
                    this.pattern = pattern;
                }
                String.prototype.getMinimumLength = function () {
                    return this.minimumLength;
                };
                String.prototype.getMaximumLength = function () {
                    return this.maximumLength;
                };
                String.prototype.getPattern = function () {
                    return this.pattern;
                };
                String.prototype.validate = function () {
                    if (_super.prototype.validate.call(this)) {
                        if (this.value !== undefined && this.minimumLength !== undefined && this.value["length"] < this.minimumLength) {
                            this.error = String.ERROR_BELOW_MINIMUM_LENGTH;
                            return false;
                        }
                        else if (this.value !== undefined && this.maximumLength !== undefined && this.value["length"] > this.maximumLength) {
                            this.error = String.ERROR_OVER_MAXIMUM_LENGTH;
                            return false;
                        }
                        else if (this.value !== undefined && this.pattern !== undefined && this.pattern.test(this.value) === false) {
                            this.error = String.ERROR_PATTERN_NOT_MATCH;
                            return false;
                        }
                        return true;
                    }
                    return false;
                };
                String.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace[String.PARAMETER_MINIMUM_LENGTH] = this.minimumLength;
                    trace[String.PARAMETER_MAXIMUM_LENGTH] = this.maximumLength;
                    trace[String.PARAMETER_PATTERN] = this.pattern;
                    return trace;
                };
                String.ERROR_BELOW_MINIMUM_LENGTH = 211;
                String.ERROR_OVER_MAXIMUM_LENGTH = 212;
                String.ERROR_PATTERN_NOT_MATCH = 221;
                String.PARAMETER_MINIMUM_LENGTH = "minimumLength";
                String.PARAMETER_MAXIMUM_LENGTH = "maximumLength";
                String.PARAMETER_PATTERN = "pattern";
                return String;
            }(Attribute.Attribute));
            Attribute.String = String;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Container;
        (function (Container_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, definition) {
                    if (definition === void 0) { definition = []; }
                    _super.call(this);
                    this.name = name;
                    this.definition = definition;
                }
                Container.prototype.getName = function () {
                    return this.name;
                };
                Container.prototype.getStackTrace = function () {
                    var trace = {
                        definition: this.definition,
                        name: this.name,
                    };
                    return trace;
                };
                Container.CONTAINER_MODEL = "model";
                Container.CONTAINER_TABLE = "table";
                return Container;
            }(Observable));
            Container_1.Container = Container;
        })(Container = Model.Container || (Model.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_1) {
        var Container;
        (function (Container_2) {
            "use strict";
            var Container = Ompluscript.Model.Container.Container;
            var Attribute = Ompluscript.Model.Attribute.Attribute;
            var BooleanAttribute = Ompluscript.Model.Attribute.Boolean;
            var NumberAttribute = Ompluscript.Model.Attribute.Number;
            var StringAttribute = Ompluscript.Model.Attribute.String;
            var Datetime = Ompluscript.Model.Attribute.Datetime;
            var SingleChoice = Ompluscript.Model.Attribute.SingleChoice;
            var MultipleChoice = Ompluscript.Model.Attribute.MultipleChoice;
            var Choice = Ompluscript.Model.Attribute.Choice;
            var Model = (function (_super) {
                __extends(Model, _super);
                function Model(name, definition) {
                    _super.call(this, name, definition);
                    this.attributes = {};
                    for (var i in this.definition) {
                        if (this.definition.hasOwnProperty(i)) {
                            this.addAttribute(this.definition[i]);
                        }
                    }
                }
                Model.prototype.hasAttribute = function (name) {
                    return this.attributes.hasOwnProperty(name);
                };
                Model.prototype.getAttribute = function (name) {
                    return this.attributes[name];
                };
                Model.prototype.setValue = function (values) {
                    for (var i in values) {
                        if (values.hasOwnProperty(i) && this.hasAttribute(i)) {
                            this.getAttribute(i).setValue(values[i]);
                        }
                    }
                };
                Model.prototype.validate = function () {
                    var result = true;
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            result = result && this.attributes[i].validate();
                        }
                    }
                    return result;
                };
                Model.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["attributes"] = {};
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            trace["attributes"][i] = this.attributes[i].getStackTrace();
                        }
                    }
                    return trace;
                };
                Model.prototype.dispose = function () {
                    for (var i in this.attributes) {
                        if (this.attributes.hasOwnProperty(i)) {
                            this.attributes[i].dispose();
                        }
                    }
                };
                Model.prototype.addAttribute = function (definition) {
                    switch (definition[Attribute.PARAMETER_TYPE]) {
                        case Attribute.TYPE_BOOLEAN:
                            this.addBoolean(definition);
                            break;
                        case Attribute.TYPE_NUMBER:
                            this.addNumber(definition);
                            break;
                        case Attribute.TYPE_STRING:
                            this.addString(definition);
                            break;
                        case Attribute.TYPE_DATETIME:
                            this.addDatetime(definition);
                            break;
                        case Attribute.TYPE_SINGLE_CHOICE:
                            this.addSingleChoice(definition);
                            break;
                        case Attribute.TYPE_MULTIPLE_CHOICE:
                            this.addMultipleChoice(definition);
                            break;
                        default:
                            break;
                    }
                };
                Model.prototype.addBoolean = function (definition) {
                    var name = definition[Attribute.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var mustBeTrue = definition[BooleanAttribute.PARAMETER_MUST_BE_TRUE];
                    this.attributes[name] = new BooleanAttribute(name, value, required, mustBeTrue);
                };
                Model.prototype.addNumber = function (definition) {
                    var name = definition[Attribute.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var minimum = definition[Attribute.PARAMETER_MINIMUM];
                    var includeMinimum = definition[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
                    var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                    var includeMaximum = definition[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                    this.attributes[name] = new NumberAttribute(name, value, required, minimum, includeMinimum, maximum, includeMaximum);
                };
                Model.prototype.addString = function (definition) {
                    var name = definition[Attribute.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var minimumLength = definition[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                    var maximumLength = definition[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                    var pattern = definition[StringAttribute.PARAMETER_PATTERN];
                    this.attributes[name] = new StringAttribute(name, value, required, minimumLength, maximumLength, pattern);
                };
                Model.prototype.addDatetime = function (definition) {
                    var name = definition[Attribute.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var minimum = definition[Attribute.PARAMETER_MINIMUM];
                    var maximum = definition[Attribute.PARAMETER_MAXIMUM];
                    this.attributes[name] = new Datetime(name, value, required, minimum, maximum);
                };
                Model.prototype.addSingleChoice = function (definition) {
                    var name = definition[Attribute.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var choices = definition[Choice.PARAMETER_CHOICES];
                    this.attributes[name] = new SingleChoice(name, value, required, choices);
                };
                Model.prototype.addMultipleChoice = function (definition) {
                    var name = definition[Attribute.PARAMETER_NAME];
                    var value = definition[Attribute.PARAMETER_VALUE];
                    var required = definition[Attribute.PARAMETER_REQUIRED];
                    var choices = definition[Choice.PARAMETER_CHOICES];
                    this.attributes[name] = new MultipleChoice(name, value, required, choices);
                };
                return Model;
            }(Container));
            Container_2.Model = Model;
        })(Container = Model_1.Container || (Model_1.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event_2) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var TableEvent = (function (_super) {
                __extends(TableEvent, _super);
                function TableEvent(sender, type) {
                    _super.call(this, sender, type);
                }
                TableEvent.ON_ADD_ROW_TO_TABLE = "onAddRowToTable";
                TableEvent.ON_REMOVE_ROW_FROM_TABLE = "onRemoveRowFromTable";
                TableEvent.ON_CLEAR_TABLE = "onClearTable";
                return TableEvent;
            }(Event));
            Event_2.TableEvent = TableEvent;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_2) {
        var Event;
        (function (Event) {
            "use strict";
            var OnAddRowToTable = (function (_super) {
                __extends(OnAddRowToTable, _super);
                function OnAddRowToTable(sender, index, model) {
                    _super.call(this, sender, Event.TableEvent.ON_ADD_ROW_TO_TABLE);
                    this.index = index;
                    this.model = model;
                }
                OnAddRowToTable.prototype.getModel = function () {
                    return this.model;
                };
                OnAddRowToTable.prototype.getIndex = function () {
                    return this.index;
                };
                return OnAddRowToTable;
            }(Event.TableEvent));
            Event.OnAddRowToTable = OnAddRowToTable;
        })(Event = Model_2.Event || (Model_2.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnRemoveRowFromTable = (function (_super) {
                __extends(OnRemoveRowFromTable, _super);
                function OnRemoveRowFromTable(sender, index) {
                    _super.call(this, sender, Event.TableEvent.ON_REMOVE_ROW_FROM_TABLE);
                    this.index = index;
                }
                OnRemoveRowFromTable.prototype.getIndex = function () {
                    return this.index;
                };
                return OnRemoveRowFromTable;
            }(Event.TableEvent));
            Event.OnRemoveRowFromTable = OnRemoveRowFromTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Event;
        (function (Event) {
            "use strict";
            var OnClearTable = (function (_super) {
                __extends(OnClearTable, _super);
                function OnClearTable(sender) {
                    _super.call(this, sender, Event.TableEvent.ON_CLEAR_TABLE);
                }
                return OnClearTable;
            }(Event.TableEvent));
            Event.OnClearTable = OnClearTable;
        })(Event = Model.Event || (Model.Event = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_3) {
        var Container;
        (function (Container_3) {
            "use strict";
            var Model = Ompluscript.Model.Container.Model;
            var Container = Ompluscript.Model.Container.Container;
            var OnAddRowToTable = Ompluscript.Model.Event.OnAddRowToTable;
            var OnRemoveRowFromTable = Ompluscript.Model.Event.OnRemoveRowFromTable;
            var OnClearTable = Ompluscript.Model.Event.OnClearTable;
            var Table = (function (_super) {
                __extends(Table, _super);
                function Table(name, definition) {
                    _super.call(this, name, definition);
                    this.rows = [];
                }
                Table.prototype.count = function () {
                    return this.rows.length;
                };
                Table.prototype.each = function (callback) {
                    for (var i = 0; i < this.rows.length; i++) {
                        callback(i, this.rows[i]);
                    }
                };
                Table.prototype.hasRowOnIndex = function (index) {
                    return this.rows[index] !== undefined;
                };
                Table.prototype.getRowByIndex = function (index) {
                    return this.rows[index];
                };
                Table.prototype.addRow = function (values) {
                    var model = new Model(this.name, this.definition);
                    this.rows.push(model);
                    this.fireOnAddRowToTableEvent(this.rows.length - 1, model);
                    model.setValue(values);
                };
                Table.prototype.clearRows = function () {
                    this.dispose();
                    this.rows = [];
                    this.fireOnClearTableEvent();
                };
                Table.prototype.removeRowByIndex = function (index) {
                    this.rows.splice(index, 1);
                    this.fireOnRemoveRowFromTableEvent(index);
                };
                Table.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["rows"] = [];
                    for (var i in this.rows) {
                        if (this.rows[i] !== undefined) {
                            trace["rows"].push(this.rows[i].getStackTrace());
                        }
                    }
                    return trace;
                };
                Table.prototype.validate = function () {
                    var result = true;
                    for (var i in this.rows) {
                        if (this.rows.hasOwnProperty(i)) {
                            result = result && this.rows[i].validate();
                        }
                    }
                    return result;
                };
                Table.prototype.dispose = function () {
                    for (var i in this.rows) {
                        if (this.rows[i] !== undefined) {
                            this.rows[i].dispose();
                        }
                    }
                    this.clearObservers();
                };
                Table.prototype.fireOnAddRowToTableEvent = function (index, model) {
                    var event = new OnAddRowToTable(this, index, model);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnRemoveRowFromTableEvent = function (index) {
                    var event = new OnRemoveRowFromTable(this, index);
                    this.notifyObservers(event);
                };
                Table.prototype.fireOnClearTableEvent = function () {
                    var event = new OnClearTable(this);
                    this.notifyObservers(event);
                };
                return Table;
            }(Container));
            Container_3.Table = Table;
        })(Container = Model_3.Container || (Model_3.Container = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var Model;
    (function (Model_4) {
        "use strict";
        var Attribute = Ompluscript.Model.Attribute.Attribute;
        var NumberAttribute = Ompluscript.Model.Attribute.Number;
        var StringAttribute = Ompluscript.Model.Attribute.String;
        var Container = Ompluscript.Model.Container.Container;
        var Model = Ompluscript.Model.Container.Model;
        var Table = Ompluscript.Model.Container.Table;
        var Choice = Ompluscript.Model.Attribute.Choice;
        var Boolean = Ompluscript.Model.Attribute.Boolean;
        var Creator = (function () {
            function Creator() {
                this.definition = {};
                this.errors = [];
            }
            Creator.getInstance = function () {
                return Creator.instance;
            };
            Creator.prototype.hasErrors = function () {
                return this.errors.length > 0;
            };
            Creator.prototype.getErrors = function () {
                return this.errors;
            };
            Creator.prototype.reset = function () {
                this.definition = [];
                this.errors = [];
            };
            Creator.prototype.define = function (name, type, definition) {
                if (definition === void 0) { definition = []; }
                var errors = [];
                for (var i in definition) {
                    if (definition.hasOwnProperty(i)) {
                        try {
                            errors.push.apply(errors, this.checkConfiguration(definition[i]));
                        }
                        catch (error) {
                            errors.push(JSON.parse(error.message));
                        }
                    }
                }
                if (errors.length) {
                    this.errors.push({
                        definition: definition,
                        errors: errors,
                        name: name,
                        type: type,
                    });
                }
                else {
                    this.definition[name] = {
                        definition: definition,
                        name: name,
                        type: type,
                    };
                }
            };
            Creator.prototype.create = function (name) {
                if (this.definition.hasOwnProperty(name)) {
                    if (this.definition[name].hasOwnProperty("type")) {
                        if (this.definition[name]["type"] === Container.CONTAINER_MODEL) {
                            return new Model(name, this.definition[name]["definition"]);
                        }
                        else if (this.definition[name]["type"] === Container.CONTAINER_TABLE) {
                            return new Table(name, this.definition[name]["definition"]);
                        }
                    }
                }
                return undefined;
            };
            Creator.prototype.checkConfiguration = function (attribute) {
                var errors = [];
                var type = attribute[Attribute.PARAMETER_TYPE];
                var name = attribute[Attribute.PARAMETER_NAME];
                var required = attribute[Attribute.PARAMETER_REQUIRED];
                var mustBeTrue = attribute[Boolean.PARAMETER_MUST_BE_TRUE];
                var minimum = attribute[Attribute.PARAMETER_MINIMUM];
                var includeMinimum = attribute[NumberAttribute.PARAMETER_INCLUDE_MINIMUM];
                var maximum = attribute[Attribute.PARAMETER_MAXIMUM];
                var includeMaximum = attribute[NumberAttribute.PARAMETER_INCLUDE_MAXIMUM];
                var minimumLength = attribute[StringAttribute.PARAMETER_MINIMUM_LENGTH];
                var maximumLength = attribute[StringAttribute.PARAMETER_MAXIMUM_LENGTH];
                var pattern = attribute[StringAttribute.PARAMETER_PATTERN];
                var minimumDate = attribute[Attribute.PARAMETER_MINIMUM];
                var maximumDate = attribute[Attribute.PARAMETER_MAXIMUM];
                var choices = attribute[Choice.PARAMETER_CHOICES];
                switch (type) {
                    case Attribute.TYPE_BOOLEAN:
                        errors = this.checkBooleanConfiguration(name, required, mustBeTrue);
                        break;
                    case Attribute.TYPE_NUMBER:
                        errors = this.checkNumberConfiguration(name, required, minimum, includeMinimum, maximum, includeMaximum);
                        break;
                    case Attribute.TYPE_STRING:
                        errors = this.checkStringConfiguration(name, required, minimumLength, maximumLength, pattern);
                        break;
                    case Attribute.TYPE_DATETIME:
                        errors = this.checkDatetimeConfiguration(name, required, minimumDate, maximumDate);
                        break;
                    case Attribute.TYPE_SINGLE_CHOICE:
                    case Attribute.TYPE_MULTIPLE_CHOICE:
                        errors = this.checkChoiceConfiguration(name, required, choices);
                        break;
                    default:
                        errors.push(Attribute.PARAMETER_TYPE + Creator.HAS_WRONG_VALUE);
                        break;
                }
                return errors;
            };
            Creator.prototype.checkAttributeConfiguration = function (name, required) {
                var errors = [];
                if (typeof name !== "string") {
                    errors.push(Attribute.PARAMETER_NAME + Creator.MUST_BE_STRING);
                }
                if (required !== undefined && typeof required !== "boolean") {
                    errors.push(Attribute.PARAMETER_REQUIRED + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
                }
                return errors;
            };
            Creator.prototype.checkBooleanConfiguration = function (name, required, mustBeTrue) {
                var errors = this.checkAttributeConfiguration(name, required);
                if (mustBeTrue !== undefined && typeof mustBeTrue !== "boolean") {
                    errors.push(Boolean.PARAMETER_MUST_BE_TRUE + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
                }
                return errors;
            };
            Creator.prototype.checkNumberConfiguration = function (name, required, minimum, includeMinimum, maximum, includeMaximum) {
                var errors = this.checkAttributeConfiguration(name, required);
                if (minimum !== undefined && typeof minimum !== "number") {
                    errors.push(Attribute.PARAMETER_MINIMUM + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
                }
                if (maximum !== undefined && typeof maximum !== "number") {
                    errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
                }
                if (includeMinimum !== undefined && typeof includeMinimum !== "boolean") {
                    errors.push(NumberAttribute.PARAMETER_INCLUDE_MINIMUM + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
                }
                if (includeMaximum !== undefined && typeof includeMaximum !== "boolean") {
                    errors.push(NumberAttribute.PARAMETER_INCLUDE_MAXIMUM + Creator.MUST_BE_BOOLEAN_OR_UNDEFINED);
                }
                if (typeof minimum === "number" && typeof maximum === "number") {
                    if (includeMinimum === true && includeMaximum === true && minimum > maximum) {
                        errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM);
                    }
                    else if ((includeMinimum !== true || includeMaximum !== true) && minimum >= maximum) {
                        errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM);
                    }
                }
                return errors;
            };
            Creator.prototype.checkStringConfiguration = function (name, required, minimumLength, maximumLength, pattern) {
                var errors = this.checkAttributeConfiguration(name, required);
                if (minimumLength !== undefined && typeof minimumLength !== "number") {
                    errors.push(StringAttribute.PARAMETER_MINIMUM_LENGTH + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
                }
                if (maximumLength !== undefined && typeof maximumLength !== "number") {
                    errors.push(StringAttribute.PARAMETER_MAXIMUM_LENGTH + Creator.MUST_BE_NUMBER_OR_UNDEFINED);
                }
                if (typeof maximumLength === "number" && typeof minimumLength === "number" && minimumLength > maximumLength) {
                    errors.push(StringAttribute.PARAMETER_MAXIMUM_LENGTH +
                        Creator.MUST_BE_GREATER + StringAttribute.PARAMETER_MINIMUM_LENGTH);
                }
                if (pattern !== undefined && !(pattern instanceof RegExp)) {
                    errors.push(StringAttribute.PARAMETER_PATTERN + Creator.MUST_BE_REGEX_OR_UNDEFINED);
                }
                return errors;
            };
            Creator.prototype.checkDatetimeConfiguration = function (name, required, minimum, maximum) {
                var errors = this.checkAttributeConfiguration(name, required);
                var minimumObject = undefined;
                var maximumObject = undefined;
                if ((minimum !== undefined && typeof minimum !== "string") || (typeof minimum === "string" && isNaN(new Date(minimum).getTime()))) {
                    errors.push(Attribute.PARAMETER_MINIMUM + Creator.MUST_BE_DATETIME_OR_UNDEFINED);
                }
                else {
                    minimumObject = new Date(minimum);
                }
                if ((maximum !== undefined && typeof maximum !== "string") || (typeof maximum === "string" && isNaN(new Date(maximum).getTime()))) {
                    errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_DATETIME_OR_UNDEFINED);
                }
                else {
                    maximumObject = new Date(maximum);
                }
                if (minimumObject !== undefined && maximumObject !== undefined && minimumObject >= maximumObject) {
                    errors.push(Attribute.PARAMETER_MAXIMUM + Creator.MUST_BE_GREATER + Attribute.PARAMETER_MINIMUM);
                }
                return errors;
            };
            Creator.prototype.checkChoiceConfiguration = function (name, required, choices) {
                var errors = this.checkAttributeConfiguration(name, required);
                if (choices !== undefined && !Array.isArray(choices)) {
                    errors.push(Choice.PARAMETER_CHOICES + Creator.MUST_BE_ARRAY_OR_UNDEFINED);
                }
                return errors;
            };
            Creator.HAS_WRONG_VALUE = " has wrong value.";
            Creator.MUST_BE_STRING = " must be a string.";
            Creator.MUST_BE_BOOLEAN_OR_UNDEFINED = " must be a boolean or undefined.";
            Creator.MUST_BE_NUMBER_OR_UNDEFINED = " must be a number or undefined.";
            Creator.MUST_BE_REGEX_OR_UNDEFINED = " must be a regex object or undefined.";
            Creator.MUST_BE_DATETIME_OR_UNDEFINED = " must be in datetime format or undefined.";
            Creator.MUST_BE_ARRAY_OR_UNDEFINED = " must be an array object or undefined.";
            Creator.MUST_BE_GREATER = " must be greater than ";
            Creator.instance = new Creator();
            return Creator;
        }());
        Model_4.Creator = Creator;
        function define(name, type, definition) {
            if (definition === void 0) { definition = []; }
            Creator.getInstance().define(name, type, definition);
        }
        Model_4.define = define;
        function create(name) {
            return Creator.getInstance().create(name);
        }
        Model_4.create = create;
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component_1) {
            "use strict";
            var Observable = Ompluscript.Core.Observer.Observable;
            var Component = (function (_super) {
                __extends(Component, _super);
                function Component(name) {
                    _super.call(this);
                    this.name = name;
                    this.htmlElement = undefined;
                    this.initializeHtmlElement();
                }
                Component.prototype.hasClass = function (name) {
                    var classes = this.extractClasses();
                    return classes.indexOf(name) > -1;
                };
                Component.prototype.addClass = function (name) {
                    if (!this.hasClass(name)) {
                        var classes = this.extractClasses();
                        classes.push(name);
                        var value = classes.join(" ").trim();
                        this.setAttribute(Component.ATTRIBUTE_CLASS, value);
                    }
                };
                Component.prototype.removeClass = function (name) {
                    if (this.hasClass(name)) {
                        var classes = this.extractClasses();
                        var index = classes.indexOf(name);
                        classes.splice(index, 1);
                        var value = classes.join(" ").trim();
                        this.setAttribute(Component.ATTRIBUTE_CLASS, value);
                    }
                };
                Component.prototype.toggleClass = function (name) {
                    if (this.hasClass(name)) {
                        this.removeClass(name);
                    }
                    else {
                        this.addClass(name);
                    }
                };
                Component.prototype.setId = function (id) {
                    this.setAttribute(Component.ATTRIBUTE_ID, id);
                };
                Component.prototype.getId = function () {
                    return this.getAttribute(Component.ATTRIBUTE_ID);
                };
                Component.prototype.setAttribute = function (name, value) {
                    this.htmlElement.setAttribute(name, value);
                };
                Component.prototype.getAttribute = function (name) {
                    return this.htmlElement.getAttribute(name);
                };
                Component.prototype.getName = function () {
                    return this.name;
                };
                Component.prototype.getStackTrace = function () {
                    var trace = {
                        html: this.htmlElement.outerHTML.replace(this.htmlElement.innerHTML, ""),
                        name: this.name,
                    };
                    return trace;
                };
                Component.prototype.dispose = function () {
                    if (this.htmlElement instanceof HTMLElement) {
                        var parent_1 = this.htmlElement.parentElement;
                        if (parent_1 instanceof HTMLElement) {
                            parent_1.removeChild(this.htmlElement);
                        }
                    }
                };
                Component.prototype.extractClasses = function () {
                    var classes;
                    var classValue = this.getAttribute(Component.ATTRIBUTE_CLASS);
                    if (typeof classValue === "string") {
                        classes = this.getAttribute(Component.ATTRIBUTE_CLASS).split(" ");
                    }
                    else {
                        classes = [];
                    }
                    if (classes === [""]) {
                        classes = [];
                    }
                    return classes;
                };
                Component.ATTRIBUTE_ID = "id";
                Component.ATTRIBUTE_CLASS = "class";
                return Component;
            }(Observable));
            Component_1.Component = Component;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component) {
            "use strict";
            var Layout = (function (_super) {
                __extends(Layout, _super);
                function Layout(name) {
                    _super.call(this, name);
                }
                Layout.prototype.addChild = function (component) {
                    this.children.push(component);
                };
                Layout.prototype.removeChild = function (component) {
                    var index = this.children.indexOf(component);
                    if (index > -1) {
                        this.children.splice(index, 1);
                    }
                };
                Layout.prototype.clearChildren = function () {
                    this.children = [];
                };
                Layout.prototype.render = function () {
                    this.clear();
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i] !== undefined) {
                            this.appendChild(this.children[i]);
                        }
                    }
                    return this.htmlElement;
                };
                return Layout;
            }(Component.Component));
            Component.Layout = Layout;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component) {
            "use strict";
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(name, layout) {
                    _super.call(this, name);
                    this.layout = layout;
                }
                Container.prototype.addChild = function (component) {
                    _super.prototype.addChild.call(this, component);
                    this.layout.addChild(component);
                };
                Container.prototype.removeChild = function (component) {
                    _super.prototype.removeChild.call(this, component);
                    this.layout.removeChild(component);
                };
                Container.prototype.clearChildren = function () {
                    _super.prototype.clearChildren.call(this);
                    this.layout.clearChildren();
                };
                Container.prototype.render = function () {
                    this.clear();
                    this.appendChild(this.layout);
                    return this.htmlElement;
                };
                Container.prototype.clear = function () {
                    while (this.htmlElement.firstChild) {
                        this.htmlElement.removeChild(this.htmlElement.firstChild);
                    }
                };
                Container.prototype.appendChild = function (component) {
                    this.htmlElement.appendChild(component.render());
                };
                return Container;
            }(Component.Layout));
            Component.Container = Container;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Component;
        (function (Component) {
            "use strict";
            var Field = (function (_super) {
                __extends(Field, _super);
                function Field(name) {
                    _super.call(this, name);
                }
                Field.prototype.render = function () {
                    return this.htmlElement;
                };
                return Field;
            }(Component.Component));
            Component.Field = Field;
        })(Component = View.Component || (View.Component = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Event;
        (function (Event_3) {
            "use strict";
            var Event = Ompluscript.Core.Observer.Event;
            var OnUpdateInput = (function (_super) {
                __extends(OnUpdateInput, _super);
                function OnUpdateInput(sender, value) {
                    _super.call(this, sender, OnUpdateInput.ON_UPDATE_INPUT);
                    this.value = value;
                }
                OnUpdateInput.prototype.getValue = function () {
                    return this.value;
                };
                OnUpdateInput.ON_UPDATE_INPUT = "onUpdateInput";
                return OnUpdateInput;
            }(Event));
            Event_3.OnUpdateInput = OnUpdateInput;
        })(Event = View.Event || (View.Event = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field_1) {
            "use strict";
            var Field = Ompluscript.View.Component.Field;
            var AttributeEvent = Ompluscript.Model.Event.AttributeEvent;
            var OnUpdateAttribute = Ompluscript.Model.Event.OnUpdateAttribute;
            var OnUpdateInput = Ompluscript.View.Event.OnUpdateInput;
            var Input = (function (_super) {
                __extends(Input, _super);
                function Input(name, attribute, type) {
                    if (attribute === void 0) { attribute = undefined; }
                    if (type === void 0) { type = Input.INPUT_TEXT; }
                    _super.call(this, name);
                    this.setAttribute(Input.ATTRIBUTE_TYPE, type);
                    this.setAttribute(Input.ATTRIBUTE_NAME, this.name);
                    this.addClass(Input.FIELD_INPUT);
                    this.attribute = undefined;
                    this.setBinding(attribute);
                    this.addObserverByType(this, OnUpdateInput.ON_UPDATE_INPUT);
                }
                Input.prototype.update = function (event) {
                    if (event instanceof OnUpdateAttribute) {
                        var onUpdateAttribute = event;
                        this.updateValue(onUpdateAttribute.getNewValue());
                    }
                    else if (event instanceof OnUpdateInput && this.isBound()) {
                        var onUpdateInput = event;
                        this.attribute.setValue(onUpdateInput.getValue());
                    }
                };
                Input.prototype.setBinding = function (attribute) {
                    this.removeBinding();
                    this.attribute = attribute;
                    if (this.isBound()) {
                        this.attribute.addObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                    }
                };
                Input.prototype.isBound = function () {
                    return this.attribute !== undefined;
                };
                Input.prototype.removeBinding = function () {
                    if (this.isBound()) {
                        this.attribute.deleteObserverByType(this, AttributeEvent.ON_UPDATE_ATTRIBUTE);
                        this.attribute = undefined;
                    }
                };
                Input.prototype.setValue = function (value) {
                    this.updateValue(value);
                    if (this.isBound()) {
                        this.attribute.setValue(value);
                    }
                };
                Input.prototype.initializeHtmlElement = function () {
                    this.htmlElement = document.createElement(Input.FIELD_INPUT);
                    this.addOnUpdateInputEvent();
                };
                Input.prototype.fireOnUpdateInputEvent = function (value) {
                    var event = new OnUpdateInput(this, value);
                    this.notifyObservers(event);
                };
                Input.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    if (this.isBound()) {
                        trace["attribute"] = this.attribute.getStackTrace();
                    }
                    else {
                        trace["attribute"] = undefined;
                    }
                    return trace;
                };
                Input.FIELD_INPUT = "input";
                Input.ATTRIBUTE_TYPE = "type";
                Input.ATTRIBUTE_VALUE = "value";
                Input.ATTRIBUTE_NAME = "name";
                Input.INPUT_TEXT = "text";
                Input.INPUT_PASSWORD = "password";
                Input.INPUT_EMAIL = "email";
                Input.INPUT_CHECK_BOX = "checkbox";
                return Input;
            }(Field));
            Field_1.Input = Input;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var CheckBoxInput = (function (_super) {
                __extends(CheckBoxInput, _super);
                function CheckBoxInput(name, booleanAttribute, type) {
                    if (booleanAttribute === void 0) { booleanAttribute = undefined; }
                    if (type === void 0) { type = Field.Input.INPUT_CHECK_BOX; }
                    _super.call(this, name, booleanAttribute, type);
                }
                CheckBoxInput.prototype.getValue = function () {
                    return this.htmlElement["checked"];
                };
                CheckBoxInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(CheckBoxInput.EVENT_CHANGE, listener, false);
                };
                CheckBoxInput.prototype.updateValue = function (value) {
                    this.htmlElement["checked"] = value;
                };
                CheckBoxInput.EVENT_CHANGE = "change";
                return CheckBoxInput;
            }(Field.Input));
            Field.CheckBoxInput = CheckBoxInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var TextInput = (function (_super) {
                __extends(TextInput, _super);
                function TextInput(name, stringAttribute, type) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    if (type === void 0) { type = Field.Input.INPUT_TEXT; }
                    _super.call(this, name, stringAttribute, type);
                }
                TextInput.prototype.getValue = function () {
                    return this.getAttribute(Field.Input.ATTRIBUTE_VALUE);
                };
                TextInput.prototype.addOnUpdateInputEvent = function () {
                    var that = this;
                    var listener = function () {
                        that.fireOnUpdateInputEvent(that.getValue());
                    };
                    that.htmlElement.addEventListener(TextInput.EVENT_KEY_PRESS, listener, false);
                };
                TextInput.prototype.updateValue = function (value) {
                    this.setAttribute(Field.Input.ATTRIBUTE_VALUE, value);
                };
                TextInput.EVENT_KEY_PRESS = "keypress";
                return TextInput;
            }(Field.Input));
            Field.TextInput = TextInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var EmailInput = (function (_super) {
                __extends(EmailInput, _super);
                function EmailInput(name, stringAttribute) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    _super.call(this, name, stringAttribute, Field.Input.INPUT_EMAIL);
                }
                return EmailInput;
            }(Field.TextInput));
            Field.EmailInput = EmailInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
(function (Ompluscript) {
    var View;
    (function (View) {
        var Field;
        (function (Field) {
            "use strict";
            var PasswordInput = (function (_super) {
                __extends(PasswordInput, _super);
                function PasswordInput(name, stringAttribute) {
                    if (stringAttribute === void 0) { stringAttribute = undefined; }
                    _super.call(this, name, stringAttribute, Field.Input.INPUT_PASSWORD);
                }
                return PasswordInput;
            }(Field.TextInput));
            Field.PasswordInput = PasswordInput;
        })(Field = View.Field || (View.Field = {}));
    })(View = Ompluscript.View || (Ompluscript.View = {}));
})(Ompluscript || (Ompluscript = {}));
