import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';
import CreatePostValidator from 'App/Validators/CreatePostValidator';

export default class PostsController {
  public async index({view}: HttpContextContract) {
    const posts = await Post.all();

    return view.render('posts/index', { posts });
  }

  public async create({view}: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({request} : HttpContextContract){
    const post = await request.validate(CreatePostValidator);

    const postModel = new Post();

    postModel.title = post.title;
    postModel.description = post.description;

    await postModel.save();

    return `<h1>${postModel.$isPersisted}</h1>`;

    // console.log(post.title);
    // console.log(post.description);
  }

  public async show({params, view} : HttpContextContract){
    // return Database
    // .from('posts')
    // .select("*")
    // .where("id", params.id)
    // .first();

    const post = await Post.find(params.id);

    return view.render('posts/view', { post });
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
