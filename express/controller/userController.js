
const userModal = require("../model/userModel");
const jwt = require("jsonwebtoken");


module.exports.getUser =   async function getUser(req, res) {
  try {
    let users = await userModal.find();
    res.json({
      message: "retrieved successfully",
      users,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
}

 module.exports.postUser =  async function postUser(req, res) {
  try {
    let newUser = req.body;
    newUser = await userModal.create(newUser);
    const token = jwt.sign({ uid: newUser._id }, "uid");
    res.cookie("isLoggedIn", token);
    console.log("token : " + token);
    return res.json({
      message: "user created succesfully",
      users: newUser,
    });
  } catch (e) {
    return res.json({
      error: e.message,
    });
  }
}

module.exports.updateUser =   async function updateUser(req, res) {
  try {
    let updatedUser = req.body;
    let users = await userModal.findOneAndUpdate(
      { email: updatedUser.email },
      updateUser
    );
    users = await userModal.find({});
    res.json({
      message: "done",
      updatedUsers: users,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
}

module.exports.deleteUser =   async function deleteUser(req, res) {
  try {
    res.cookie("isLoggedIn", false);
    let user = req.body;
    let users = await userModal.findOneAndDelete({
      email: user.email,
    });
    res.json({
      message: "deleted successfully",
      users,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });
  }
}

module.exports.setCookies =   function setCookies(req, res) {
  //res.setHeader('Set-Cookie', 'isLoggedIn=true'); without cookie parser...

  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });

  res.send("cookies has been set");
  res.end();
}

module.exports.getCookies =  function getCookies(req, res) {
  //   res.setHeader("Set-Cookie", "isLoggedIn=true");
  //   res.send("cookies has been set");
  let cookies = req.cookies;
  console.log(cookies);
  res.json({
    message: "cookie recieved",
    cookies: cookies,
  });
}
