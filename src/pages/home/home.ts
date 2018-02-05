import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { getRepository, Repository } from 'typeorm';

import { Author } from '../../entities/author';
import { Category } from '../../entities/category';
import { Post } from '../../entities/post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {
    let category1 = new Category();
    category1.name = "TypeScript";

    let category2 = new Category();
    category2.name = "Programming";

    let category3 = new Category();
    category3.name = "Programming3";

    let author = new Author();
    author.name = "Person";

    let post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2, category3];
    post.author = author;

    let postRepository = getRepository(Post);
    await postRepository.save(post);

    console.log("Post has been saved");
    

    
  }

  /* getCategories() {
    
      console.log()
      return this.loadedPost.categories.map(cat => cat.name).join(", ");
    

    
  } */

  async load() {

    let postRepository = getRepository(Post);

    let loadedPost = await postRepository.createQueryBuilder('post')
    .innerJoinAndSelect('post.author', 'author')
    .innerJoinAndSelect('post.categories', 'categories')
    .getOne();

  console.log("Post has been loaded: ", loadedPost);
  //loadedPost = loadedPost;
  }
}
