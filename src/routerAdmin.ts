import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";

routerAdmin.get("/", restaurantController.goHome);

routerAdmin.get("/login", restaurantController.getLogin);
routerAdmin.post("/login", restaurantController.processLogin);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

//product
routerAdmin.get("/product/all", productController.getAllproducts);
routerAdmin.post("/product/create", productController.createNewProduct);
routerAdmin.post("/product/:id", productController.updateChosenProduct);

//user

export default routerAdmin;
