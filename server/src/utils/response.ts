import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  payload: T,
  code: number = 200
): void => {
  res.status(code).send({
    status: "success",
    payload,
  });
};

export const sendError = (
  res: Response,
  message: string = "Something went wrong",
  code: number = 400
): void => {
  res.status(code).send({
    status: "error",
    payload: message,
  });
};
