import connection from "../database/database.js";

export async function authValidation(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token.");
  }

  try {
    const { rows: sessions } = await connection.query(
      `SELECT *  FROM sessions WHERE token = $1`,
      [token]
    );
    const [session] = sessions;

    if (!session) {
      return res.status(401).send("Session not found.");
    }

    const { rows: users } = await connection.query(
      `SELECT * FROM users WHERE id = $1 `,
      [session.userId]
    );
    const [user] = users;

    if (!user) {
      return res.status(401).send("User not found.");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // server error
  }
}
