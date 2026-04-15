import { ApiError } from "../utils/api-error.js";

export const validateBody = (fields) => (req, res, next) => {
  for (const field of fields) {
    if (!req.body[field] || String(req.body[field]).trim() === "") {
      return next(new ApiError(400, `Field '${field}' is required`));
    }
  }
  next();
};

