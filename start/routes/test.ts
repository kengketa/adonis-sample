import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";
import Redis from "@ioc:Adonis/Addons/Redis";

Route.group(() => {
  Route.get('dashboard', async ({ auth }) => {
    const authUser = await auth.use('web').authenticate();
    const aa = 2;
    const user = await User.query().where('id',authUser.id).preload('posts',(q)=>{
      q.where('id',aa);
    }).firstOrFail();
    return user;
  });

  Route.get('redis', async () => {
    // await Redis.flushall();
    const value = await Redis.get('foo');
    if (value == null){
      await Redis.setex('foo',30,1);
    }
    if (value){
      await Redis.setex('foo', 30,1+parseInt(value));
    }
    const updatedValue = await Redis.get('foo');
    return updatedValue
  })
}).middleware('auth');
