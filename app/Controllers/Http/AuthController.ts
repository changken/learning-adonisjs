// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

  public async loginShow({params, view}){
    return view.render('auth/login');
  }

  public async login({request, auth, response}){
    const email = request.input('email');
    const password = request.input('password');

    await auth
       .use('web') //=> session guard
       .attempt(email, password);

    response.redirect().toRoute('dashboard');

    // const token = await auth
    //     .use('api') //=> api guard
    //     .attempt(email, password);

    // return token;
  }
}
