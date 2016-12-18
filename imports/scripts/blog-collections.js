import { Mongo } from 'meteor/mongo';

const MediumPosts = new Mongo.Collection("medium_posts");
const WpPosts = new Mongo.Collection("wp_posts");

export { MediumPosts, WpPosts };
