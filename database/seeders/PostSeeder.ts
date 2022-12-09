import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User";
import Post from "App/Models/Post";
import {faker} from "@faker-js/faker";

export default class extends BaseSeeder {
  public async run () {
    for (let i=0; i<10;i++){
      const user = await User.findOrFail(1);
      await Post.create({
          user_id:user.id ?? null,
          title:faker.lorem.sentence(5)
        })
    }
  }
}
