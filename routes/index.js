var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    // quy định thư mục chứa file
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // quy định tên file khi lưa trên server
    filename: function (req, file, cb) {
        var random = Math.random();
        cb(null, random + Date.now() + file.originalname);
    },
});

var upload = multer({
    storage: storage, limits: {
        // tùy chọn max size cho file
        fileSize: 2 * 1024
    }
}).single('avatar');

var upload2 = multer({
    storage: storage, limits: {
        // tùy chọn max size cho file
        fileSize: 2 * 1024
    }
}).array('avatar',5);




/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
// upload 1 file
router.post('/profile', function (req, res, next) {

    upload(req, res, function (err) {
      if (err){
          res.render('index', {
              title: err.message
          });
      }else {
          res.render('index', {
              title: 'Upload thành công!!!!,' +
                  ' kiểm tra thư mục uploads'
          });
      }
    })

});
// upload nhiều file
router.post('/profilearray', function (req, res, next) {
    upload2(req,res,function (err) {
        if (err){
            res.render('index', {
                title: err.message
            });
        }else {
            res.render('index', {
                title: 'Upload thành công!!!!,' +
                    ' kiểm tra thư mục uploads'
            });
        }
    })

});


module.exports = router;
