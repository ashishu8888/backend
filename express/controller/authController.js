
let userModal = require("../modal/user_modal");
const jwt = require("jsonwebtoken");

module.exports.getSignup =   function getSignup(req, res) {
  res.sendFile(
    "C:\\Users\\au224\\Desktop\\server\\mounting_in_express\\signup page\\signUp.html"
  );
}

module.exports.postSignup = function postSignup(req, res) {
  let userData = req.body;
  console.log(userData);
  res.json({
    message: "user has signed up",
    user: userData,
  });
}

module.exports.Login =   async function Login(req, res) {
  try {
    let data = req.body;
    let user = await userModal.findOne({ email: data.email });
    console.log(user);
    if (user) {
      // bcrypt -> compare
      //console.log(user.password);
      if (user.password == data.password) {
        const token = jwt.sign({ uid: user._id }, "uid");
        res.cookie("isLoggedIn", token);
        console.log("token : " + token);
        return res.json({
          message: "user has logged in",
          userDetail: user,
        });
      } else {
        return res.json({
          message: "wrong credentials",
        });
      }
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
