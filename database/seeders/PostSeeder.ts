import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from "App/Models/User";
import Post from "App/Models/Post";
import {faker} from "@faker-js/faker";
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    for (let i=0; i<100;i++){
      const userCount = await Database.from('users').count("* as count");
      const userId =  Math.ceil(Math.random() * userCount[0].count);
      const user = await User.findOrFail(userId);
      await Post.create({
          user_id:user.id ?? null,
          title:faker.lorem.sentence(5)
        });
    }
  }
}
