import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import  connection  from "../database/database.js";

export async function signin(req, res) {
  const { email, password } = req.body;
  console.log (req.body)

  const { rows: users } = await connection.query(
    `SELECT * FROM users WHERE email = $1 `,
    [email]
  );
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await connection.query(
      `
   INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
      [token, user.id]
    );
    return res.send(token);
  }

  res.sendStatus(401);
}
