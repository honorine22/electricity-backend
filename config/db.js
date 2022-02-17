const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  database: process.env.API_URL,
  port: process.env.PORT
};
