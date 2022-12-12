import Route from "@ioc:Adonis/Core/Route";

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
