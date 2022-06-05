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

    return `<h1>新增狀態: ${postModel.$isPersisted}</h1>`;

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

  public async edit({view, params}: HttpContextContract) {
    const post = await Post.find(params.id);
    return view.render('posts/create', {post});
  }

  public async update({request, params}: HttpContextContract) {
    const post = await request.validate(CreatePostValidator);

    const postModel = await Post.findOrFail(params.id);

    postModel.title = post.title;
    postModel.description = post.description;

    await postModel.save();

    return `<h1>更新狀態: ${postModel.$isPersisted}</h1>`;
  }

  public async destroy({params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    await post.delete();

    return `<h1>刪除狀態: ${post.$isPersisted}</h1>`;
  }
}
