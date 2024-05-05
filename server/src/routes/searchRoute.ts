import { Router } from "express";
import {
  handleValidationErrors,
  searchValidation,
} from "../validations/serachValidation";

import { getUser } from "../controllers/searchController";

const searchRouter = Router();

searchRouter.post("/", searchValidation, handleValidationErrors, getUser);

export default searchRouter;
