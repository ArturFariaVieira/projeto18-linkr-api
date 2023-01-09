import connection from "../database/database.js";
export function selectToken(userId){
   return connection.query(
    `SELECT token FROM sessions WHERE "userId" = $1`,
    [userId]
  );
}

export function activeSession(userId){
    return connection.query(
        `UPDATE sessions SET "active" = true WHERE "userId" = $1`,
        [userId]
      );
 }

 export function createSession(token, userId){
    return connection.query(
        `
     INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
        [token, userId]
      );
 }


 