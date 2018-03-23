const { check, validationResult } = require('express-validator/check');

module.exports.check = [
  check('title')
    .optional({ checkFalsy: true })
    .custom(value => {
      if(value.length > 0 && value.trim().length === 0) {
        throw new Error('Title cannot be blank space');
      } else {
        return value;
      }
    }),

  check('body')
    .exists().withMessage('Body cannot be empty')
    .custom(value => {
      if(value.trim().length === 0) {
        throw new Error('Body cannot be blank');
      } else {
        return value;
      }
    })
];

module.exports.result = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  } else {
    return next();
  }
};
