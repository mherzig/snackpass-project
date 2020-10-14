module.exports = {
  client: 'pg',  
  connection: {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'snackpass',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'P@ssw0rd!',
  }
}