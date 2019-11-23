var express = require('express');
var router = express.Router();
const controllers = require("../controllers/index")
const accounts = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    "message": "Welcome to my blog"
  })
});


router.post('/reg', accounts.register)
router.post('/login', accounts.login)
router.post("/create", controllers.create);
router.get("/stories", controllers.story);
router.get("/story/:id", controllers.storyOne);
router.put("/story/edit/:id", controllers.edit);
router.delete("/story/delete/:id", controllers.removed);

module.exports = router;
