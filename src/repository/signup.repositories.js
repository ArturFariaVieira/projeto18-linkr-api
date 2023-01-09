import connection from "../database/database.js";
export function selectUser(email){
   return connection.query(
        `SELECT * FROM users WHERE email = $1 `,
        [email]
      );
}

export function insertUser(username, email, password, picture ){
   return connection.query(
        `INSERT INTO users (username, email, password, picture) VALUES ($1, $2, $3, $4)`,
        [username, email, passwordHash, picture]
      );
}