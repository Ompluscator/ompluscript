var Ompluscript;
(function (Ompluscript) {
    var Core;
    (function (Core) {
        "use strict";
    })(Core = Ompluscript.Core || (Ompluscript.Core = {}));
})(Ompluscript || (Ompluscript = {}));
/// <reference path="../../Core/IBase.ts" />
var Ompluscript;
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var AbstractAttribute = (function () {
                function AbstractAttribute(name, value, required) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    this.name = name;
                    this.value = value;
                    this.required = required;
                }
                AbstractAttribute.prototype.setValue = function (value) {
                    this.value = value;
                };
                AbstractAttribute.prototype.getValue = function () {
                    return this.value;
                };
                AbstractAttribute.prototype.getName = function () {
                    return this.name;
                };
                AbstractAttribute.prototype.isRequired = function () {
                    return this.required;
                };
                AbstractAttribute.prototype.getStackTrace = function () {
                    var trace = {
                        name: this.name,
                        required: this.required,
                        value: this.value
                    };
                    return trace;
                };
                return AbstractAttribute;
            })();
            Attribute.AbstractAttribute = AbstractAttribute;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
/// <reference path="AbstractAttribute.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ompluscript;
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Boolean = (function (_super) {
                __extends(Boolean, _super);
                function Boolean() {
                    _super.apply(this, arguments);
                }
                Boolean.prototype.validate = function () {
                    if ((this.required === true && this.value === undefined) || typeof this.value !== "boolean") {
                        throw new TypeError("Attribute " + this.name + " is not a boolean.");
                    }
                };
                return Boolean;
            })(Attribute.AbstractAttribute);
            Attribute.Boolean = Boolean;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
/// <reference path="AbstractAttribute.ts" />
var Ompluscript;
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
                    _super.call(this, name, value, required);
                    this.minimum = new Date(minimum);
                    this.maximum = new Date(maximum);
                }
                Datetime.prototype.getDateObject = function () {
                    return new Date(this.value);
                };
                Datetime.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Datetime.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Datetime.prototype.validate = function () {
                    try {
                        if (this.required === true && this.value === undefined) {
                            throw new TypeError("Attribute " + this.name + " is not in right date format.");
                        }
                        else if (this.value !== undefined) {
                            this.getDateObject();
                        }
                    }
                    catch (ex) {
                        throw new TypeError("Attribute " + this.name + " is not in right date format.");
                    }
                    if (this.value !== undefined && this.minimum !== undefined && this.getDateObject().getTime() < this.minimum.getTime()) {
                        throw new RangeError("Attribute " + this.name + " is date with less value than minimum allowed.");
                    }
                    else if (this.value !== undefined && this.maximum !== undefined && this.getDateObject().getTime() > this.maximum.getTime()) {
                        throw new RangeError("Attribute " + this.name + " is date with greater value than maximum allowed.");
                    }
                };
                Datetime.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["minimum"] = this.minimum;
                    trace["maximum"] = this.maximum;
                    return trace;
                };
                return Datetime;
            })(Attribute.AbstractAttribute);
            Attribute.Datetime = Datetime;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
/// <reference path="AbstractAttribute.ts" />
var Ompluscript;
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var Number = (function (_super) {
                __extends(Number, _super);
                function Number(name, value, required, minimum, maximum) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimum === void 0) { minimum = undefined; }
                    if (maximum === void 0) { maximum = undefined; }
                    _super.call(this, name, value, required);
                    this.minimum = minimum;
                    this.maximum = maximum;
                }
                Number.prototype.getMinimum = function () {
                    return this.minimum;
                };
                Number.prototype.getMaximum = function () {
                    return this.maximum;
                };
                Number.prototype.validate = function () {
                    if ((this.required === true && this.value === undefined) || typeof this.value !== "number") {
                        throw new TypeError("Attribute " + this.name + " is not a number.");
                    }
                    else if (this.value !== undefined && this.minimum !== undefined && this.value < this.minimum) {
                        throw new RangeError("Attribute " + this.name + " is less than minimum allowed number.");
                    }
                    else if (this.value !== undefined && this.maximum !== undefined && this.value > this.maximum) {
                        throw new RangeError("Attribute " + this.name + " is greater than maximum allowed number.");
                    }
                };
                Number.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["minimum"] = this.minimum;
                    trace["maximum"] = this.maximum;
                    return trace;
                };
                return Number;
            })(Attribute.AbstractAttribute);
            Attribute.Number = Number;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
/// <reference path="AbstractAttribute.ts" />
var Ompluscript;
(function (Ompluscript) {
    var Model;
    (function (Model) {
        var Attribute;
        (function (Attribute) {
            "use strict";
            var String = (function (_super) {
                __extends(String, _super);
                function String(name, value, required, minimumLength, maximumLength) {
                    if (value === void 0) { value = undefined; }
                    if (required === void 0) { required = false; }
                    if (minimumLength === void 0) { minimumLength = undefined; }
                    if (maximumLength === void 0) { maximumLength = undefined; }
                    _super.call(this, name, value, required);
                    this.minimumLength = minimumLength;
                    this.maximumLength = maximumLength;
                }
                String.prototype.getMinimumLength = function () {
                    return this.minimumLength;
                };
                String.prototype.getMaximumLength = function () {
                    return this.maximumLength;
                };
                String.prototype.validate = function () {
                    if ((this.required === true && this.value === undefined) || typeof this.value !== "string") {
                        throw new TypeError("Attribute " + this.name + " is not a string.");
                    }
                    else if (this.value !== undefined && this.minimumLength !== undefined && this.value.length < this.minimumLength) {
                        throw new RangeError("Attribute " + this.name + " is string with less length than minimum allowed.");
                    }
                    else if (this.value !== undefined && this.maximumLength !== undefined && this.value.length > this.maximumLength) {
                        throw new RangeError("Attribute " + this.name + " is string with greater length than maximum allowed.");
                    }
                };
                String.prototype.getStackTrace = function () {
                    var trace = _super.prototype.getStackTrace.call(this);
                    trace["minimumLength"] = this.minimumLength;
                    trace["maximumLength"] = this.maximumLength;
                    return trace;
                };
                return String;
            })(Attribute.AbstractAttribute);
            Attribute.String = String;
        })(Attribute = Model.Attribute || (Model.Attribute = {}));
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
/// <reference path="../Core/IBase.ts" />
var Ompluscript;
(function (Ompluscript) {
    var Model;
    (function (Model_1) {
        "use strict";
        var Model = (function () {
            function Model() {
            }
            Model.prototype.getStackTrace = function () {
                return "Class Model";
            };
            return Model;
        })();
        Model_1.Model = Model;
    })(Model = Ompluscript.Model || (Ompluscript.Model = {}));
})(Ompluscript || (Ompluscript = {}));
//# sourceMappingURL=main.js.map