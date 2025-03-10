const dotenv = require("dotenv");
const env = "development";
const envFile = `.env.${env}`;
dotenv.config({ path: envFile });