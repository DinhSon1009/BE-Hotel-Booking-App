import express from "express";
import multer from "multer";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

import {
  createLocation,
  deleteLocation,
  getLocation,
  getSpecificLocation,
  updateLocation,
} from "../controllers/location.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const router = express.Router();

router.get("/", verifyUser, getLocation);

router.post("/", verifyAdmin, upload.single("locationImage"), createLocation);

router.get("/:locationId", verifyUser, getSpecificLocation);

router.patch("/:locationId", verifyAdmin, updateLocation);

router.delete("/:locationId", verifyAdmin, deleteLocation);

export default router;
