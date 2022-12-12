import User from "App/Models/User";
import UserService from "App/Services/UserService";
import CreateOrUpdateUserRequest from "App/Requests/CreateOrUpdateUserRequest";
import Redis from '@ioc:Adonis/Addons/Redis'

export default class UsersController {
  public async index({request}) {
    //  // const page = request.page ?? 1;
    //  // const users = await User.query().paginate(page,10);
    //await Redis.flushall();

    try {
      let strUsers = await Redis.get('users');
      if (strUsers != null){
        return JSON.parse(strUsers);
      }
      const users = await User.all();
      await Redis.set('users',JSON.stringify(users));
      return users;
    }catch (error){
      const users = await User.all();
      return users;
    }
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
