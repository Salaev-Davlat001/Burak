import { ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";
import Errors, { HttpCode, Message } from "../libs/Errors";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistence(input: ViewInput): Promise<any> {
    return await this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec();
  }

  public async insertMemberView(input: ViewInput): Promise<any> {
    try {
      return await this.viewModel.create(input);
    } catch (err) {
      console.log("ERROR, model: insertMemberView ", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}
export default ViewService;
