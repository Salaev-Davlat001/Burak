import { Product, ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  //SPA
  //SSR
  public async createNewProduct(input: ProductInput): Promise<any> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model: creatingNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}

export default ProductService;
