import { Request, Response } from "express";
import { sendError, sendSuccess } from "../utils/response";
import { SeachDataType } from "../types/searchData";
import { SEARCH_DATA } from "../mock/searchData";

export const search = (req: Request, res: Response): void => {
  try {
    let { email, number } = req.body;

    number = number.split("-").join("");

    const result = SEARCH_DATA.filter((item: SeachDataType) => {
      return (
        (!email || item.email === email) && (!number || item.number === number)
      );
    });

    setTimeout(() => {
      sendSuccess(res, result[0]);
    }, 5000);
  } catch (error) {
    sendError(res, "Internal Server Error", 500);
    console.error(error);
  }
};
