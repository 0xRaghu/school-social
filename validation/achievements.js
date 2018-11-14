const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAchievementsInput(data) {
  let errors = {};

  data.competition = !isEmpty(data.competition) ? data.competition : '';
  data.studentname = !isEmpty(data.studentname) ? data.studentname : '';
  data.prize = !isEmpty(data.prize) ? data.prize : '';
  data.onDate = !isEmpty(data.onDate) ? data.onDate : '';

  if (Validator.isEmpty(data.competition)) {
    errors.competition = 'Competition field is required';
  }

  if (Validator.isEmpty(data.studentname)) {
    errors.studentname = 'Student Name field is required';
  }

  if (Validator.isEmpty(data.prize)) {
    errors.prize = 'Prize field is required';
  }

  if (Validator.isEmpty(data.on)) {
    errors.onDate = 'On date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
