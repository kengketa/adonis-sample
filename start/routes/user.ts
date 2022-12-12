import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.post('/', 'UsersController.store')
  Route.get('/:id', 'UsersController.show')
}).prefix('/users').middleware('auth');
