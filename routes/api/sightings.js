const express = require("express");
const router = express.Router();
const postsCtrl = require("../../controllers/sightings");
const multer = require("multer");
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/

// photo is the key on the formData object in the AddPost component
router.post("/", isAuthenticated, upload.single("photo"), postsCtrl.create);
router.get("/", postsCtrl.index);
router.get("/:sightingID", postsCtrl.getByID);

/*---------- Protected Routes ----------*/
function isAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ data: "Not Authorized!" });
  }
}

module.exports = router;
