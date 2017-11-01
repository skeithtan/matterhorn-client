"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *   Receives object of format:
 *   {
 *       inputs: $('.inputs'),
 *       button: $('#button'),
 *       customValidations: [{
 *           input: $('#specific-input'),
 *           validator: (String) => Bool
 *       }]
 *   }
 */
function addValidation(object) {
    var inputs = object.inputs;
    var button = object.button;
    var customValidations = object.customValidations === undefined ? [] : object.customValidations;

    function isEmpty(input) {
        var inputValue = (0, _jquery2.default)(input).val();
        return inputValue.length === 0;
    }

    function validateInputs() {
        var buttonIsDisabled = false;

        inputs.each(function (index, item) {
            if (isEmpty(item)) {
                buttonIsDisabled = true;
            }
        });

        customValidations.forEach(function (item) {
            var text = item.input.val();
            if (!item.validator(text)) {
                buttonIsDisabled = true;
            }
        });

        button.attr("disabled", buttonIsDisabled);
    }

    button.attr("disabled", true);
    inputs.on("input", validateInputs);
    customValidations.forEach(function (item) {
        return item.input.on("input", validateInputs);
    });
}

exports.default = addValidation;
//# sourceMappingURL=form_validation.js.map