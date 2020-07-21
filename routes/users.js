module.exports = function (dbModels) {

  var express = require('express');
  var router = express.Router();

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });


  //User Create API
  router.post('/save', function (req, res, next) {

    dbModels.user.create(req.body).then(function (saveUser) {

      saveUser.save();
      req.body.USER_ID = saveUser.USER_ID;
      console.log('User with Id=  ' + saveUser.USER_ID + ' created successfully');
      res.json(req.body);

    }).catch(function (err) {
      console.log('Error occured while creating User. ERROR:' + err.stack);
      res.status(500);
      res.json('ERROR:' + err.stack);
    });
  });

  //User GET API
  router.get('/getUser/userId/:userId', function (req, res, next) {

    dbModels.user.findAll({
      where: {
        USER_ID: req.params.userId
      }
    }).then(function (dBValue) {
      if (dBValue.length != 0) {
        console.log('User By Id fetched successfully');
      } else {
        res.status(404);
        console.log('No User  with this Id= ' + albumId);
      }
      res.json(dBValue);
    }).catch(function (err) {
      console.log('User Fetch Failed:' + JSON.stringify(err));
      res.status(500);
      res.json(err);
    });
  });



  return router;
};
