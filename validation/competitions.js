const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompetitionsInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.onDate = !isEmpty(data.onDate) ? data.onDate : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.onDate)) {
    errors.onDate = 'On date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
