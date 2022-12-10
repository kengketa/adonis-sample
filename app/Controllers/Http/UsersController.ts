import User from "App/Models/User";
import UserService from "App/Services/UserService";
import CreateOrUpdateUserRequest from "App/Requests/CreateOrUpdateUserRequest";

export default class UsersController {
  public async index({request}) {
     const page = request.page ?? 1;
     const users = await User.query().paginate(page,10);
     return users;
  }
  public async show({ request }){
    const user = await User.find(request.param('id'));
    return user;
  }
  public async store({ request }){
    const payload = new CreateOrUpdateUserRequest();
    const validatedRequest = await payload.validate(request);
    const user = new UserService();
    return user.create(validatedRequest);
  }
}
