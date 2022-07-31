import { validationResult, checkSchema } from "express-validator";

function validateSchema(schema) {
  const validationMiddleware = checkSchema(schema);
  return async (req, res, next) => {
    await validationMiddleware.run(req);
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
      return;
    }
    const error = Error(
      result
        .array()
        .map((value) => value.msg)
        .join()
    );
    error.statusCode = 400;
    next(error);
  };
}

const id = {
  id: {
    isInt: {
      errorMessage: "Task id parameter should be an integer",
    },
    in: ["params"],
  },
};

const text = {
  "data.text": {
    isLength: {
      errorMessage: "Task text property can't be empty",
      options: { min: 1 },
    },
    in: ["body"],
  },
};

const checked = {
  "data.checked": {
    isBoolean: {
      errorMessage: "Task checked property should be boolean",
    },
    in: ["body"],
  },
};

const addedTaskSchema = {
  ...text,
};
const taskIdSchema = { ...id };
const updateTaskSchema = { ...checked, ...id };

export { validateSchema, addedTaskSchema, taskIdSchema, updateTaskSchema };
