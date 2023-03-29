const express = require("express");
const userRouter = express.Router();
const protectRoute = require("../middleware/auth_middleware")
const { getUser, postUser, updateUser, deleteUser, getCookies, setCookies } = require("../controller/userController");

userRouter
  .route("/")
  .get(protectRoute,getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter
  .route("/getCookies")
  .get(getCookies);

userRouter
  .route("/setCookies")
  .get(setCookies);



module.exports = userRouter;
