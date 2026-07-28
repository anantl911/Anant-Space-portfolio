import express from "express";
import { MessagesController } from "./message.controller.js";
import { createMessageSchema } from "./message.validator.js";
import validate from "../../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/send", validate(createMessageSchema), MessagesController.createMsg);

export default router;
