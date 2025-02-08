import express from "express";
import { normalUserAuthentication, adminAuthorization } from "../middleware/Authentication";
import { getStatistics } from "../controller/statisticsController";

const statisticsRoute = express.Router();

statisticsRoute.get("/statistics", adminAuthorization, getStatistics);

export default statisticsRoute;
