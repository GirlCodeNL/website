import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { MediumPosts, WpPosts } from '../../imports/scripts/blog-collections';

const wpDep = new Tracker.Dependency();

const createWPFetcher = site => category => async () => {
  const wpPostsEndPoint = `https://public-api.wordpress.com/rest/v1.1/sites/${site}/posts?category=${category}`;
  const res = await fetch(wpPostsEndPoint);
  const parsed = await res.json();
  return parsed;
};

async function wpPosts() {
  const wpSite = 'inekescheffers.com';
  const category = 'girl-code';
  return await createWPFetcher(wpSite)(category)();
}

Template.blogposts.onCreated(async function() {
  const posts = await wpPosts();
  this.data.wpPosts = posts;
  wpDep.changed();
});

Template.blogposts.helpers({
  firstPublishedAt() {
    const d = new Date(this.firstPublishedAt);
    return `${d.getDate()} - ${d.getMonth() + 1} - ${d.getFullYear()}`;
  },
  mediumPosts() {
    return MediumPosts.find();
  },
  mediumPostUrl(){
    return `https://medium.com/q42bv/${this.uniqueSlug}`;
  },
  wpPosts() {
    wpDep.depend();
    return this.wpPosts ? this.wpPosts.posts : [];
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
