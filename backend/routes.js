const express = require("express");

const router = express.Router();

const upload = require("./utils/uploads");

const {
    createMemory,
    getMemories,
    getMemory,
    deleteMemory,
    updateMemory
} = require("./controllers/MemoryController");

router.post(
    "/",
    upload.single("image"),
    (req, res, next) => {
      const image = req.file;
      if (!image) {
        return res.status(400).json({ msg: "Image is required." });
      }
      next();
    },
    (req, res) => createMemory(req, res)
  );

router.get("/", (req, res) => getMemories(req, res));

router.get("/:id", (req, res) => getMemory(req, res));

router.delete("/:id", (req, res) => deleteMemory(req, res));

router.patch("/:id", upload.single("image"), (req, res) => updateMemory(req, res));

module.exports = router;