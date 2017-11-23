// Returns errors from fields if there are errors. If not, null.
// Takes an object that looks like this:
// [
//     {
//         name : "Name",
//         characterLimit : 64,
//         value : 'Actual field value',
//         optional : false,
//         customValidators: [{
//             isValid: (fieldValue) => !isNaN(parseInt(name)),
//             errorMessage: name => `${name} must be a valid integer`
//         }]
//     },
// ];
function validateForm(formFields) {
    let fieldErrors = {};

    let formErrors = {
        formHasErrors : false,
        fieldErrors : fieldErrors,
    };


    formFields.forEach(field => {
        const charFieldValidator = new CharLimitFieldValidator(field.characterLimit);

        let validators = [charFieldValidator,];

        if (field.optional === undefined || !field.optional) {
            const fieldIsNotEmptyValidator = new FieldIsNotEmptyValidator();
            // Insert at beginning of array
            validators.unshift(fieldIsNotEmptyValidator);
        }

        if (field.customValidators !== undefined) {
            validators = validators.concat(field.customValidators);
        }

        let errors = [];
        fieldErrors[field.name] = errors;

        validators.forEach(validator => {
            if (!validator.isValid(field.value)) {
                formErrors.formHasErrors = true;
                errors.push(validator.errorMessage(field.name));
            }
        });
    });

    return formErrors;
}

class FieldValidator {
    isValid(fieldValue) {
        return true;
    }

    errorMessage(fieldName) {
        return `${fieldName} has errors.`;
    }
}

class CharLimitFieldValidator extends FieldValidator {
    constructor(charLimit) {
        super();
        this.charLimit = charLimit;
    }

    isValid(fieldValue) {
        if (this.charLimit === null || this.charLimit === undefined) {
            return true;
        }

        return fieldValue.length <= this.charLimit;
    }

    errorMessage(fieldName) {
        return `${fieldName} should not exceed ${this.charLimit} characters.`;
    }
}

class FieldIsNotEmptyValidator extends FieldValidator {
    isValid(fieldValue) {
        return fieldValue.length > 0;
    }

    errorMessage(fieldName) {
        return `${fieldName} is required.`;
    }
}

export default validateForm;