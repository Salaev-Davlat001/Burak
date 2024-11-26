import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

/**1-ENTRANCE**/
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

/**2-SESSION**/
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
    resave: true, //user kirgan vaqtga yana yangi vaqtni qo'shib save qilish buyrug'i
    saveUninitialized: true,
  })
);

/**3-VIEWS**/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**4-ROUTERS**/
app.use("/admin", routerAdmin);
app.use("/", router);
export default app;
