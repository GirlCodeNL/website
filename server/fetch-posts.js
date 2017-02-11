import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MediumPosts, WpPosts } from '../imports/scripts/blog-collections';

const tag = 'girlcode';
const latestPostsUrl = `https://medium.com/tag/${tag}?format=json`;

const MEDIUM_SCRIPT_EXECUTION_PREVENTION = '])}while(1);</x>';

const fetchPostsByTagFromMedium = () => {
  HTTP.get(latestPostsUrl, (err, res) => {
    if (err) return;
    const json = JSON.parse(res.content.replace(MEDIUM_SCRIPT_EXECUTION_PREVENTION, ''));

    if (json.success) {
      MediumPosts.remove({});
      json.payload.value.slice(0, 3).forEach(function(post) {
        const { title, virtuals, firstPublishedAt, uniqueSlug, displayAuthor, detectedLanguage } = post;
        let image = virtuals.previewImage;
        MediumPosts.insert({
          title, excerpt: virtuals.snippet, firstPublishedAt, uniqueSlug, displayAuthor, image, detectedLanguage
        });
      });
    }
  });
};

Meteor.startup(function() {
  fetchPostsByTagFromMedium();

  // every 5 minutes, fetch new posts from Medium
  Meteor.setInterval(fetchPostsByTagFromMedium, 1000 * 60 * 5);
});

Meteor.publish("latestMediumPosts", function() {
  return MediumPosts.find();
});
