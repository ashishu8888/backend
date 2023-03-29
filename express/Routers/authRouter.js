const express = require("express");
const app = express();
const authRouter = express.Router();

const { getSignup, postSignup, Login } = require("../controller/authController");

authRouter.route("/signup")
    .get(getSignup)
  .post(postSignup);
    
authRouter
  .route("/login")
  .post(Login);

    

module.exports = authRouter;