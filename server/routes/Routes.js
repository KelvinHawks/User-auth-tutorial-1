const User = require("../model/configureDB");
const bcrypt = require("bcrypt");
const { generateToken } = require("../generateToken");

//register

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "User already exists", user: false });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);
      if (hashedPassword) {
        const newUser = await new User({
          username,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        });
      } else {
        res.status(401).json({ message: "password auth" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ massage: "Incorrect username or password" });
    }
  } else {
    res.status(401).json({ massage: "Database error" });
  }
};

<<<<<<< HEAD

module.exports = {Login, Register}
=======
module.exports = { Login, Register };
>>>>>>> d89943cdf2a054fa6052abff79c3f570b433ebd5
