import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/database.js";

export async function signin(req, res) {
  const { email, password } = req.body;

  const { rows: users } = await connection.query(
    `SELECT * FROM users WHERE email = $1 `,
    [email]
  );
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  const { rows: Token } = await connection.query(
    `SELECT token FROM sessions WHERE "userId" = $1`,
    [user.id]
  );
    let token = Token[0]?.token;
  if (token) {
    await connection.query(
      `UPDATE sessions SET "active" = true WHERE "userId" = $1`,
      [user.id]
    );
    
  }
  if(bcrypt.compareSync(password, user.password)) {
    token = uuid();
    await connection.query(
      `
   INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
      [token, user.id]
    );
  }else{
    return res.sendStatus(401)
  }

  const { picture, username } = user;
  const data = {
    picture,
    token,
    username
  };
  return res.status(200).send(data);
}
