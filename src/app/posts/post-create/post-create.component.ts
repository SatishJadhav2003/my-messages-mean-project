import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  private postId:string;
  private mode = "create";
  post:Post;



  constructor(public postsService: PostsService, public route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>
    {
      if (param.has('postId')) {
        this.postId = param.get('postId');
        this.mode = 'edit';
       this.post =  this.postsService.getPost(this.postId);
      }
      else
      {
        this.mode='create';
        this.postId = null;
      }
    })
  }




  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
