var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const bodyParserMidllware = bodyParser.json()
const { Api, Login } = require('../constrol/user')
const { BannerList, TopList } = require('../constrol/home')
/* GET home page. */
router.get('/', function (res, req, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api', Api)
router.post('/user/login', bodyParserMidllware, Login)
router.get('/getBannerList', BannerList)
router.get('/getTopList', TopList)

module.exports = router;
