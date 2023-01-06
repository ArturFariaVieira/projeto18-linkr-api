import  connection  from "../database/database.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const { username, email, password } = req.body;

  try {
    const existingUsers = await connection.query(
      `SELECT * FROM users WHERE email = $1 `,
      [email]
    );

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    await connection.query(
      `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`,
      [username, email, passwordHash]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

