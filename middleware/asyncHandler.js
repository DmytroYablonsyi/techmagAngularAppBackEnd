// A higher-order function to handle async errors in Express routes.
// It wraps the provided async function (fn) and catches any errors, passing them to the next middleware.

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler