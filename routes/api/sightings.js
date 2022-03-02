const express = require("express");
const router = express.Router();
const sightingsCtrl = require("../../controllers/sightings");
const multer = require("multer");
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/

// photo is the key on the formData object in the AddPost component
router.post("/", isAuthenticated, upload.single("photo"), sightingsCtrl.create);
router.get("/", sightingsCtrl.index);
router.get("/:sightingID", sightingsCtrl.getByID);
router.post('/:sightingID/edit', sightingsCtrl.updateSighting);
router.delete('/', sightingsCtrl.deleteSighting)

/*---------- Protected Routes ----------*/
function isAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ data: "Not Authorized!" });
  }
}

module.exports = router;
