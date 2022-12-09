import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from "Database/factories/UserFactory";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      email:'admin@admin.com',
      password:'password'
    });
    await UserFactory.createMany(20);
  }
}
