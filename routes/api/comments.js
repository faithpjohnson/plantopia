const express = require('express');
const router = express.Router();
const commentCtrl = require('../../controllers/comments')

router.post('/', isAuthenticated, commentCtrl.create)

/*---------- Protected Routes ----------*/
function isAuthenticated(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ data: "Not Authorized!" });
    }
  }

module.exports = router;