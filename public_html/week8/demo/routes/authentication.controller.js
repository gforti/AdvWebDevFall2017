var passport = require('passport');
var User = require('./users.model');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user
    .save()
    .then(function(){
      sendJSONresponse(res, 200, {
        "token" : user.generateJwt()
      });
    })
    .catch(function(err){
        sendJSONresponse(res, 400, err);
    });

};

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if(user){
      sendJSONresponse(res, 200, {
        "token" : user.generateJwt()
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);

};