import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/uploader";

routerAdmin.get("/", restaurantController.goHome);

routerAdmin.get("/login", restaurantController.getLogin);
routerAdmin.post("/login", restaurantController.processLogin);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup
  );

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

//product
routerAdmin.get(
  "/product/all",
  restaurantController.verifyRestaurant,
  productController.getAllproducts
);
routerAdmin.post(
  "/product/create",
  restaurantController.verifyRestaurant,
  makeUploader("products").array("productImages", 5),
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id",
  restaurantController.verifyRestaurant,
  productController.updateChosenProduct
);

//user

export default routerAdmin;
