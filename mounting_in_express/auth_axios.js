let user = [
  {
    id: 1,
    name: "Ashish",
  },
  {
    id: 2,
    name: "Mohan",
  },
  {
    id: 3,
    name: "kartik",
  },
];

const express = require("express");
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
    .route("/signup")
    .get(getSignup)
    .post(postSignup);

function getUser(req, res) {
  console.log(req.query);
  res.send(user);
}

function postUser(req, res) {
  console.log(req.body);
  user = req.body;
  res.json({
    message: "User created successfully",
    user: req.body,
  });
}

function updateUser(req, res) {
  console.log(req.body);

  let dataToBeUpdated = req.body;
  for (key in dataToBeUpdated) {
    user[key] = dataToBeUpdated[key];
  }

  res.json({
    message: "data updated successfully",
  });
}

function deleteUser(req, res) {
  user = {};
  res.json({
    message: "data deleted successfully",
  });
}

function getUserById(req, res) {
  foundId = user.find((u) => u.id == req.params.id);

  //******learning******* */
  // console.log(foundId);
  // if found => that object , else it will be undefined.
  //******learning******* */

  if (!foundId) {
    foundId = "user doesn't exist!";
  }

  res.send({
    message: "user id recieved",
    data: foundId,
  });
  //console.log(req.params.id);
}

function getSignup(req, res) {
    res.sendFile(
      'C:\\Users\\au224\\Desktop\\server\\mounting_in_express\\signup page\\signUp.html'
    );
}

function postSignup(req, res) {

    let userData = req.body;
    console.log(userData);
    res.json({
        message: "user has signed up",
        user : userData,
    })


}

