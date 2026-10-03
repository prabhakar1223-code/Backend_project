import express from "express";
import { registerUser } from "../controllers/user.js";
import { upload } from "../../middleware/multer.js";

const router = express.Router();

router.post(
    "/register",
    upload.fields([
      {
        name:"avtar",
        maxCount:1
      },
      {
        name:"coverImage",
        maxCount:1
      }
    ]),
    registerUser
);

export default router;