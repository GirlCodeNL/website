import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MediumPosts, WpPosts } from '../imports/scripts/blog-collections';

const tag = 'girlcode';
const latestPostsUrl = `https://medium.com/tag/${tag}?format=json`;

const MEDIUM_SCRIPT_EXECUTION_PREVENTION = '])}while(1);</x>';

const fetchPostsByTagFromMedium = () => {
  console.log('Start fetching blogs from Medium...');
  HTTP.get(latestPostsUrl, (err, res) => {
    if (err) return;
    const json = JSON.parse(res.content.replace(MEDIUM_SCRIPT_EXECUTION_PREVENTION, ''));

    if (json.success) {
      MediumPosts.remove({});
      json.payload.value.slice(0, 3).forEach(function(post) {
        console.log(post);
        const { title, virtuals, firstPublishedAt, uniqueSlug, displayAuthor } = post;
        let image = virtuals.previewImage;
        MediumPosts.insert({
          title, excerpt: virtuals.snippet, firstPublishedAt, uniqueSlug, displayAuthor, image
        });
      });
    }
  });
};

const wpSite = 'inekescheffers.com';
const category = 'girl-code';
const wpPostsEndPoint = `https://public-api.wordpress.com/rest/v1.1/sites/${wpSite}/posts?category=${category}`;

const fetchPostsByCategoryFromWP = () => {
  HTTP.get(wpPostsEndPoint, (error, result) => {
    if (error) return;
    if(result.data.found > 0) {
      WpPosts.remove({});
      result.data.posts.forEach(function(post){
        const { title, date, URL, slug, author, excerpt, featured_image } = post;
        WpPosts.insert({ title, date, URL, slug, author, excerpt, featured_image });
      });
    }
  });
};

Meteor.startup(function() {
  fetchPostsByTagFromMedium();
  fetchPostsByCategoryFromWP();

  // every 5 minutes, fetch new posts from Medium
  Meteor.setInterval(fetchPostsByTagFromMedium, 1000 * 60 * 5);
});

Meteor.publish("latestMediumPosts", function() {
  return MediumPosts.find();
});

Meteor.publish("latestWpPosts", function() {
  return WpPosts.find();
});
