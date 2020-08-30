const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const JWTGenerator = require("../utils/JWTGenerator");

router.post("/register", async (req, res) => {
  //1 get from req.body name, email, password
  const { name, email, password } = req.body;
  try {
    //2 check if user exists, if so throw an error
    const user = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [
      email
    ]);

    if (user.rows.length !== 0) {
      res.status(401).send("User already exists");
    }

    //3 Bcrypt the password

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4 Add the user to DB

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = JWTGenerator(newUser.rows[0].user_id);

    res.json({ token });
    //5 Generating JWT
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users where user_email=$1", [
      email
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("User with such email does not exist");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid password");
    }

    const token = JWTGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
