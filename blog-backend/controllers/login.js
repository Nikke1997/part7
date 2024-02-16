const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");


//Route to login and check if the password is correct
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  //Find user based on username
  const user = await User.findOne({ username });
  
  //Using bcrypt to compare the password sent in the request to the passwordHash stored in the database
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

    //If the user is not found or the password is incorrect, return an error
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  //If the user is found and the password is correct, create a token to user
  const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200).send({token, username: user.username, name: user.name})
});

module.exports = loginRouter;