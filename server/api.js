import db from "./database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const SECRET_KEY = process.env.SECRET_KEY;

const initializeAPI = async (app) => {
  app.post("/api/login", login);
};

const login = async (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
    if (err) {
      res.status(500).send("Error to conect to DB");
    } else if (!user) {
      res.status(401).send("User not found");
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ username },
            SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.json({ token })
        } else {
          res.status(401).send("Wrong password or username");
        }
      })
    }
  })

  const answer = `
    <h1>Answer</h1>
    <p>Username: ${username}</p>
    <p>Password: ${password}</p>
  `;

  res.send(answer);
};

export default initializeAPI;
