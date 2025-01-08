import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import cookieParser from "cookie-parser";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

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
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/**2-SESSION**/
app.use(
  session({
    secret: String(process.env.SESSION_SECRET), // sessiyalarni xavfsiz qilkish uchun ishlatiladigan kalit
    cookie: {
      maxAge: 1000 * 3600 * 3, // 3h cookie mudati
    },
    store: store, //sessiyalarni saqlash uchun ishlatiladigan store xotirasi
    resave: true, //user kirgan vaqtga yana yangi vaqtni qo'shib save qilish buyrug'i
    saveUninitialized: true, //sid ni saqlash uchun
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});
/**3-VIEWS**/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**4-ROUTERS**/
app.use("/admin", routerAdmin); //BSSR
app.use("/", router); //SPA
export default app;
