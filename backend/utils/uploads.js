const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const filterFiles = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") return cb(null, true);
  return cb(null, false);
};

const upload = multer({
  storage,
  filterFiles,
});

module.exports = upload;
