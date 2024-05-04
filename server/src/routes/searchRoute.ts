import { Router } from "express";
import {
  handleValidationErrors,
  searchValidation,
} from "../validations/serachValidation";

import { search } from "../controllers/searchController";

const searchRouter = Router();

searchRouter.post("/", searchValidation, handleValidationErrors, search);

export default searchRouter;
