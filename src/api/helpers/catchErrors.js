/**
 * An higher order function that catches errors from passed
 * function and directs it to global express error handler
 * middleware.
 * @param {function} fn
 * @returns {function}
 */
const catchErrors = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchErrors;
