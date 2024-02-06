const _ = require('lodash');

const extractError = (err) => {
  const parent = _.has(err, 'parent') ? err.parent : null;
  const detail = _.has(parent, 'detail') ? parent.detail : null;
  const error = detail || err;

  return error;
};

module.exports = {
  extractError,
};
