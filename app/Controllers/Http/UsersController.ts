import UserService from "App/Services/UserService";
import CreateOrUpdateUserRequest from "App/Requests/CreateOrUpdateUserRequest";

export default class UsersController {
  public async index({request}) {
    const req = request.all();
    const userAction = new UserService();
    return userAction.getPaginatedUsers(req);
  }
  public async show({ request,response }){
    const userId = request.param('id');
    const userAction = new UserService();
    return await userAction.getUserById(userId) ?? response.status(404).send({
      "error":"User not found."
    });
  }
  public async store({ request }){
    const payload = new CreateOrUpdateUserRequest();
    const validatedRequest = await payload.validate(request);
    const user = new UserService();
    return user.create(validatedRequest);
  }
}
