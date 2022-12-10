import User from "App/Models/User";

export default class UserService {
  public async create(data) {
    const createdUser = await User.create({
      email:data.email,
      password:data.password,
    });
   return createdUser;
  }
}
