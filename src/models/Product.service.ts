import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import { shapeintroMongooseObjectId } from "../libs/config";

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

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<any> {
    id = shapeintroMongooseObjectId(id);
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }
}

export default ProductService;
