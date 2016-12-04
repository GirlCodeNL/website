const medium = require('medium-sdk');
export default class MediumBlog {
  constructor(){
    this.clientId = '1025544c3a03';
    this.clientSecret = 'a3523a238132f89bef53e0ca5271d07eb31ba661';
    this.accessToken = '2564bdb524c1e9aff8416ad1f1bbb581758cb156c0b41e6e4caa1f6ced187fd3e';
    this.scope = 'listPublications';
    this.state = 'Blog posts by Girl Code';
    this.userId = '';
    this.endpoint = `https://api.medium.com/v1/users/${userId}/publications`;
    this.redirectUrl = 'http://girl-code.nl/blog';
    this.init = init;
  }

  init() {
    console.log('init medium api');
    this.client = new medium.MediumClient({
      clientId: this.clientId,
      clientSecret: this.clientSecret
    });

    this.client.setAccessToken(accessToken);

    this.client.getUser((err, user) => {
      console.log(user);
      // import json with medium feeds
      this.client.getPublicationsForUser((err, user) => {
        //insert feeds into page
      })
    });
  }
}
