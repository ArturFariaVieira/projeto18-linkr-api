import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { selectUser } from "../repository/signup.repositories.js";
import { selectToken, activeSession, createSession } from "../repository/signin.reposituries.js";

export async function signin(req, res) {
  const { email, password } = req.body;

  const { rows: users } = await selectUser(email)
  const [user] = users;
  if (!user) {
    return res.sendStatus(401);
  }

  const { rows: Token } = await selectToken(user.id)
    let token = Token[0]?.token;
  if (token) {
    await activeSession(user.id)
    
  }
  if(bcrypt.compareSync(password, user.password)) {
    token = uuid();
    await createSession(token, user.id)
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
