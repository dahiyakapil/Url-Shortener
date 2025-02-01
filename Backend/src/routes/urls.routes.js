import express from "express";
import {
  createShortURL,
  getAllShortUrls,
  getClicksByDate,
  getClicksByDevice,
  getExpiredUrls,
  getTotalClicks,
  getTotalClicksById,
  getUserDevice,
  getUserIpAddress,
  redirectToUrl,
  getUrlsByRemarks,
  deleteUrlById

} from "../controllers/urls.controller.js";
import mongoose from "mongoose";

const urlRouter = express.Router();

urlRouter.get("/device-info", getUserDevice);
urlRouter.get("/ip-info", getUserIpAddress);

urlRouter.get("/clicks-by-date", getClicksByDate);
urlRouter.get("/clicks-by-device", getClicksByDevice);
urlRouter.get("/:shortURLId/clicks", getTotalClicksById);
urlRouter.post("/create", createShortURL);
urlRouter.get("/", getAllShortUrls);
urlRouter.get("/expired", getExpiredUrls);
urlRouter.get("/total-clicks", getTotalClicks);



urlRouter.get("/search", getUrlsByRemarks);
urlRouter.delete('/delete/:id', deleteUrlById);


urlRouter.get("/s/:shortURLId", redirectToUrl);

export default urlRouter;
