import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";

import { userRouter } from "./routes/UserRouter";
import { bandRouter } from "./routes/BandRouter";
import { genreRouter } from "./routes/GenreRouter";
import { albumRouter } from "./routes/AlbumRouter";
import { musicRouter } from "./routes/MusicRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/band", bandRouter);

app.use("/genre", genreRouter);

app.use("/album", albumRouter);

app.use("/music", musicRouter);

export default app;

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
