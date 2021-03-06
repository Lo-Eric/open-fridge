const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.servings = validText(data.servings) ? data.servings : "";

  if (!Validator.isLength(data.name, { min: 5 })) {
    errors.name = "Name of recipe must be at least 5 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Recipe name is required";
  }

  if (Validator.isEmpty(data.servings)) {
    errors.servings = "Servings is required";
  }

  if (is_Empty(data.ingredients)) {
      errors.ingredients = "Recipe must have at least 1 ingredient";
  }

  if (is_Empty(data.instructions)) {
      errors.instructions = "Missing instructions for recipe"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};


function is_Empty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
