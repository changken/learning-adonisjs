// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post';
import CreatePostValidator from 'App/Validators/CreatePostValidator';

export default class PostsController {
  public async show({params, view}){
    // return Database
    // .from('posts')
    // .select("*")
    // .where("id", params.id)
    // .first();

    const post = await Post.find(params.id);

    return view.render('posts/index', { post });
  }

  public async store({request}){
    const post = await request.validate(CreatePostValidator);

    console.log(post.title);
    console.log(post.description);
  }
}
