import User from "App/Models/User";
import Redis from "@ioc:Adonis/Addons/Redis";
import UserTransformer from "App/Transformers/UserTransformer";
import * as process from "process";
const PERPAGE = 10;
export default class UserService {
  public async create(data) {
    const createdUser = await User.create({
      email:data.email,
      password:data.password,
    });
   return createdUser;
  }
  public async getPaginatedUsers(req:any) {
    const page = req.page ?? 1;
    const cacheKey = 'users-' + page;
    try {
      if (process.env.NODE_ENV === 'development') await Redis.del(cacheKey);
      const strUsers = await Redis.get(cacheKey);
      if (strUsers != null) return JSON.parse(strUsers);
      const users = await User.query().paginate(page, PERPAGE);
      const transformedUsers = new UserTransformer().transformMany(users.toJSON())
      await Redis.set(cacheKey, JSON.stringify(transformedUsers));
      return transformedUsers;
    }catch (error){
      const users = await User.query().paginate(page, PERPAGE);
      return new UserTransformer().transformMany(users.toJSON());
    }
  }
  public async getUserById(id:bigint){
    const user = await User.find(id);
    if (!user) return null;
    return new UserTransformer().transform(user);
  }

}
