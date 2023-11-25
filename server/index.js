const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT"],
    credentials:true
}))
app.use(cookieParser());

const EmployeeModel = require("./models/Employee");

const UserModel = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/register", (req, res) => {
  // EmployeeModel.create(req.body)
  //   .then((employees) => res.json(employees))
  //   .catch((err) => res.json(err));

  const { firstName, lastName, email, password } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      // Store hash in your password DB.
      UserModel.create({ firstName, lastName, email, password: hash })
        .then((user) => res.json({ status:"Success" }))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

// 

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Email and password are required");
  }

  UserModel.findOne({ email: email })
    .then((user) => {
      console.log('User',user)
      if (!user) {
        return res.json("No Records Exist");
      }

      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            {
              email: user.email,
              role: user.role,
            },
            "jwt-secret-key",
            { expiresIn: "71d" }
          );
          res.cookie("token", token);
          return res.json({ status: "Success", role: user.role });
        } else {
          return res.json("The Password is Incorrect");
        }
      });
    })
    .catch((error) => {
      console.error("Error during findOne:", error);
      res.status(500).json("Internal Server Error");
    });
});

const port=process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server Is Running at ${port}`);
});
