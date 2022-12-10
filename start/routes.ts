/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from "App/Models/User";

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', async ({ auth, request }) => {
  const email = request.input('email')
  const password = request.input('password')
  const aa =await auth.use('web').attempt(email, password);
  return aa;
});

Route.post('logout', async ({ auth }) => {
  await auth.use('web').logout();
  return 'logged out!';
});

Route.group(() => {
  Route.get('dashboard', async ({ auth }) => {
    const authUser = await auth.use('web').authenticate();
    const aa = 2;
    const user = await User.query().where('id',authUser.id).preload('posts',(q)=>{
      q.where('id',aa);
    }).firstOrFail();
    return user;
  })
}).middleware('auth');

Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.post('/', 'UsersController.store')
  Route.get('/:id', 'UsersController.show')
}).prefix('/users').middleware('auth');

