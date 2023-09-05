import User from "App/Models/User";
interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

class UserTransformer {

  constructor() {
    // Define any additional configuration or options here
  }

  public async transform(user: User): Promise<Object> {
    const posts = await user.related('posts').query()
    return {
      id: user.id,
      email: user.email,
      posts:posts,
    }
  }

  public async transformMany(users: any): Promise<Object> {
    const meta = await users.meta;
    const data = await Promise.all(users.data.map((user: User) => this.transform(user)));
    return {
      meta: <Pagination>meta,
      data: <User[]>data,
    };
  }
}

export default UserTransformer
