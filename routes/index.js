var express = require('express');
var router = express.Router();
const accounts = require('../controllers/user');
const multer = require('multer');





router.get('/', (req, res, next) => {
  res.status(200).json({
    "message": "Welcome to my blog"
  })
});


router.post('/api/register', accounts.register)
router.post('/api/login', accounts.login)


module.exports = router;
