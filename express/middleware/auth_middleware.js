const jwt = require("jsonwebtoken");

function protectRoute(req, res, next) {
  try {
    let token = req.cookies.isLoggedIn;
   let isVerified =  jwt.verify(token,"uid");
    if (isVerified) next();
    else {
      res.json({
        message: "you are not allowed to do this operation",
      });
    }
    
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
}

module.exports = protectRoute;
