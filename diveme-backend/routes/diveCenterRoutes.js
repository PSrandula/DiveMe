const express = require("express");
const router = express.Router();

const diveCenterController = require("../controller/diveCenterController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const storage = require("../utils/cloudinaryStorage");
const upload = multer({ storage });

const cpUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

router.get("/", authMiddleware, diveCenterController.getAllDiveCenters);
router.get("/all", diveCenterController.getAllCenters);
router.get("/:id", diveCenterController.getDiveCenterById);
router.post(
  "/",
  authMiddleware,
  cpUpload,
  diveCenterController.createDiveCenter
);
router.put("/:id", cpUpload, diveCenterController.updateDiveCenter);
router.delete("/:id", diveCenterController.deleteDiveCenter);

module.exports = router;
