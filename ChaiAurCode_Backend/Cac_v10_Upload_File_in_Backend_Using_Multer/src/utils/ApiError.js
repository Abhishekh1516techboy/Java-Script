class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!", // Default error message
    errors = [],
    stack = ""
  ) {
    super(message); // Pass message to parent Error class
    this.statusCode = statusCode;
    this.data = null;
    this.message;
    this.success = false;
    this.errors = errors;

    // Handle stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Generate stack trace
    }
  }
}

export default ApiError;
