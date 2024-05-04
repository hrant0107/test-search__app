import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  ValidationChain,
  ValidationError,
} from "express-validator";

import { sendError } from "../utils/response";

import { body } from "express-validator";

let numberValidateMessage: string | null = null;

export const searchValidation: ValidationChain[] = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("number")
    .custom((value) => {
      if (!value) return true;
      if (!/^[0-9-]{6,}$/.test(value)) {
        numberValidateMessage =
          "Invalid number format. Please use a valid format like '11-11-11'.";
        return false;
      }
      return true;
    })
    .withMessage(() => {
      if (numberValidateMessage) {
        return numberValidateMessage;
      }
    }),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages: string[] = errors
      .array()
      .map((error: ValidationError) => error.msg);
    const errorMessage = errorMessages.join(" ");
    return sendError(res, errorMessage);
  }
  next();
};
