import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { MediumPosts, WpPosts } from '../../imports/scripts/blog-collections';

Template.blogposts.helpers({
  firstPublishedAt() {
    const d = new Date(this.firstPublishedAt);
    return `${d.getDate()} - ${d.getMonth() + 1} - ${d.getFullYear()}`;
  },
  post() {
    return MediumPosts.find();
  },
  wpPost(){
    return WpPosts.find();
  },
  wpImage(){
    if(!this.featured_image) {
      return '/images/logo-girlcode.png';
    }
  },
  wpDate() {
    const date = new Date(this.date);
    return `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
  },
  image(){
    return `https://cdn-images-1.medium.com/fit/t/${this.image.originalWidth}/${this.image.originalHeight}/${this.image.imageId}`;
  },
  author() {
    return this.displayAuthor;
  }
});
