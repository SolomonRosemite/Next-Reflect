require("dotenv").config();
import "reflect-metadata";

import { isInProduction, mongoUrl, port } from "./common/constants";
import { createConnection } from "typeorm";

import { urlRoute } from "./routes/url";
import { Urls } from "./entity/Urls";

import express from "express";
import helmet from "helmet";
import Moment from "moment";

import * as fs from "fs";
import cors from "cors";
import path from "path";

async function main() {
  // Connect to Database
  await connect();

  // Setup Server
  const app = express();

  app.use(urlRoute);
  app.use(helmet());
  app.use(cors());

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });
}

const connect = async () => {
  await createConnection({
    type: "mongodb",
    url: mongoUrl,
    logging: true,
    entities: [Urls],
    useUnifiedTopology: true,
    synchronize: true,
  });
};

main().catch((err) => {
  console.log(err);

  if (!isInProduction) {
    return;
  }

  const date = Moment().format("Do MMM YYYY, HH.mm.ss");

  fs.writeFileSync(path.join(process.cwd(), `/Error ${date}.txt`), err.stack);
});
