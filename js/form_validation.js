import $ from "jquery";

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
    const inputs = object.inputs;
    const button = object.button;
    const customValidations = object.customValidations === undefined ? [] : object.customValidations;

    function isEmpty(input) {
        const inputValue = $(input).val();
        return inputValue.length === 0;
    }

    function validateInputs() {
        let buttonIsDisabled = false;

        inputs.each((index, item) => {
            if (isEmpty(item)) {
                buttonIsDisabled = true;
            }
        });

        customValidations.forEach(item => {
            const text = item.input.val();
            if (!item.validator(text)) {
                buttonIsDisabled = true;
            }
        });

        button.attr("disabled", buttonIsDisabled);
    }

    validateInputs();
    inputs.on("input", validateInputs);
    customValidations.forEach(item => item.input.on("input", validateInputs));
}

export default addValidation;