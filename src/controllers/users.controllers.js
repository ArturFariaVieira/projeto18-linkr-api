import { selectUser, insertUser } from "../repository/signup.repositories.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
  const { username, email, password, picture } = req.body;

  try {
    const existingUsers = await selectUser(email)

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await insertUser(username, email, password, picture )

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
