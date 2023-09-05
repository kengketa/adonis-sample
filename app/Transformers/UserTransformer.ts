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

  public transform(user: User): Object {
    return {
      id: user.id,
      email: user.email,
      xx:"sfjdsfgsdjhgd"
    }
  }

  public transformMany(users: any): Object {
    return {
      meta: <Pagination>users.meta,
      data: <User[]>users.data.map((user: User) => this.transform(user)),
    }
  }
}

export default UserTransformer
