var jwt = require('jsonwebtoken');
var config = require('./db.js');
function verifyToken(...allowed) {

const isAllowed = role => allowed.indexOf(role) > -1;

   return (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }else {
    console.log(decoded.idPrivilegio);
    if(isAllowed(decoded.idPrivilegio)){
      next();
    }else{
    return res.status(403).json({ auth: false, message: 'Your Role is not Allowed ' });
    }


  }
  });

    }
}
module.exports = verifyToken;
