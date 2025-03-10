require("dotenv").config();
const mongoose = require("mongoose");

const logger = require("pino")({
  module: "mongodb",
});

const env = process.env;

async function connect() {
  try {
    mongoose.connection.on("connected", function () {
      // console.log('Mongoose default connection open to ' + dbURI);
      logger.info.bind(logger, "MongoDB: Connected");
    });

    // If the connection throws an error
    mongoose.connection.on("error", function (err) {
      // console.log('Mongoose default connection error: ' + err);
      logger.error.bind(logger, "MongoDB: " + err);
    });

    // When the connection is disconnected
    mongoose.connection.on("disconnected", function () {
      // console.log('Mongoose default connection disconnected');
      logger.warn.bind(logger, "MongoDB: Connected");
    });

    // If the Node process ends, close the Mongoose connection
    ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
      process.on(signal, () => {
        mongoose.connection.close();
        console.log("Mongoose connection disconnected through app termination");
        logger.info.bind(
          logger,
          "MongoDB: connection disconnected through app termination"
        );
        process.exit(0);
      })
    );
    if (process.env.NODE_ENV === "development") {
      console.log(env.MONGO_URL, " evn.MONGO_URL");
      return await mongoose
        .connect(env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((res) => {
          console.log("db::conntected!");
        })
        .catch((e) => {
          console.log(e,"connection:error::");
        });
    } else {
      return await mongoose.connect(
        `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}/${env.MONGODB_DB}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
    }
  } catch (e) {
    console.log(e, "catch error in connecton");
    return false;
  }
}

module.exports = connect;
