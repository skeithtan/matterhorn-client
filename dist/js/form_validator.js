"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Returns errors from fields if there are errors. If not, null.
// Takes an object that looks like this:
// [
//     {
//         name : "Name",
//         characterLimit : 64,
//         value : 'Actual field value',
//         customValidators: [{
//             isValid: (fieldValue) => !isNaN(parseInt(name)),
//             errorMessage: name => `${name} must be a valid integer`
//         }]
//     },
// ];
function validateForm(formFields) {
    var fieldErrors = {};

    var formErrors = {
        formHasErrors: false,
        fieldErrors: fieldErrors
    };

    formFields.forEach(function (field) {
        var charFieldValidator = new CharLimitFieldValidator(field.characterLimit);
        var fieldIsNotEmptyValidator = new FieldIsNotEmptyValidator();

        var validators = [fieldIsNotEmptyValidator, charFieldValidator];
        if (field.customValidators !== undefined) {
            validators = validators.concat(field.customValidators);
        }

        var errors = [];
        fieldErrors[field.name] = errors;

        validators.forEach(function (validator) {
            if (!validator.isValid(field.value)) {
                formErrors.formHasErrors = true;
                errors.push(validator.errorMessage(field.name));
            }
        });
    });

    return formErrors;
}

var FieldValidator = function () {
    function FieldValidator() {
        _classCallCheck(this, FieldValidator);
    }

    _createClass(FieldValidator, [{
        key: "isValid",
        value: function isValid(fieldValue) {
            return true;
        }
    }, {
        key: "errorMessage",
        value: function errorMessage(fieldName) {
            return fieldName + " has errors.";
        }
    }]);

    return FieldValidator;
}();

var CharLimitFieldValidator = function (_FieldValidator) {
    _inherits(CharLimitFieldValidator, _FieldValidator);

    function CharLimitFieldValidator(charLimit) {
        _classCallCheck(this, CharLimitFieldValidator);

        var _this = _possibleConstructorReturn(this, (CharLimitFieldValidator.__proto__ || Object.getPrototypeOf(CharLimitFieldValidator)).call(this));

        _this.charLimit = charLimit;
        return _this;
    }

    _createClass(CharLimitFieldValidator, [{
        key: "isValid",
        value: function isValid(fieldValue) {
            if (this.charLimit === null) {
                return true;
            }

            return fieldValue.length <= this.charLimit;
        }
    }, {
        key: "errorMessage",
        value: function errorMessage(fieldName) {
            return fieldName + " should not exceed " + this.charLimit + " characters.";
        }
    }]);

    return CharLimitFieldValidator;
}(FieldValidator);

var FieldIsNotEmptyValidator = function (_FieldValidator2) {
    _inherits(FieldIsNotEmptyValidator, _FieldValidator2);

    function FieldIsNotEmptyValidator() {
        _classCallCheck(this, FieldIsNotEmptyValidator);

        return _possibleConstructorReturn(this, (FieldIsNotEmptyValidator.__proto__ || Object.getPrototypeOf(FieldIsNotEmptyValidator)).apply(this, arguments));
    }

    _createClass(FieldIsNotEmptyValidator, [{
        key: "isValid",
        value: function isValid(fieldValue) {
            return fieldValue.length > 0;
        }
    }, {
        key: "errorMessage",
        value: function errorMessage(fieldName) {
            return fieldName + " is required.";
        }
    }]);

    return FieldIsNotEmptyValidator;
}(FieldValidator);

exports.default = validateForm;
//# sourceMappingURL=form_validator.js.map