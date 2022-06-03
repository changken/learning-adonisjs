// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post';

export default class PostsController {
  public async show({params}){
    // return Database
    // .from('posts')
    // .select("*")
    // .where("id", params.id)
    // .first();

    const post = await Post.find(params.id);

    return post;
  }
}
